import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";

var s = "0"
var f = "0"
var z = "";
var not_friends = [];



class friends extends Component {

   constructor(props){
       super(props);
       this.state={
        zipcodes:[]
    }
       this.Friend_Recommender = this.Friend_Recommender.bind(this);
       this.add_zip_info = this.add_zip_info.bind(this);
   }
   add_zip_info(zipCode){
    const zip_arr = {zipCode}
    this.setState(prevState => ({
      zipcodes: [...prevState.zipcodes, zip_arr]
    }))
  
  }
//this function should return top 3 distances   
Friend_Recommender(user_id)
{  
    var x = 0;
    //first step is to find the 3 closest people that are not friends
    Axios.post('http://localhost:3001/mongo/find',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
        console.log(res.data[0].friend_list)
        for(var i = 0; i < res.data.length; i++)
        { 
          var x = res.data[0].friend_list[i]
          f= f +" "
          f= f + JSON.stringify(x);
        }
    
      })

      Axios.post('http://localhost:3001/mongo/find_notfriends',
      {userID:localStorage.getItem("user_id_global"), f: friends1}).then((res)=>{
          
          for(var i = 0; i < res.data.length; i++)
          { 
            var x = res.data[i].userID
            s= s +" "
            s= s + JSON.stringify(x);
            
          
          }
      
        })
       
        var all_users = s.split(' ')
        var friends1 = f.split(' ')
        s = "0";
        f=  "0"
        console.log(all_users.length)
        console.log(friends1.length)

        for( var i = 0; i < friends1.length; i++)
        {
            for(var j =0; j < all_users.length; j++)
            {
                if(friends1[i] == all_users[j])
                {
                   
                    all_users[j] = -1;
                }

            }
        }
        console.log(all_users);

 
         

        for(var i = 0; i < all_users.length; i++)
        {
            if(all_users[i] != -1)
            {
        Axios.post('http://localhost:3001/find_zipcodes',
        {userID:localStorage.getItem("user_id_global"), not_friends: all_users[i]}).then((res)=>{
            console.log(res.data[0].zipCode)
            // var xx = res.data[0].zipCode;
            // z = z + " ";
            // z = z + JSON.stringify(xx);

          })
        }
        }
        console.log(z)





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