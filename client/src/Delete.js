import React, { Component } from 'react';
import Axios from 'axios'

class Delete extends Component{
    constructor(props){
        super(props)
        this.state = {
            userName : '',
            productName:''
        };
        this.handleChange_userName = this.handleChange_userName.bind(this);
        this.handleChange_productName = this.handleChange_productName.bind(this);

        this.deleteEntry = this.deleteEntry.bind(this) 
    }

    deleteEntry(){
        Axios.post('http://localhost:3001/api/delete',
        {user:localStorage.getItem("user_id_global"), product:this.state.productName}).then(()=>{
          alert('successful delete')
        })
        this.setState({ userName: ''}); 
        this.setState({ productName: ''}); 
    }

    render(){
        return(
            <>
            <h3>Delete Product</h3>
            <label className = "InputLabels">Product:</label><input type="text"  value = {this.state.productName} onChange={this.handleChange_productName} class = "Input" placeholder = "Produt Name" />
            
            <button className = "submitInfoButton" onClick={this.deleteEntry}>Delete Product</button>
            </>
        )
    }

    handleChange_userName(evt) {
        this.setState({ userName: evt.target.value});   
     };
     handleChange_productName(evt) {
        this.setState({ productName: evt.target.value});   
     };
}
export default Delete;