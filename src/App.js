
import './App.css';
import HomeView from "./views/HomeView";
import CreateView from './views/CreateView';
import store from './store';
import HeaderBase from './base/HeaderBase';

import React, { Component } from 'react';

// Import component to display view component
import { Routes, Route } from "react-router-dom"

class App extends Component{
  // Init componenet
  constructor( props ){
    // Inject props from extended classe (ES6)
    super(props);
  }

  onLogout(){
    store.dispatch({
      type: 'LOGOUT-USER',
      value: null
    })
  }

  // Dsiplay component
  render(){
    return(
      <div className='app-component'>
        <HeaderBase
          onLogout={ this.onLogout }
        />

        <main>
          {/* Routes directive to define routes */}
          <Routes>
            {/* Route directive to define path and component */}
            <Route path="/" element={ <HomeView /> } />
            <Route path="/add/:shema" element={ <CreateView /> } />
            
          </Routes>
        </main>

        
      </div>
    )
  }
}

// [CMP] export
export default App;