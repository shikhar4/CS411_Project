import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



class Insert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      type: "",
      submit: false,
      color:"'",
      brandname:"",
      modelNumber:"",
      releaseYear:""
    };
    this.handleChange_productName = this.handleChange_productName.bind(this);
    this.handleChange_type = this.handleChange_type.bind(this);
    this.handleChange_brandName = this.handleChange_brandName.bind(this);
    this.handleChange_modelNumber = this.handleChange_modelNumber.bind(this);
    this.handleChange_releaseYear = this.handleChange_releaseYear.bind(this);
    this.handleChange_color = this.handleChange_color.bind(this);



    this.submitproduct = this.submitproduct.bind(this);
  };
  submitproduct() {
    Axios.post('http://localhost:3001/api/insert_product',
      { userID: localStorage.getItem("user_id_global"), name: this.state.productName, type: this.state.type, brandName: this.state.brandname, modelNumber:this.state.modelNumber, releaseYear:this.state.releaseYear, color:this.state.color }).then(() => {
      })
    this.setState({productName: ""})
    this.setState({type: ""})
    this.setState({color: ""})
    this.setState({brandname: ""})
    this.setState({modelNumber: ""})
    this.setState({releaseYear: ""})
  }

  render() {
    return (
      <>
        <div className = "Functionality">
        <h3>Insert Product</h3>
        <div>
          <label className="InputLabels">Product Name: </label><input type="text" value={this.state.productName} onChange={this.handleChange_productName} class="Input" placeholder="Name" />
          <label className="InputLabels">Product Type: </label><input type="text" value={this.state.type} onChange={this.handleChange_type} class="Input" placeholder="Books,Home,Electronics,Games, or Tools" />
          <label className="InputLabels">Brand Name: </label><input type="text" value={this.state.brandname} onChange={this.handleChange_brandName} class="Input" placeholder="Name" />
          <label className="InputLabels">Model Number: </label><input type="text" value={this.state.modelNumber} onChange={this.handleChange_modelNumber} class="Input" placeholder="Name" />
          <label className="InputLabels">Release Year: </label><input type="text" value={this.state.releaseYear} onChange={this.handleChange_releaseYear} class="Input" placeholder="Name" />
          <label className="InputLabels">Color: </label><input type="text" value={this.state.color} onChange={this.handleChange_color} class="Input" placeholder="Color" />
        </div>
        <div><Button onClick={this.submitproduct}>Submit</Button> </div>
        </div>
      </>

    )
  };

  handleChange_productName(evt) {
    this.setState({ productName: evt.target.value });
  };

  handleChange_type(evt) {
    this.setState({ type: evt.target.value });
  };
  handleChange_brandName(evt) {
    this.setState({ brandname: evt.target.value });
  };
  handleChange_modelNumber(evt) {
    this.setState({ modelNumber: evt.target.value });
  };
  handleChange_releaseYear(evt) {
    this.setState({ releaseYear: evt.target.value });
  };
  handleChange_color(evt) {
    this.setState({ color: evt.target.value });
  };
}

export default Insert; 