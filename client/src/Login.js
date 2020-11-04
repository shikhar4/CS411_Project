import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <>
      <h1 className = "BorrowMe_Title">BorrowMe</h1>
      <div className="Login_Page">
      <Form>
        <FormGroup controlId="Username">
          <FormLabel>Username</FormLabel>
          <FormControl type = "email" />
        </FormGroup>
        <FormGroup controlId="Password">
          <FormLabel>Password</FormLabel>
          <FormControl type = "password" />
        </FormGroup>
        <Link to="/home">
        <div><Button>Login</Button></div>
        </Link>
      </Form>
      </div>
      </>
    );
  }
}

export default Login;