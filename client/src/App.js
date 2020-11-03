import './App.css';
import React, {Component} from 'react'; 
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

import {Home} from './Home';
import {Login} from './Login';



function App() {
  return (
    <React.Fragment>
    <Router>
      <Switch>
        <Route exact path = "/home" component = {Home}/>
        <Route path = "/" component = {Login}/>
      </Switch>
    </Router>

    </React.Fragment>
  
    

);
}

export default App;
