// [CMP] Import
import React, { Component } from 'react';
import { withRouter } from '../services/withRouter';

// Store modules
import { connect } from "react-redux"

// Child components
import BaseForm from '../base/BaseForm';
import CrudFetchClass from '../services/fetch.service';

// [CMP] Definition
class CreateView extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props)

    // Init fetcher
    this.Fetcher = new CrudFetchClass();

    // Init form value
    this.state = {
      author: this.props.connectedUser.id
    }
    this.formTitle = null;
    this.formValue = null;

    // Get URL parameters
    this.routeParams = window.location.pathname.split('/').filter( item => item.length );
    this.routeSchema = this.routeParams[1]
    
    // Set form values
    this.setFormValue(this.routeSchema)

    // Bind this to methods
    this.setFormValue = this.setFormValue.bind( this );
  }

  // Define form value
  setFormValue( schema ){
    if( schema === 'posts' ){
      this.formTitle = 'Ajouter un nouvel article'
      this.formValue = [
        {
          name: 'title',
          type: 'text',
          label: `Titre de l'article`,
          required: true,
          min: 5,
          max: null
        },
        {
          name: 'body',
          type: 'textarea',
          label: `Contenu de l'article`,
          required: true,
          min: 5,
          max: null
        },
      ]
    }
    else if( schema === 'todos' ){
      this.formTitle = 'Ajouter une nouvelle tâche'
      this.formValue = [
        {
          name: 'title',
          type: 'text',
          label: `Nouvelle tâche`,
          required: true,
          min: 5,
          max: null
        },
      ]
    }
  }

  // Bind 'handleSubmit' event on 'BaseForm'
  async onSubmit( event, schema ){
    try {
      // Set request
      this.Fetcher.init(
        `https://jsonplaceholder.typicode.com/${ schema }`,
        'POST',
        Object.assign( event, this.state )
      )
  
       // Launch request
      const fetchResponse = await this.Fetcher.sendRequest();
      console.log( fetchResponse )
    } 
    catch ( fetchError ) { console.log( fetchError ) }
  }

  // Dsiplay component
  render(){
    if( this.formValue && this.props.connectedUser ){
      return(
        <div className='create-view-component'>
          <h1>{ this.formTitle }</h1>
          <BaseForm
            content={ this.formValue }
            handleSubmit={ event => this.onSubmit( event, this.routeSchema ) }
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
  }
}

// [CMP] export
export default withRouter ( connect( mapStateToProps )( CreateView ) );