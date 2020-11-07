import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';




class my_account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: "'",
      password: localStorage.getItem("password_global"),
      firstName: localStorage.getItem("firstname_global"),
      lastName: localStorage.getItem("lastname_global"),
      email: localStorage.getItem("email_global"),
      phoneNumber: localStorage.getItem("phonenumber_global"),
      zipCode: localStorage.getItem("zipcode_global"),
      submit: false
    };
    this.handleChange_userid = this.handleChange_userid.bind(this);
    this.handleChange_password = this.handleChange_password.bind(this);
    this.handleChange_firstName = this.handleChange_firstName.bind(this);
    this.handleChange_lastName = this.handleChange_lastName.bind(this);
    this.handleChange_email = this.handleChange_email.bind(this);
    this.handleChange_phoneNumber = this.handleChange_phoneNumber.bind(this);
    this.handleChange_zipCode = this.handleChange_zipCode.bind(this);


    this.submitupdate = this.submitupdate.bind(this);
  };

  submitupdate() {
    Axios.post('http://localhost:3001/api/update',
      { userID: localStorage.getItem('user_id_global'), firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, phone: this.state.phoneNumber, Zip: this.state.zipCode }).then(() => {
      })

  }


  render() {

    return (
      <>
        <h3>Registration Information</h3>
        <div>

          <label className="InputLabels">Password:</label><input type="password" value={this.state.password} onChange={this.handleChange_password} class="Input" placeholder={this.state.password} />
          <label className="InputLabels">First Name:</label><input type="text" value={this.state.firstName} onChange={this.handleChange_firstName} class="Input" placeholder={this.state.firstName} />
          <label className="InputLabels">Last Name:</label><input type="text" value={this.state.lastName} onChange={this.handleChange_lastName} class="Input" placeholder={this.state.lastName} />
          <label className="InputLabels">Email:</label><input type="text" value={this.state.email} onChange={this.handleChange_email} class="Input" placeholder={this.state.email} />
          <label className="InputLabels">Phone:</label><input type="text" value={this.state.phoneNumber} onChange={this.handleChange_phoneNumber} class="Input" placeholder={this.state.phoneNumber} />
          <label className="InputLabels">ZipCode:</label><input type="text" value={this.state.zipCode} onChange={this.handleChange_zipCode} class="Input" placeholder={this.state.zipCode} />
        </div>
        <div><Button onClick={this.submitupdate}>Submit</Button> </div>
      </>

    )
  };

  handleChange_userid(evt) {
    this.setState({ userId: evt.target.value });
  };
  handleChange_password(evt) {
    this.setState({ password: evt.target.value });
  };
  handleChange_firstName(evt) {
    this.setState({ firstName: evt.target.value });
  };
  handleChange_lastName(evt) {
    this.setState({ lastName: evt.target.value });
  };
  handleChange_email(evt) {
    this.setState({ email: evt.target.value });
  };
  handleChange_phoneNumber(evt) {
    this.setState({ phoneNumber: evt.target.value });
  };
  handleChange_zipCode(evt) {
    this.setState({ zipCode: evt.target.value });
  };
}

export default my_account;


