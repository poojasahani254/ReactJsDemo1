import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
} from "react-router-dom";
import Router from './Components/Route/Router';
import {Provider} from 'react-redux';
import configstore from '../src/Store/Store';


function App() {
  return (
      <Provider store={configstore}>
          <BrowserRouter>
              <Router />
          </BrowserRouter>
      </Provider>

  );
}

export default App;
