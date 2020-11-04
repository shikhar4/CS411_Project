import React, { Component } from 'react';
import Axios from 'axios'
import { useEffect,useState } from "react";


class Insert extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId:'',
            password:''
        };
       this.handleChange_userid = this.handleChange_userid.bind(this); 
       this.handleChange_password = this.handleChange_password.bind(this);
       this.submitUserId = this.submitUserId.bind(this);
    };
     submitUserId() {
        Axios.post('http://localhost:3001/api/insert',
        {email:this.state.userId,password:this.state.password}).then(()=>{
          alert('successful insert')
        })
    }

  render() {
    return (
<div>
  <input type="text"  value = {this.state.userId} onChange={this.handleChange_userid} class = "Input" name="User's Item" placeholder={this.state.userId} aria-label="Recipient's username" />
  <input type="text"  value = {this.state.password} onChange={this.handleChange_password} class = "Input" name="User's Item" placeholder={this.state.userId} aria-label="Recipient's username" />
<button onClick={this.submitUserId}>Insert</button>
</div>

     )};

 handleChange_userid(evt) {
    this.setState({ userId: evt.target.value});   
 };
 handleChange_password(evt) {
    this.setState({ password: evt.target.value});   
 };

}

export default Insert;

