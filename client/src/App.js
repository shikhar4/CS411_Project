import './App.css';
import React, { Component } from 'react';
//import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Axios from 'axios'
import Home from './Home';
import Login from './Login';
import register from './register';
import Search from './search';
import Delete from './Delete';
import insert1 from './insert1';
import my_account from './my_account';

import friends from './friends';

import BorrowedItems from './BorrowedItems';


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
              <li><Link to={'/insert1'} className="nav-link">Insert</Link></li>
              <li><Link to={'/search'} className="nav-link">Search</Link></li>
              <li><Link to={'/delete'} className="nav-link">Delete</Link></li>
              <li><Link to={'/my_account'} className="nav-link">Account</Link></li>

              <li><Link to={'/friends'} className="nav-link">Friend Recommender</Link></li>

              <li><Link to={'/borrowed_items'} className="nav-link">My Borrowed Items</Link></li>

            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/reg' component={register} />
            <Route path='/home' component={Home} />
            <Route path='/insert1' component={insert1} />
            <Route path='/search' component={Search} />
            <Route path='/Delete' component={Delete} />
            <Route path='/my_account' component={my_account} />

            <Route path='/friends' component={friends} />

            <Route path='/borrowed_items' component={BorrowedItems} />

          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
export default App;