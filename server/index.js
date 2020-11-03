const express = require('express')
const app = express()
const mysql = require('mysql')

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password"
});

con.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });
  
  app.get("/",(req,res) =>
  {
      
      res.send("shik you suck");
  })
app.listen(3001, ()=> {console.log("running on 3001");});