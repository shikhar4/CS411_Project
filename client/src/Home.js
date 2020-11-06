import React, { Component } from 'react';
import Login from './Login'





class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
        userId:'',
    };
    this.set_User_name = this.set_User_name.bind(this); }
    set_User_name()
    {
      console.log(Login.user_name_golbal);
      this.setState({ userId: Login.user_name_golbal}); 
    }
  render() {
    const user_name = this.state.userId
    return (
        <div>
          <h2>{user_name}</h2>
        </div>
    );
  }
}

export default Home;