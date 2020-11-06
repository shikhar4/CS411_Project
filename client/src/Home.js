import React, { Component } from 'react';
import {Link, useLocation} from 'react-router-dom';
import Login from './Login'





class Home extends Component {

  render() {
    const firstName = (localStorage.getItem("FirstName"))
    return (
        <div>
          <h2>Welcome Back {firstName}!</h2>
        </div>
    );
  }
}

export default Home;