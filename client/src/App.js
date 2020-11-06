import './App.css';
import React, {Component} from 'react'; 
import { useEffect,useState } from "react";
//import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import { Navbar,Nav,NavDropdown } from "react-bootstrap";
import Axios from 'axios'
import Home from './Home';
import Login from './Login';
import Insert from './Insert';
import Search from './search';
import Delete from './Delete';


import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component { 
  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to Borrow Me</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            {/* <li><Link to={'/'} className="nav-link"> Login </Link></li>  */}
            <li><Link to={'/home'} className="nav-link">Home</Link></li>
            <li><Link to={'/insert'} className="nav-link">Insert</Link></li>
            <li><Link to={'/search'} className="nav-link">Search</Link></li>
            <li><Link to={'/delete'} className="nav-link">Delete</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/home' component={Home} />
              <Route path='/insert' component={Insert} />
              <Route path='/search' component={Search} />
              <Route path='/Delete' component={Delete} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
export default App;