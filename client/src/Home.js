import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
const columnHeader =["productID","ProductName","type","dateBorrowed","dateDue","borrowerID"];
const user_id = localStorage.getItem("user_id_global")
var product_table =[];
product_table.push({productID:0,type:0,dateBorrowed:0,dateDue:0,borrowerID:0,ProductName:0})
var b = 0;
function add_entry(productID,type,dateBorrowed,dateDue,borrowerID,ProductName){
  product_table.push({productID,type,dateBorrowed,dateDue,borrowerID,ProductName})
}
class Home extends Component {

   constructor(props){
       super(props);
       this.state={
       }
       this.generateHeader = this.generateHeader.bind(this);
       this.generateTableData = this.generateTableData.bind(this);
       this.search = this.search.bind(this);
      //  this.add_entry = this.add_entry(this);
   }


   generateHeader(){
       let res=[];
     for(var i =0; i < columnHeader.length; i++){
         res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
     }
     return res;
   }

    search() {
    Axios.post('http://localhost:3001/api/search',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
      var data = []
      product_table = [];
      for(var i = 0; i < res.data.length; i++)
      { 
        var x = res.data[i]
        add_entry(x.productID,x.type,x.dateBorrowed,x.dateDue,x.borrowerID,x.ProductName)
      }
      //localStorage.setItem("Table_data", data)
    
    })
     b= 1;
  }

   generateTableData(){
    this.search();
       let res=[];
       let tableData = product_table;
       if(b)
       {
       console.log(tableData.length)
       }
       //"productID","ProductName","type","dateBorrowed","dateDue","borrowerID"
       for(var i =0; i < tableData.length; i++){
           res.push(
            <tr >
           <td key={tableData[i].productID}>{tableData[i].productID}</td>
           <td>{tableData[i].ProductName}</td>
           <td>{tableData[i].type}</td>
           <td>{tableData[i].dateBorrowed}</td>
           <td >{tableData[i].dateDue}</td>
           <td >{tableData[i].borrowerID}</td>
           </tr>
           )
       }
       return res;
   }
   render(){
    
       return(
           <div>
        <table className="table  table-hover">
        <thead>
            <tr>
            {this.generateHeader()}
            </tr>
        </thead>
        <tbody>
            {this.generateTableData()}
        </tbody>
        </table>
           </div>
       )
   }
}
export default Home;