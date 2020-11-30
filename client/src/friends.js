import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel,Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

var s = "0"
var f = "0"
var type_string = "0"
var brandname_string = "0"
var z = "";
var not_friends = [];
var friends_table_data = []
var head = []



class friends extends Component {

   constructor(props){
       super(props);
       this.state={
        zipcodes:[],
        lat_long:[],
        distances:[],
        closest_distance_not_friends:[],
        friends_types:[],
        friends_brandnames: [],
        friends_recommendation_table:[]
        
    }
       this.Friend_Recommender = this.Friend_Recommender.bind(this);
       this.add_zip_info = this.add_zip_info.bind(this);
       this.add_lat_long_info = this.add_lat_long_info.bind(this); 
       this.add_dist_info = this.add_dist_info.bind(this);
       this.calculate_distance=this.calculate_distance.bind(this);
       this.add_friends_types = this.add_friends_types.bind(this);
       this.add_friends_brandnames = this.add_friends_brandnames.bind(this);
       this.add_friends_recommendation_table = this.add_friends_recommendation_table.bind(this)
       this.addFriend = this.addFriend.bind(this)
       
   }
componentDidMount(){
  this.Friend_Recommender(); 
}

add_friends_recommendation_table(UserName, FirstName, LastName,userID){
  const rec_arr = {UserName,FirstName,LastName,userID}
  this.setState(prevState => ({
    friends_recommendation_table: [...prevState.friends_recommendation_table, rec_arr]
  }))
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

addFriend(userID){
  console.log(userID)
  Axios.post('http://localhost:3001/mongo/add_friend',
  {friend : userID, id: localStorage.getItem("user_id_global")}).then(
    (res) => {
      alert("User added as friend successfully. Please refresh page!");
      <Redirect to ="/"/>   
    }
  )
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
    if(localStorage.getItem("user_id_global") == 0 ){
      alert("Please Login for Friend Recommendations!")
    }
    //console.log("before first for loop")
    //first step is to find the 3 closest people that are not friends
    Axios.post('http://localhost:3001/mongo/find',
    {userID:localStorage.getItem("user_id_global")}).then((res)=>{
       // console.log(res.data[0].friend_list)
        //console.log(res.data)
        if(res.data[0].length > 0){
        for(var i = 0; i < res.data[0].friend_list.length; i++)
        { 
          var x = res.data[0].friend_list[i]
          f= f +" "
          f= f + JSON.stringify(x);
          //console.log(f)
        }
      }
    
      })
      //console.log(f)
      //console.log("before second for loop")
      Axios.post('http://localhost:3001/mongo/find_notfriends',
      {userID:localStorage.getItem("user_id_global")}).then((res)=>{
          
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
        console.log("FRIENDS1",friends1)

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
        console.log("NOT_FRIENDS",not_friends)
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
          
          not_friends.unshift(0)

        }
        console.log("ZIPCODES",this.state.zipcodes)
        console.log("NOTFRIENDS ZERO", not_friends)
        //var new_zipcodes = this.state.zipcodes
       
        //console.log(user_zip)
        
        //console.log(not_friends)
         
        //const {zipcode} = this.state.zipcodes[0]
        
        let promLatLongArr = []
        this.setState({lat_long: []})
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
          //console.log(this.state.lat_long[0].lat_long.lat)
        }
        console.log("LATLONG",this.state.lat_long)

  if(this.state.zipcodes.length === this.state.lat_long.length)
  {
    this.setState({friends_recommendation_table: []})
        let closest_distances = []
        var not_3_not_friends_array = [0,0,0]
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
         console.log("DISTANCES", this.state.distances)
          if(this.state.distances.length > 0){
            console.log(this.state.zipcodes)
            console.log(this.state.distances)
            console.log(not_friends)
            //console.log(this.state.distances[0])
          }
          //console.log(this.state.zipcodes) 
        if(this.state.distances.length > 0){
          var temp_min = this.state.distances[0].distance
          var temp_min_index1 = 0; 
          for(var i = 0; i < this.state.distances.length; i++){
            var temp = this.state.distances[i].distance
            if(temp <= temp_min){
              temp_min = temp;
              temp_min_index1 = i; 
            }
          }
  
          
          temp_min = this.state.distances[0].distance
          var temp_min_index2 = 0; 
          for(var i = 0; i < this.state.distances.length; i++){
            var dummy = this.state.distances[i].distance
            if((dummy <= temp_min) && (i!=temp_min_index1)){
              temp_min = dummy;
              temp_min_index2 = i; 
            }
          }
          
          temp_min = this.state.distances[0].distance
          var temp_min_index3 = 0; 
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
          
          console.log("NOT_FRIENDS",not_friends)

          this.setState({closest_distance_not_friends: []})
          this.add_not_friends(not_friends[temp_min_index1+1])
          this.add_not_friends(not_friends[temp_min_index2+1])
          this.add_not_friends(not_friends[temp_min_index3+1])
          console.log(this.state.closest_distance_not_friends)
          not_3_not_friends_array[0] = not_friends[temp_min_index1+1]
          not_3_not_friends_array[1] = not_friends[temp_min_index2+1]
          not_3_not_friends_array[2] = not_friends[temp_min_index3+1]

          closest_distances.push(this.state.distances[temp_min_index1].distance)
          closest_distances.push(this.state.distances[temp_min_index2].distance)
          closest_distances.push(this.state.distances[temp_min_index3].distance)
          console.log("CLOSEST_DISTANCES",closest_distances)
           
        }



        //api call /types
        //pass in userid and this.stat.closet_distance_friends
        //return array which store it 
        Axios.post('http://localhost:3001/types',
        {userID: localStorage.getItem("user_id_global"), not_friends: this.state.closest_distance_not_friends}).then(
          (res) => {
            this.add_friends_types(res.data)
            type_string = this.state.friends_types.type.split(',')
          }
        )

        console.log(this.state.friends_types.type)
        

        //api call /brandname
        //pass in userid and this.stat.closet_distance_friends
        //return array which store it 
        Axios.post('http://localhost:3001/brandname',
        {userID: localStorage.getItem("user_id_global"), not_friends: this.state.closest_distance_not_friends}).then(
          (res) => {
            this.add_friends_brandnames(res.data)
            console.log(res.data) 
            brandname_string = this.state.friends_brandnames.brandname.split(',')
            //console.log(brandname_string[0])
            
          }
        )
        
        console.log(brandname_string)
       
        //sum everything up
        //divide each # by sum 
        //multiply by -1

        // var min = 99999;
        // var max = 0;
        // if(this.state.distances.length > 7){
        //   for (var i = 0; i < this.state.distances.length; i++) {
        //     if (this.state.distances[i].distance < min) {
        //       min = this.state.distances[i].distance
        //     }
  
        //     if (this.state.distances[i].distance> max) {
        //       max = this.state.distances[i].distance
        //     }
        //   }
        // }
        var total = 0;
        for(var i = 0; i<closest_distances.length; i++){
          total += closest_distances[i]
        }
       
        var finalResults = []
        for(var i = 0; i<closest_distances.length; i++){
          finalResults.push((5000-closest_distances[i]) + (brandname_string[i]*100) + (type_string[i]*50) )
        }
        console.log(finalResults)

        var max_index = [0,0,0]


        for( var j = 0; j < 3; j++)
        {
          var temp_max = 0;
          var temp_index = "";
        for(var i = 0; i < finalResults.length; i++)
        {
            if(finalResults[i]> temp_max)
            {
              temp_max  = finalResults[i];
              temp_index = i;
            }
        }

        finalResults[temp_index] = -1;
        max_index[j] = temp_index
       }

       console.log(max_index)


       var a = not_3_not_friends_array[max_index[0]]
       var b = not_3_not_friends_array[max_index[1]]
       var c = not_3_not_friends_array[max_index[2]]
       var can = false

       console.log("a",a)
       console.log("b",b)
       console.log("c",c)
       Axios.post('http://localhost:3001/get_friend_recommendation',
        {friendID1: a, friendID2: b, friendID3: c }).then(
          (res) => {
            for(var i = 0; i < res.data.length; i++)
            { 
            var x = res.data[i]
            console.log(x)
            this.add_friends_recommendation_table(x.UserName,x.FirstName,x.LastName,x.userID)
            
            }
          }
        )
      console.log(this.state.friends_recommendation_table)
      head = []
      friends_table_data = []; 
      if(this.state.friends_recommendation_table.length > 0){
        head.push(<th key={'UserName'}>{'UserName'}</th>)
        head.push(<th key={'FirstName'}>{'FirstName'}</th>)
        head.push(<th key={'LastName'}>{'LastName'}</th>)
        head.push(<th key={'userID'}>{'userID'}</th>)

       if(this.state.zipcodes.length == (this.state.distances.length +1 )){
      for(var i =0; i < this.state.friends_recommendation_table.length; i++){
        const {UserName, FirstName, LastName, userID } = this.state.friends_recommendation_table[i]
        console.log("UserName",UserName)
        console.log("FirstName",FirstName)
        console.log("LastName",LastName)
        console.log("userID",userID)
        friends_table_data.push(
              <tr key ={UserName}>
                <td>{UserName}</td>
                <td>{FirstName}</td>
                <td>{LastName}</td>
                <td>{userID}</td>
                <td><Button onClick = {()=>this.addFriend(userID)}> Add Friend </Button></td>
              </tr>)
      }
    }
    }
  }//fat if
}


   render(){
        //this.Friend_Recommender()
        
       return(
           <div>
               <div><Button onClick={this.Friend_Recommender}>Recommend</Button> </div>
               <div>
              <table className="table  table-hover">
              <thead><tr>{head}</tr></thead>
              <tbody>
                {friends_table_data}
              </tbody>
            </table>
         </div>
               
           </div>
       )
   }
}
export default friends;