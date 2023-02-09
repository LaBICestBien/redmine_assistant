// [CMP] Import
import React, { Component } from 'react'

// Store modules
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


// [CMP] Definition
class HeaderBase extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);
  }

  // Dsiplay component
  render(){
    if( this.props.connectedUser ){
      return(
        <header className='header-base-component'>
          <h1>Bienvenue { this.props.connectedUser.name }</h1>
          <nav>
            <ul className='is-flex'>
            <li>
                <Link className='button is-small' to={ '/' }>Home</Link>
              </li>
              <li>
                <Link className='button is-small' to={ '/add/posts' }>Add post</Link>
              </li>
              <li>
                <Link className='button is-small' to={ '/add/todos' }>Add TODO</Link>
              </li>
              <li>
                <button 
                  className='button is-small is-danger' 
                  type='button'
                  onClick={ () => this.props.onLogout() }
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </header>
      )
    }
    else{
      return(
        <header className='header-base-component'>
          <h1>First React App</h1>
        </header>
      )
    }
  }
}


// Bind store state in classe properties
const mapStateToProps = state => {
  return{
    connectedUser: state.user
  }
}

// [CMP] export
export default connect( mapStateToProps )( HeaderBase );