import './App.css';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Axios from 'axios'
import Delete from './Delete';
import Insert from './insert1';
import ProdReccomender from './reccomend_product'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import {Link} from 'react-router-dom';
const columnHeader =["ProductID","ProductName","Type","BrandName","ModelNumber","ReleaseYear", "Color"];
const user_id = localStorage.getItem("user_id_global")
var product_table =[];
var table_data = []

var friend_table = []
var friend_head = []
var head = []


class Home extends Component {

   constructor(props){
       super(props);
       this.state={
         product_table:[],
         showInsertComponent: false,
         showDeleteComponent: false,
         showRecommendComponent: false
       }
       
       this.clearAccountInfo = this.clearAccountInfo.bind(this);
       this.add_entry = this.add_entry.bind(this)
       this.refreshTable = this.refreshTable.bind(this)
       this.loadInsertTable = this.loadInsertTable.bind(this)
       this.loadDeleteTable = this.loadDeleteTable.bind(this)
       this.getFriendData = this.getFriendData.bind(this)
       this.loadRecommendData = this.loadRecommendData.bind(this)
      //  this.add_entry = this.add_entry(this);
   }

   add_entry(productID,ProductName,type,BrandName,ModelNumber,ReleaseYear,Color){
    
    const product_arr = {productID,ProductName,type,BrandName,ModelNumber,ReleaseYear,Color}
      this.setState(prevState =>({
        product_table : [...prevState.product_table, product_arr]
      }))
  }

  getFriendData(){ 
    Axios.post('http://localhost:3001/mongo/find',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
       // console.log(res.data[0].friend_list)
        console.log(res.data[0].friend_list[0])
        
        for(var i = 0; i < res.data[0].friend_list.length; i++)
        { 
          console.log(res.data[0].friend_list[i])
          friend_table.push(res.data[0].friend_list[i])
          
        }
      
    
      })
    console.log(friend_table)
  }

  refreshTable(){
    head = [] 
    table_data = []
    document.getElementById("Items_Table").style.visibility = "visible";
    this.setState({showInsertComponent : false})
    this.setState({showDeleteComponent : false})
    this.setState({showRecommendComponent : false})
    console.log(this.state.showInsertComponent)
    Axios.post('http://localhost:3001/api/search',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
      product_table = [];
      for(var i = 0; i < res.data.length; i++)
      { 
        var x = res.data[i]
        console.log(x)
        this.add_entry(x.productID,x.ProductName,x.type,x.brandName,x.modelNumber,x.releaseYear,x.color)
      }
      //localStorage.setItem("Table_data", data)
    
    })

    this.setState({product_table:[]})
    if(this.state.product_table.length > 0){
      head.push(<th key={'productID'}>{'Product ID'}</th>)
      head.push(<th key={'ProductName'}>{'Product Name'}</th>)
      head.push(<th key={'type'}>{'Type'}</th>)
      head.push(<th key={'brandName'}>{'Brand Name'}</th>)
      head.push(<th key={'modelNumber'}>{'Model Number'}</th>)
      head.push(<th key={'releaseYear'}>{'Release Year'}</th>)
      head.push(<th key={'color'}>{'Color'}</th>)


      for(var i = 0; i < this.state.product_table.length; i++){
        const {productID,ProductName,type,BrandName,ModelNumber,ReleaseYear,Color}= this.state.product_table[i]
        table_data.push(
          <tr>
            <td>{productID}</td>
            <td>{ProductName}</td>
            <td>{type}</td>
            <td>{BrandName}</td>
            <td>{ModelNumber}</td>
            <td>{ReleaseYear}</td>
            <td>{ReleaseYear}</td>
          </tr>)
      }
    }
  }

   clearAccountInfo(){
    localStorage.setItem("firstname_global", "");
    localStorage.setItem("lastname_global", "");
    localStorage.setItem("email_global", "");
    localStorage.setItem("phonenumber_global", "");
    localStorage.setItem("zipcode_global", "");
    localStorage.setItem("password_global", "");
   }
   loadInsertTable(){
     document.getElementById("Items_Table").style.visibility = "hidden";
     this.setState({showDeleteComponent:false})
     this.setState({showRecommendComponent:false})
     this.setState({showInsertComponent:true})
     //console.log(this.state.showInsertComponent)

   }
   loadDeleteTable(){
     document.getElementById("Items_Table").style.visibility = "hidden"
     this.setState({showInsertComponent:false})
     this.setState({showRecommendComponent:false})
     this.setState({showDeleteComponent:true})
   }
   loadRecommendData(){
    document.getElementById("Items_Table").style.visibility = "hidden"
    this.setState({showInsertComponent:false})
    this.setState({showDeleteComponent:false})
    this.setState({showRecommendComponent:true})
   }
   render(){
    
       return(
         <>
         <Container>
          <Row>
            <Col md = "auto"><Button onClick = {this.refreshTable}>Your Items</Button></Col>
            <Col md = "auto"><Button onClick = {this.loadInsertTable} >Insert Item</Button></Col>
            <Col md = "auto"><Button onClick = {this.loadDeleteTable} >Delete Item</Button></Col>
            <Col md = "auto"><Button onClick = {this.getFriendData}> My Friends</Button></Col>
            <Col md = "auto"><Button onClick = {this.loadRecommendData}> Recommend Products</Button></Col>
          </Row>
          </Container>
      
       <div>{this.state.showInsertComponent ? <Insert/> : null}</div>
       <div>{this.state.showDeleteComponent ? <Delete/> : null}</div>
       <div>{this.state.showRecommendComponent ? <ProdReccomender/> : null}</div>
      <div>
        <table className = "table table-hover" id = "Items_Table">
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
export default Home;