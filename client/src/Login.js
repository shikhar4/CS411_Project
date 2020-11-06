import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Axios from 'axios'
import { useEffect,useState } from "react";


var user_name_golbal = "";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        userId:'',
        password:'',
        message: '',
        LoggedIn: false
    };
   this.handleChange_userid = this.handleChange_userid.bind(this); 
   this.handleChange_password = this.handleChange_password.bind(this);
   this.login = this.login.bind(this);
};
login() {
  Axios.post('http://localhost:3001/api/login',
  {username:this.state.userId,password:this.state.password}).then((res)=>{
    if(res.data.message)
    {
      console.log(res.data.message)
      this.setState({ message:res.data.message});  
      console.log(this.state.message)
    }
    else
    {
      console.log(res.data[0].FirstName)
      this.setState({ message:res.data[0].FirstName}); 
      this.setState({LoggedIn: true}) 
      console.log(this.state.message)
      user_name_golbal = (res.data[0].FirstName)
    }
    

  })
}

  render() {
      const messages = this.state.message;
      const LoggedIn = this.state.LoggedIn;
      var button;

      if(!LoggedIn)
      {
        button = <Button onClick={this.login}>Login</Button> 
      }
      else
      {
       button =  <Link to="/home">
                 <Button>Start Borrowing</Button>
                </Link>
      }
    return (
      <>
      <h1 className = "BorrowMe_Title"></h1>
      <div className="Login_Page">
      <Form>
        <FormGroup controlId="Username">
          <FormLabel>Username</FormLabel>
          <FormControl type = "email" value = {this.state.userId} onChange={this.handleChange_userid} class = "Input_login"/>
        </FormGroup>

        <FormGroup controlId="Password">
          <FormLabel>Password</FormLabel>
          <FormControl type = "password" value = {this.state.password} onChange={this.handleChange_password} class = "Input_login_password"/>
        </FormGroup>
        <div>{button}</div>
      </Form>

      <h1> {messages} </h1>
      </div>
      </>
    )
           };


          handleChange_userid(evt) {
            this.setState({ userId: evt.target.value});   
         };
         handleChange_password(evt) {
            this.setState({ password: evt.target.value});   
         };




  
}

export default Login;