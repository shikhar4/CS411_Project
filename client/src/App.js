import './App.css';
import React, { Component } from 'react';
import { Button } from "react-bootstrap";
//import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Axios from 'axios'
import Home from './Home';
import Login from './Login';
import register from './register';
import Search from './search';
import Delete from './Delete';
import Insert from './insert1';
import my_account from './my_account';

import friends from './friends';

import BorrowedItems from './BorrowedItems';
import Prod_Reccomender from './reccomend_product'


import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state={}
    this.clearAccountInfo = this.clearAccountInfo.bind(this);
  }
  clearAccountInfo(){
    localStorage.setItem("firstname_global", "");
    localStorage.setItem("lastname_global", "");
    localStorage.setItem("email_global", "");
    localStorage.setItem("phonenumber_global", "");
    localStorage.setItem("zipcode_global", "");
    localStorage.setItem("password_global", "");
   }
  render() {
    return (
      <Router>
        <div id = "navbar_div">
          
          <nav className="navbar navbar-expand-lg navbar-light w-100" id = "nav_bar">
            <ul className="navbar-nav mr-auto">
              {/* <li><Link to={'/'} className="nav-link"> Login </Link></li>  */}
              <li><Link to={'/home'} className="nav-link">Home</Link></li>
              
              <li><Link to={'/search'} className="nav-link">Search</Link></li>
              
              <li><Link to={'/my_account'} className="nav-link">Account</Link></li>

              <li><Link to={'/friends'} className="nav-link">Friends</Link></li>
              <li><Link to={'/reccomend_product'} className="nav-link">Feed</Link></li>
              <li><Link to={'/borrowed_items'} className="nav-link">My Borrowed Items</Link></li>
              

            </ul>
            <Link to = '/'><Button className="LoginButton" onClick={this.clearAccountInfo}>Log Out</Button></Link>
          </nav>
          </div>
          <hr />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/reg' component={register} />
            <Route path='/home' component={Home} />
            
            <Route path='/search' component={Search} />
            
            <Route path='/my_account' component={my_account} />

            <Route path='/friends' component={friends} />
            <Route path='/reccomend_product' component={Prod_Reccomender} />
            <Route path='/borrowed_items' component={BorrowedItems} />

          </Switch>
        
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('App'));
export default App;