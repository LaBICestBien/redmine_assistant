import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add component to define FLUX
import { Provider } from 'react-redux';
import store from "./store"

// Add compoenent to define routes
import { BrowserRouter } from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
// Render APP
root.render(
  <React.StrictMode>
    {/* Inject APP store with Provider */}
    <Provider store={ store }>
      {/* Inject BrowserRouter module */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

