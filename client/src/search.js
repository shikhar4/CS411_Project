import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';
var head = [];
var table_data = [];


class Search extends Component {

   constructor(props){
       super(props);
       this.state={
         productName:"",
         productInfo:[] 
       }
       this.generateSearchBar = this.generateSearchBar.bind(this)
       this.handleChange_productName = this.handleChange_productName.bind(this)
       this.searchProduct = this.searchProduct.bind(this);
       this.add_product_info = this.add_product_info.bind(this); 
       this.borrowItem = this.borrowItem.bind(this);
       
   }

   generateSearchBar(){
     return(
     <>
      <h3>Search For a Product</h3>
      <div>
      
      <label className="InputLabels"> Product: </label><input type="text" value={this.state.productName} onChange={this.handleChange_productName} class="Input" placeholder="Name" />
      </div>
     </>)
   }
   handleChange_productName(evt) {
    this.setState({ productName: evt.target.value });
   };
   
  add_product_info(Username,ProductName,type,brandName,productID,userID){
    const product_arr = {Username, ProductName,type,brandName,productID,userID}
    this.setState(prevState => ({
      productInfo: [...prevState.productInfo, product_arr]
    }))
  
  }
   searchProduct(){
     head = []
     table_data = []; 
     this.setState({productInfo: []})
     console.log(this.state.productInfo)
    Axios.post('http://localhost:3001/api/search_product',
    {ProductName: this.state.productName, userID: localStorage.getItem("user_id_global")}).then((res)=>{
      for(var i = 0; i < res.data.length; i++){
        var user = res.data[i];
        this.add_product_info(user.UserName, user.ProductName, user.type, user.brandName, user.productID,user.userID)
      }
    })
    
   
    if(this.state.productInfo.length > 0){

      head.push(<th key={'Username'}>{'Username'}</th>)
      head.push(<th key={'ProductName'}>{'ProductName'}</th>)
      head.push(<th key={'type'}>{'type'}</th>)
      head.push(<th key={'brandName'}>{'brandName'}</th>)
      
      for(var i =0; i < this.state.productInfo.length; i++){
        const {Username, ProductName,type,brandName,productID, userID } = this.state.productInfo[i]
        
        table_data.push(
              <tr key ={Username} id = {productID}>
                <td>{Username}</td>
                <td>{ProductName}</td>
                <td>{type}</td>
                <td>{brandName}</td>
                <td><Link to = '/borrowed_items'><Button onClick = {()=>this.borrowItem(Username,ProductName,type, brandName, productID,userID)}> Borrow </Button></Link></td>
              </tr>)
      }
      
    }
  
  }

  borrowItem(Username,ProductName,type,brandName,productID,userID){
    var today = new Date();
    var BorrowDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
    var DueDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate()+7)
   
    Axios.post('http://localhost:3001/api/borrow_product', 
    {ProductID: productID, BorrowerID: localStorage.getItem('user_id_global'), OwnerID: userID, dueDate: DueDate, borrowDate: BorrowDate})
  
  }

   render(){

    
       return(
        <>
        <div>{this.generateSearchBar()}</div>
        <div><Button onClick={this.searchProduct}>Submit</Button> </div>
        <div>
            <table className="table  table-hover">
              <thead><tr>{head}</tr></thead>
              <tbody>
                {table_data}
              </tbody>
            </table>
         </div>
         </>
       )
   
   }
}


export default Search;