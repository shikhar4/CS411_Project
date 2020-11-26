import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
var product_table = [] 
var b = 0
const columnHeader =["productID","borrowerID","ownerID","DueDate", "BorrowDate"];
function add_entry(productID,borrowerID,ownerID,DueDate, BorrowDate){
    product_table.push({productID,borrowerID,ownerID,DueDate, BorrowDate})
  }
class BorrowedItems extends Component {
    constructor(props){
        super(props)
        this.state={

        }
        this.search = this.search.bind(this);
        this.generateHeader = this.generateHeader.bind(this);
        this.generateTableData = this.generateTableData.bind(this);
    }
    search() {
        Axios.post('http://localhost:3001/api/search_borrowed_items',
        {userID:localStorage.getItem("user_id_global")}).then((res)=>{
          product_table = [];
          for(var i = 0; i < res.data.length; i++)
          { 
            var x = res.data[i]
            add_entry(x.productID, x.borrowerID, x.ownerID, x.DueDate, x.BorrowDate)
          }
          //localStorage.setItem("Table_data", data)
        
        })
        b= 1;
      }
    generateHeader(){
        let res=[];
         for(var i =0; i < columnHeader.length; i++){
          res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>)
        }
        console.log(res)
      return res;
    }

    generateTableData(){
        this.search();
        let res=[];
        let tableData = product_table;
        if(b){
            console.log(tableData.length)
        }
       //"productID","ProductName","type","dateBorrowed","dateDue","borrowerID"
        for(var i =0; i < tableData.length; i++){
           res.push(
            <tr >
                <td key={tableData[i].productID}>{tableData[i].productID}</td>
                <td>{tableData[i].borrowerID}</td>
                <td>{tableData[i].ownerID}</td>
                <td>{tableData[i].DueDate}</td>
                <td >{tableData[i].BorrowDate}</td>
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

export default BorrowedItems; 