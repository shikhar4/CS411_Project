import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';
var product_table = [] 
var b = 0
var table_data = []
var head = []
const columnHeader =["UserName","Product Name","Brand","DueDate", "BorrowDate"];

class BorrowedItems extends Component {
    constructor(props){
        super(props)
        this.state={
          product_table : []
        }
        this.returnItem = this.returnItem.bind(this); 
        this.add_entry = this.add_entry.bind(this)
        this.refreshTable = this.refreshTable.bind(this)
    }
    add_entry(UserName, productName, brandName, DueDate, BorrowDate, borrowerID, ownerID,productID,isBorrowed){
      const product_arr = {UserName, productName, brandName, DueDate, BorrowDate,borrowerID, ownerID,productID,isBorrowed}
      this.setState(prevState =>({
        product_table : [...prevState.product_table, product_arr]
      }))
    }
    refreshTable(){
      head = [] 
      table_data = []
      
      Axios.post('http://localhost:3001/api/search_borrowed_items',
        {userID:localStorage.getItem("user_id_global")}).then((res)=>{
          product_table = [];
          for(var i = 0; i < res.data.length; i++)
          { 
            var x = res.data[i]
            this.add_entry(x.UserName, x.productName,x.brandName, x.DueDate, x.BorrowDate,x.borrowerID, x.ownerID,x.productID, x.isBorrowed)
          }
        
        })
      this.setState({product_table:[]})
      if(this.state.product_table.length > 0){
        head.push(<th key={'Username'}>{'Username'}</th>)
        head.push(<th key={'ProductName'}>{'Product Name'}</th>)
        head.push(<th key={'Brand'}>{'Brand'}</th>)
        head.push(<th key={'DueDate'}>{'Due Date'}</th>)
        head.push(<th key={'DueDate'}>{'Borrow  Date'}</th>)

        for(var i = 0; i < this.state.product_table.length; i++){
          const {UserName, productName, brandName, DueDate, BorrowDate, borrowerID, ownerID,productID,isBorrowed} = this.state.product_table[i]
          var button; 
          if(isBorrowed)
          {
            button = <Link to = '/borrowed_items'><Button onClick = {()=>this.returnItem(borrowerID,ownerID,productID)}> Return Item </Button></Link>
          }
          else
          {
            button = "Already Returned"
          }
          console.log(borrowerID, ownerID, productID)
          table_data.push(
            <tr>
              <td>{UserName}</td>
              <td>{productName}</td>
              <td>{brandName}</td>
              <td>{DueDate}</td>
              <td>{BorrowDate}</td>
              <td>{button}</td>
            </tr>)
        }
      }
      
    }
    returnItem(borrowerID, ownerID,productID){
      console.log(borrowerID, ownerID, productID)
      Axios.post('http://localhost:3001/api/return_item',
        {borrowID:borrowerID, ownID:ownerID, prodID:productID}).then(
          (res) => {
            alert("Item returned successfully. Please refresh page!");
          })
    }
    render(){
    
        return(
          <>
            <div><Button onClick ={this.refreshTable}>Refresh Table</Button></div>
            <div>
         <table className="table  table-hover">
         <thead>
             <tr>
             {head}
             </tr>
         </thead>
         <tbody>
             {table_data}
         </tbody>
         </table>
            </div>
          </>
        )
    }
}

export default BorrowedItems; 