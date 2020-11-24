import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
const columnHeader =["ProductID","ProductName","Type","BrandName","ModelNumber","ReleaseYear", "Color"];
const user_id = localStorage.getItem("user_id_global")
var product_table =[];
product_table.push({productID:0,ProductName:0,type:0,BrandName:0,ModelNumber:0,ReleaseYear:0, Color:0})
var b = 0;
function add_entry(productID,ProductName,type,BrandName,ModelNumber,ReleaseYear,Color){
  product_table.push({productID,ProductName,type,BrandName,ModelNumber,ReleaseYear,Color})
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
        console.log(x)
        add_entry(x.productID,x.ProductName,x.type,x.brandName,x.modelNumber,x.releaseYear,x.color)
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
       //""ProductID","Product Name","Type","Brand Name","Model Number","Release Year", "Color""
       for(var i =0; i < tableData.length; i++){
           res.push(
            <tr >
           <td key={tableData[i].productID}>{tableData[i].productID}</td>
           <td>{tableData[i].ProductName}</td>
           <td>{tableData[i].type}</td>
           <td>{tableData[i].BrandName}</td>
           <td >{tableData[i].ModelNumber}</td>
           <td >{tableData[i].ReleaseYear}</td>
           <td >{tableData[i].Color}</td>
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