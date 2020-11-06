import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Axios from 'axios'
import { useEffect,useState } from "react";
import Home from './Home';
import Search from './search';



class Login extends Component { 
  constructor(props){
    super(props);
    this.state = {
        userId:'',
        password:'',
        message: '',
        LoggedIn: false,
        first_name: "",
        user_id_gobal: '0'
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
      this.setState({ message:"Press Continue to Verify You Are Not A Robot"}); 
      this.setState({first_name:res.data[0].FirstName})
      this.setState({user_id_gobal: res.data[0].userID})
      this.setState({LoggedIn: true}) 
    }
    

  })
}

  render() {
      const messages = this.state.message;
      const LoggedIn = this.state.LoggedIn;
      var button;
      const user = localStorage.setItem("FirstName", this.state.first_name)
      const user_id = localStorage.setItem("user_id_global", this.state.user_id_gobal)
      var welcome = "";

      if(!LoggedIn)
      {
        button = <Button onClick={this.login}>Login</Button> 
        welcome = "Please enter Your Information"
      }
      else
      {
       button =  <Link to="/home">
                 <Button>Continue</Button>
                </Link>
       welcome = "";         
      }
    return (
      <>


      <h1 className = "BorrowMe_Title"></h1>
      <div className="Login_Page">
      <h2> {welcome}</h2>
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