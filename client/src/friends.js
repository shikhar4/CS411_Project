import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
var friends1 =[];
var all_users =[];
var not_friends = [];
function add_entry(x){
  friends1.push(x)
}
function add_entry_all(x){
    all_users.push(x)
  }


class friends extends Component {

   constructor(props){
       super(props);
       this.state={
        not_friends: []
    }
       this.Friend_Recommender = this.Friend_Recommender.bind(this);
   }

//this function should return top 3 distances   
Friend_Recommender(user_id)
{
    friends1 =[];
    all_users =[];
    var friends_list;
    var x = 0;
    //first step is to find the 3 closest people that are not friends
    Axios.post('http://localhost:3001/mongo/find',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
        console.log(res.data[0].friend_list)
        for(var i = 0; i < res.data.length; i++)
        { 
          var x = res.data[0].friend_list[i]
          add_entry(x)
          friends1.push(x)
        }
    
      })

      Axios.post('http://localhost:3001/mongo/find_notfriends',
      {userID:localStorage.getItem("user_id_global"), f: friends1}).then((res)=>{
          
          for(var i = 0; i < res.data.length; i++)
          { 
            var x = res.data[i].userID
            add_entry_all(x)
          }
      
        })
        console.log(JSON.stringify(all_users));

 
  
        console.log("here")
        for( var i = 0; i < friends1.length; i++)
        {
            for(var j =0; j < all_users.length; j++)
            {
                console.log(friends1[i])
                console.log(all_users[j])
                if(friends1[i] == all_users[j])
                {
                    console.log("here")
                    all_users[j] = -1;
                }

            }
        }
        console.log(all_users);
 

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