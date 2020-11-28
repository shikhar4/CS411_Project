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
        lat_long:[],
        distances:[],
        closest_distance_not_friends:[],
        friends_types:[],
        friends_brandnames: []
        
    }
       this.Friend_Recommender = this.Friend_Recommender.bind(this);
       this.add_zip_info = this.add_zip_info.bind(this);
       this.add_lat_long_info = this.add_lat_long_info.bind(this); 
       this.add_dist_info = this.add_dist_info.bind(this);
       this.calculate_distance=this.calculate_distance.bind(this);
       this.add_friends_types = this.add_friends_types.bind(this);
       this.add_friends_brandnames = this.add_friends_brandnames.bind(this);
       
       
   }
componentDidMount(){
  this.Friend_Recommender(); 
}

add_friends_types(type){
  const type_arr = {type}
  this.setState({friends_types: type_arr})
}

add_friends_brandnames(brandname) {
  const brandname_arr = {brandname}
  this.setState({friends_brandnames: brandname_arr})
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
add_dist_info(distance){
  const distance_num = {distance}
  this.setState(prevState => ({
    distances: [...prevState.distances, distance_num]
  }))
}

add_not_friends(friend){
  const friend_index= {friend}
  this.setState(prevState => ({
    closest_distance_not_friends: [...prevState.closest_distance_not_friends, friend_index]
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

// getUserLatLong(){
//   Axios.post('http://localhost:3001/find_coordinates',
//   {userID:localStorage.getItem("zipcode_global")}).then((res)=>{

//   })
// }

//this function should return top 3 distances   
Friend_Recommender(user_id)
{  
    var x = 0;
    //console.log("before first for loop")
    //first step is to find the 3 closest people that are not friends
    Axios.post('http://localhost:3001/mongo/find',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
       // console.log(res.data[0].friend_list)
        //console.log(res.data)
        for(var i = 0; i < res.data.length; i++)
        { 
          var x = res.data[0].friend_list[i]
          f= f +" "
          f= f + JSON.stringify(x);
          //console.log(f)
        }
    
      })
      //console.log(f)
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
        Promise.all(promsArr).then(resp=>{
          for(var i = 0; i < resp.length; i++){
            this.add_zip_info(resp[i].data[0].zipCode)
          }
          
        }).catch(err => {console.log(err)})
        var user_zip = localStorage.getItem("zipcode_global");
        
        

        if(this.state.zipcodes.length > 0){
          
          this.add_zip_info(user_zip)
        }
        
        //var new_zipcodes = this.state.zipcodes
       
        //console.log(user_zip)
        
        //console.log(not_friends)
         
        //const {zipcode} = this.state.zipcodes[0]
        
        let promLatLongArr = []
        for(var i = 0; i < this.state.zipcodes.length; i++)
        {
  
               promLatLongArr.push(Axios.post('http://localhost:3001/find_coordinates',
                 { zipcodes: this.state.zipcodes[i].zipCode}))
            
            
        }
        this.setState({lat_long: []})
        Promise.all(promLatLongArr).then(resp=>{
          for(var i = 0; i < resp.length; i++){
            this.add_lat_long_info(resp[i].data[0])
          }
        }).catch(err => {console.log(err)})
        if(this.state.lat_long.length > 0){
          console.log(this.state.lat_long[0].lat_long.lat)
        }
        
        // Axios.post('http://localhost:3001/find_coordinates',
        //   {zipcode: localStorage.getItem("zipcode_global")}).then((res)=>{
        //     console.log(res)
        // })
        
        this.setState({distances: []})

        for(var i =1; i<this.state.lat_long.length; i++){
            var not_friend_lat = this.state.lat_long[i].lat_long.lat; 
            var not_friend_lon = this.state.lat_long[i].lat_long.lng;
            var user_lat = this.state.lat_long[0].lat_long.lat; 
            var user_lon = this.state.lat_long[0].lat_long.lng; 
            var dist_meter = this.calculate_distance(user_lat,user_lon,not_friend_lat,not_friend_lon)
            var dist_mile = dist_meter * 0.000621371
            this.add_dist_info(dist_mile)
            
         }
          if(this.state.distances.length > 0){
            console.log(this.state.zipcodes)
            console.log(this.state.distances)
            console.log(not_friends)
            //console.log(this.state.distances[0])
          }
          //console.log(this.state.zipcodes) 
        if(this.state.distances.length > 7){
          var temp_min = this.state.distances[0].distance
          var temp_min_index1 = -1; 
          for(var i = 0; i < this.state.distances.length; i++){
            var temp = this.state.distances[i].distance
            if(temp <= temp_min){
              temp_min = temp;
              temp_min_index1 = i; 
            }
          }

          temp_min = this.state.distances[0].distance
          var temp_min_index2 = -1; 
          for(var i = 0; i < this.state.distances.length; i++){
            var dummy = this.state.distances[i].distance
            if((dummy <= temp_min) && (i!=temp_min_index1)){
              temp_min = dummy;
              temp_min_index2 = i; 
            }
          }

          temp_min = this.state.distances[0].distance
          var temp_min_index3 = -1; 
          for(var i = 0; i < this.state.distances.length; i++){
            var dummy2 = this.state.distances[i].distance
            if((dummy2 <= temp_min) && (i!=temp_min_index1) && (i!=temp_min_index2)){
              temp_min = dummy2;
              temp_min_index3 = i; 
            }
          }

          console.log("min1",temp_min_index1)
          console.log("min2",temp_min_index2)
          console.log("min3", temp_min_index3)
          
          this.setState({closest_distance_not_friends: []})
          this.add_not_friends(not_friends[temp_min_index1])
          this.add_not_friends(not_friends[temp_min_index2])
          this.add_not_friends(not_friends[temp_min_index3])
          console.log("THIS LINE", this.state.closest_distance_not_friends)        
        }



        //api call /types
        //pass in userid and this.stat.closet_distance_friends
        //return array which store it 
        Axios.post('http://localhost:3001/types',
        {userID: localStorage.getItem("user_id_global"), notfriends: this.state.closest_distance_not_friends}).then(
          (res) => {
            this.add_friends_types(res.data)
          }
        )

        console.log(this.state.friends_types)

        //api call /brandname
        //pass in userid and this.stat.closet_distance_friends
        //return array which store it 
        Axios.post('http://localhost:3001/brandname',
        {userID: localStorage.getItem("user_id_global"), notfriends: this.state.closest_distance_not_friends}).then(
          (res) => {
            this.add_friends_brandnames(res.data)
          }
        )
        console.log(this.state.friends_brandnames)

        var min = 99999;
        var max = 0;

        for (var i = 0; i < 3; i++) {
          if (this.state.closest_distance_not_friends[i] < min) {
            min = this.state.closest_distance_not_friends[i]
          }

          if (this.state.closest_distance_not_friends[i] > max) {
            max = this.state.closest_distance_not_friends[i]
          }
        }

        var tempArray = []
        
        for (var i = 0; i < 3; i++) {
          console.log(min, max, this.state.closest_distance_not_friends)
          tempArray.push((this.state.closest_distance_not_friends[i] - min) / (max - min))
        }

        this.setState({closest_distance_not_friends: tempArray})

        console.log(this.state.closest_distance_not_friends)

        //find way to inverse distances
        //index into array from types api + index into array from brandname api + inverse distance 
       

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