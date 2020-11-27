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
        zipcodes:[],
        lat_long:[]
    }
       this.Friend_Recommender = this.Friend_Recommender.bind(this);
       this.add_zip_info = this.add_zip_info.bind(this);
       this.calculate_distance=this.calculate_distance.bind(this);
   }
add_zip_info(zipCode){
    const zip_arr = {zipCode}
    this.setState(prevState => ({
      zipcodes: [...prevState.zipcodes, zip_arr]
    }))
  
  }
add_lat_long_info(lat_long){
  const lat_long_arr = {lat_long}
  this.setState(prevState => ({
    lat_long: [...prevState.lat_long, lat_long_arr]
  }))
}

calculate_distance(lat1,lon1,lat2,lon2){
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d
}
//this function should return top 3 distances   
Friend_Recommender(user_id)
{  
    var x = 0;
    //console.log("before first for loop")
    //first step is to find the 3 closest people that are not friends
    Axios.post('http://localhost:3001/mongo/find',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
       // console.log(res.data[0].friend_list)
        console.log(res.data)
        for(var i = 0; i < res.data.length; i++)
        { 
          var x = res.data[0].friend_list[i]
          f= f +" "
          f= f + JSON.stringify(x);
          //console.log(f)
        }
    
      })
      console.log(f)
      //console.log("before second for loop")
      Axios.post('http://localhost:3001/mongo/find_notfriends',
      {userID:localStorage.getItem("user_id_global"), f: friends1}).then((res)=>{
          
          for(var i = 0; i < res.data.length; i++)
          { 
            var x = res.data[i].userID
            s= s +" "
            s= s + JSON.stringify(x);
            //console.log(s)
            
          
          }
      
        })
       
        var all_users = s.split(' ')
        var friends1 = f.split(' ')
        s = "0";
        f=  "0"
        //console.log(all_users.length)
        //console.log(friends1.length)

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
        //console.log(all_users);
        var garbage = all_users; 
        var not_friends = []; 
        //console.log(not_friends)
        for(var i = 0; i < garbage.length; i++){
          if(garbage[i] != -1){
            not_friends.push(garbage[i])
          }
        }
        //console.log(not_friends)
        this.setState({zipcodes:[]})
        let promsArr = []

        for(var i = 0; i < not_friends.length; i++)
        {
  
               promsArr.push(Axios.post('http://localhost:3001/find_zipcodes',
                 {userID:localStorage.getItem("user_id_global"), not_friends: not_friends[i]})
                 )
            
            //console.log(this.state.zipcodes) 
        }
        Promise.all(promsArr).then(resp=>{console.log("data",resp);}).catch(err => {console.log(err)})

        var new_zipcodes = this.state.zipcodes
          //this.setState({zipcodes:[]})
          // var user_zip = localStorage.getItem("zipcode_global");
          // console.log(user_zip)
          // this.setState(prevState => ({
          //   zipcodes: [...prevState.zipcodes, user_zip]
          // }))
          //console.log(not_friends)
         
        //const {zipcode} = this.state.zipcodes[0]
        // this.setState({lat_long:[]})
        // for(var i = 0; i < new_zipcodes.length; i++)
        // {
  
        //        Axios.post('http://localhost:3001/find_coordinates',
        //          { zipcodes: new_zipcodes[i]}).then((res)=>{
        //              // console.log(res.data)
                       
        //               // var xx = res.data[0].zipCode;
        //               // z = z + " ";
        //               // z = z + JSON.stringify(xx);
        //               // var zip_arr = res.data[0].zipCode; 
        //               // console.log(zip_arr)
        //               // this.setState(prevState => ({
        //               //   zipcodes: [...prevState.zipcodes, zip_arr]
        //               // }))
        //               var lat_long_arr = res.data[0]
        //               this.add_lat_long_info(lat_long_arr)
        //               //console.log(this.state.lat_long)

        //          })
            
            
        //   }
          
          
        //   for(var i =0; i<this.state.lat_long.length; i++){
        //     var not_friend_lat = this.state.lat_long[i].lat; 
        //     var not_friend_lon = this.state.lat_long[i].lng;
        //     var user_lat = 41.76365; 
        //     var user_lon = -88.14514;
        //     var dist_meter = this.calculate_distance(user_lat,user_lon,not_friend_lat,not_friend_lon)
        //     var dist_mile = dist_meter * 0.000621371
        //     console.log(i,dist_mile)
        //   }
          //console.log(this.state.zipcodes) 




}


   render(){
        //this.Friend_Recommender()
        
       return(
           <div>
               <div><Button onClick={this.Friend_Recommender}>Recommend</Button> </div>
               
           </div>
       )
   }
}
export default friends;