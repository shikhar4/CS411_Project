import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";

const user_id = localStorage.getItem("user_id_global")
var product
class Search extends Component {
 

  constructor(props){
    super(props);
    this.state = {
          x: []
    };
   this.search = this.search.bind(this);
};

  search() {
    Axios.post('http://localhost:3001/api/search',
    {userID:1}).then((res)=>{
      console.log(res)
      this.setState({x:res.data[0]})
      console.log(this.x)
    
    })
  }

  render() {
    return (
      <>
      <h2>My Products</h2>
      <div>
        <h1>{product}</h1>
      <Button onClick={this.search}>Search</Button> 
      </div>

      </>
    );
  }
}

export default Search;