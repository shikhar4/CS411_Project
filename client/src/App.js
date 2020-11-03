import './App.css';
import React, {Component} from 'react'; 
import { useEffect,useState } from "react";
//import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import { Navbar,Nav,NavDropdown } from "react-bootstrap";
import Axios from 'axios'
//import {Home} from './Home';
//import {Login} from './Login';



function App() {

  const [userId, setUserId] = useState('')
  const submitUserId = () =>{
    Axios.post('http://localhost:3001/api/insert',
    {userId:userId}).then(()=>{
      alert('successful insert')
    })
  };
  return (
    // <React.Fragment>
    // <Router>
    //   <Switch>
    //     <Route exact path = "/home" component = {Home}/>
    //     <Route path = "/" component = {Login}/>
    //   </Switch>
    // </Router>

    // </React.Fragment>
  <>
  <Navbar expand="lg" bg="light" variant="light">
  <Navbar.Brand>Anchit Rao sucks major ding dongs</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

<div>
  <input type="text" class = "Input" name="User's Item" placeholder="Item" aria-label="Recipient's username" 
    onChange={(e)=>{
    setUserId(e.target.value);
  }}/>
  <button onClick={submitUserId}>Insert</button>
</div>
</>
    

);
}

export default App;
