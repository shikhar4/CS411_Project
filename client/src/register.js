import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId:'',
            password:'',
            firstName:'',
            lastName:'',
            email: '',
            phoneNumber:'',
            zipCode:'',
            submit:false
        };
       this.handleChange_userid = this.handleChange_userid.bind(this); 
       this.handleChange_password = this.handleChange_password.bind(this);
       this.handleChange_firstName = this.handleChange_firstName.bind(this); 
       this.handleChange_lastName = this.handleChange_lastName.bind(this); 
       this.handleChange_email= this.handleChange_email.bind(this);
       this.handleChange_phoneNumber= this.handleChange_phoneNumber.bind(this);  
       this.handleChange_zipCode= this.handleChange_zipCode.bind(this); 


       this.submitUserId = this.submitUserId.bind(this);
    };
     submitUserId() {
        Axios.post('http://localhost:3001/api/insert',
        {UserName:this.state.userId, password:this.state.password, FirstName:this.state.firstName, LastName:this.state.lastName, Email:this.state.email,
        Phone:this.state.phoneNumber, Zip:this.state.zipCode}).then(()=>{
        })
        this.setState({ userId: ''}); 
        this.setState({ password: ''}); 
        this.setState({ firstName: ''}); 
        this.setState({ lastName: ''}); 
        this.setState({ email: ''}); 
        this.setState({ phoneNumber: ''}); 
        this.setState({ zipCode: ''}); 
        this.setState({submit: true});
    }

  render() {
    var button;
    const submit = this.state.submit;
    if(!submit)
    {
      button = <Button onClick={this.submitUserId}>Submit</Button> 
    }
    else
    {
     button =  <Redirect to ="/"/>      
    }
    return (
      <>
      <h3>Registration Information</h3>
      <div>
        <label className = "InputLabels">User: </label><input type="text"  value = {this.state.userId} onChange={this.handleChange_userid} class = "Input" placeholder="User Name" />
        <label className = "InputLabels">Password:</label><input type="text"  value = {this.state.password} onChange={this.handleChange_password} class = "Input" placeholder = "Password" />
        <label className = "InputLabels">First Name:</label><input type="text"  value = {this.state.firstName} onChange={this.handleChange_firstName} class = "Input" placeholder = "First Name" />
        <label className = "InputLabels">Last Name:</label><input type="text"  value = {this.state.lastName} onChange={this.handleChange_lastName} class = "Input" placeholder = "Last Name" />
        <label className = "InputLabels">Email:</label><input type="text"  value = {this.state.email} onChange={this.handleChange_email} class = "Input" placeholder = "Email" />
        <label className = "InputLabels">Phone:</label><input type="text"  value = {this.state.phoneNumber} onChange={this.handleChange_phoneNumber} class = "Input" placeholder = "Phone" />
        <label className = "InputLabels">ZipCode:</label><input type="text"  value = {this.state.zipCode} onChange={this.handleChange_zipCode} class = "Input" placeholder = "Zip Code" />
      </div>

      <div>{button}</div>
      </>

  )};

 handleChange_userid(evt) {
    this.setState({ userId: evt.target.value});   
 };
 handleChange_password(evt) {
    this.setState({ password: evt.target.value});   
 };
 handleChange_firstName(evt) {
  this.setState({ firstName: evt.target.value});   
};
handleChange_lastName(evt) {
  this.setState({ lastName: evt.target.value});   
};
handleChange_email(evt) {
  this.setState({ email: evt.target.value});   
};
handleChange_phoneNumber(evt) {
  this.setState({ phoneNumber: evt.target.value});   
};
handleChange_zipCode(evt) {
  this.setState({ zipCode: evt.target.value});   
};

}

export default Register;

