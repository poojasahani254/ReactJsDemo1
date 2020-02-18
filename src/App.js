import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Switch,
} from "react-router-dom";
import Router from './Components/Route/Router';


function App() {
  return (
      <BrowserRouter>
          <Router />
      </BrowserRouter>
  );
}

export default App;
