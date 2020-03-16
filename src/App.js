import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
} from "react-router-dom";
import Router from './Components/Route/Router';
import {Provider} from 'react-redux';
import configstore from '../src/Store/Store';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

function App() {
  return (
      <Provider store={configstore}>
          <BrowserRouter history={history}>
              <Router />
          </BrowserRouter>
      </Provider>

  );
}

export default App;
