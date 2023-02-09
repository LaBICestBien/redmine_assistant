// [CMP] Import
import React, { Component } from 'react'

// [CMP] Definition
class BaseForm extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);

    // Bind parent component value
    this.formValue = this.props.content;

    // Define component state
    this.state = {};

    // Extract each form value
    for( let item of this.formValue ){
      this.state[ item.name ] = '';
    }

    this.onChange = this.onChange.bind( this );
    this.onSubmit = this.onSubmit.bind( this );
  }

  // Get input 'change' event
  onChange( event ){
    // Udpate compoenent state
    this.setState({
      [event.target.getAttribute('name')]: event.target.value
    })
  }

  // Get form 'submit' event
  onSubmit( event ){
    // Stop event
    event.preventDefault();

    // TODO: check form validity

    // Send validated form value to parent componenet
    this.props.handleSubmit( this.state );
  }


  // Display component
  render(){
    return(
      <form 
        className='form-base-component mb-4'
        onSubmit={ this.onSubmit }
      >
        {
          this.formValue.map( (item, idx) => {
            return(
              <fieldset 
                className='mt-2 mb-2'
                key={ `form-item-${ idx }` }
              >
                <label
                  className='label'
                  htmlFor={ item.name }
                >
                  { item.label }
                </label>

                <input 
                  className='input'
                  name={ item.name }
                  value={ this.state[ item.name ] }
                  onChange={ this.onChange }
                  min={ item.min }
                  max={ item.max }
                />
              </fieldset>
            )
          })
        }

        <button className='button is-small is-fullwidth is-primary' type='submit'>OK</button>
      </form>
    )
  }
}

// [CMP] export
export default BaseForm;