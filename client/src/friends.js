import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";

class friends extends Component {

   constructor(props){
       super(props);
       this.state={
    
    }
       this.Friend_Recommender = this.Friend_Recommender.bind(this);
   }

//this function should return top 3 distances   
Friend_Recommender(user_id)
{
    var friends_list;
    //first step is to find the 3 closest people that are not friends
Axios.post('http://localhost:3001/mongo/find',
{userID:1}).then((res)=>{
    
    
    
  })
 
}

   render(){
        this.Friend_Recommender()
        
       return(
           <div>
           </div>
       )
   }
}
export default friends;