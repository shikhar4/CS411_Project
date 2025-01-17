import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


class Insert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      type: "",
      submit: false,
      color:"",
      brandname:"",
      modelNumber:"",
      releaseYear:"",
      type_test: ""
    };
    this.handleChange_productName = this.handleChange_productName.bind(this);
    this.handleChange_type = this.handleChange_type.bind(this);
    this.handleChange_brandName = this.handleChange_brandName.bind(this);
    this.handleChange_modelNumber = this.handleChange_modelNumber.bind(this);
    this.handleChange_releaseYear = this.handleChange_releaseYear.bind(this);
    this.handleChange_color = this.handleChange_color.bind(this);
    this.handleSelect = this.handleSelect.bind(this);


    this.submitproduct = this.submitproduct.bind(this);
  };
  submitproduct() {
    Axios.post('http://localhost:3001/api/insert_product',
      { userID: localStorage.getItem("user_id_global"), name: this.state.productName, type: this.state.type_test, brandName: this.state.brandname, modelNumber:this.state.modelNumber, releaseYear:this.state.releaseYear, color:this.state.color }).then(() => {
      })
    this.setState({productName: ""})
    this.setState({type: ""})
    this.setState({color: ""})
    this.setState({brandname: ""})
    this.setState({modelNumber: ""})
    this.setState({releaseYear: ""})
  }

  render() {
    const [value,setValue]= ''


    return (
      <>
        <div className = "Functionality">
        <h3>Insert Product</h3>
        <div>
          <label className="InputLabels">Product Name: </label><input type="text" value={this.state.productName} onChange={this.handleChange_productName} class="Input" placeholder="Product Name" />
        </div>
        <div>  
          <DropdownButton
      title="Type"
      id="dropdown"
      onSelect={this.handleSelect}
        >
              <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item eventKey="Games">Games</Dropdown.Item>
              <Dropdown.Item eventKey="Decor">Decor</Dropdown.Item>
              <Dropdown.Item eventKey="Fashion">Fashion</Dropdown.Item>
              <Dropdown.Item eventKey="Misc">Misc</Dropdown.Item>
      </DropdownButton>
          <label className="InputLabels">Brand Name: </label><input type="text" value={this.state.brandname} onChange={this.handleChange_brandName} class="Input" placeholder="Brand Name" />
          <label className="InputLabels">Model Number: </label><input type="text" value={this.state.modelNumber} onChange={this.handleChange_modelNumber} class="Input" placeholder="Model Number" />
          <label className="InputLabels">Release Year: </label><input type="text" value={this.state.releaseYear} onChange={this.handleChange_releaseYear} class="Input" placeholder="Release Year" />
          <label className="InputLabels">Color: </label><input type="text" value={this.state.color} onChange={this.handleChange_color} class="Input" placeholder="Color" />
        </div>
         
      
        <div><Button className = "submitInfoButton" onClick={this.submitproduct}>Submit</Button> </div>
        </div>

        
      </>

    )
  };

 handleSelect=(e)=>{
    console.log(e);
    this.setState({ type_test: e });
  }
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