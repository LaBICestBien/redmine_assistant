// [CMP] Import
import React, { Component } from 'react';
import { withRouter } from '../services/withRouter';

// Store modules
import { connect } from "react-redux"
import store from "../store/index"

// Child components
import SinglePost from "../components/SinglePost"
import BaseForm from '../base/BaseForm';

// [CMP] Definition
class HomeView extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);

    // Define login form value
    this.loginFormValue = [
      {
        name: 'email',
        type: 'email',
        label: `Email de connexion`,
        required: true,
        min: 5,
        max: null
      },
      {
        name: 'username',
        type: 'text',
        label: `Identitiant de connexion`,
        required: true,
        min: 5,
        max: null
      }
    ]

    if( this.props.connectedUser ){
      // Send Ajax request to login user (fake)
      this.ajaxGetMethod( 
        `users?email=${ this.props.connectedUser.email }&username=${ this.props.connectedUser.username }`,
        'loginForm'
      )
    }

    // Bind this to methods
    this.displaySinglePost = this.displaySinglePost.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
    this.ajaxGetMethod = this.ajaxGetMethod.bind( this );
  }

  displaySinglePost( event ){
    this.props.navigate(`/posts/${ event }`)
  }

  // Send AJAX request with Fetch API
  ajaxGetMethod( endpoint, from ){
    fetch(`https://jsonplaceholder.typicode.com/${ endpoint }`)
    .then( requestStatus => {
      if( requestStatus.ok ){
        // Extract JSON value
        return requestStatus.json()
      }
    })
    .then( fetchSuccess => {
      // Save values in store property
      if( from === 'loadPost' ){
        store.dispatch({
          type: 'LOAD-POST',
          value: fetchSuccess
        })

        console.log( this.props.connectedUser )
        console.log( fetchSuccess )
      }
      else if( from === 'loginForm' ){
        store.dispatch({
          type: 'LOGIN-USER',
          value: fetchSuccess[0]
        })

        // Load post collections
        this.ajaxGetMethod(`posts?userId=${fetchSuccess[0].id}`, 'loadPost')
      }
    })
    .catch( fetchError => {
      console.log('Error', fetchError)
    })
  }

  // Bind form 'BaseForm' event 'submit'
  onSubmit( event ){
    // Send Ajax request to login user (fake)
    this.ajaxGetMethod( 
      `users?email=${ event.email }&username=${ event.username }`,
      'loginForm'
    )
  }

  // Dsiplay component
  render(){
    if( this.props.connectedUser && this.props.postCollection.length ){
      return(
        <div className='home-view-component'>
          <ul>
            {
              this.props.postCollection.map( (item, idx) => {
                return(
                  <li key={ `single-post-${ idx }` }>
                    <SinglePost   
                      item={ item }
                      displaySinglePost={ event => this.displaySinglePost(event) }
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      )
    }
    else{
      return(
        <div className='home-view-component'>
          <h1>Bienvenue, merci de vous connecter</h1>
          <BaseForm
            content={ this.loginFormValue }
            handleSubmit={ this.onSubmit }
          />
        </div>
      )
    }
  }
}

// Bind store state in classe properties
const mapStateToProps = state => {
  return{
    connectedUser: state.user,
    postCollection: state.posts,
  }
}

// [CMP] export
export default withRouter ( connect( mapStateToProps )( HomeView ) );