import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



class insert1 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      type: "",
      submit: false
    };
    this.handleChange_productName = this.handleChange_productName.bind(this);
    this.handleChange_type = this.handleChange_type.bind(this);


    this.submitproduct = this.submitproduct.bind(this);
  };
  submitproduct() {
    Axios.post('http://localhost:3001/api/insert_product',
      { userID: localStorage.getItem("user_id_global"), name: this.state.productName, type: this.state.type }).then(() => {
      })
  }

  render() {
    return (
      <>
        <h3>Registration Information</h3>
        <div>
          <label className="InputLabels">Product Name: </label><input type="text" value={this.state.productName} onChange={this.handleChange_productName} class="Input" placeholder="Name" />
          <text></text>
          <label className="InputLabels">Product Type: </label><input type="text" value={this.state.type} onChange={this.handleChange_type} class="Input" placeholder="Books,Home,Electronics,Games, or Tools" />
        </div>
        <div><Button onClick={this.submitproduct}>Submit</Button> </div>
      </>

    )
  };

  handleChange_productName(evt) {
    this.setState({ productName: evt.target.value });
  };

  handleChange_type(evt) {
    this.setState({ type: evt.target.value });
  };

}

export default insert1; 