const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
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

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "sys"
})
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res) =>
  {
      
      res.send("hello you suck");
 })
 app.post("/api/insert",(req,res)=>{

    const email = req.body.email
    const password = req.body.password
    const sqlInsert = "INSERT INTO user (UserName,Password,FirstName,LastName,Email,PhoneNumber,zipCode,Score) VALUES ('dyshant',?,'anchit','rao',?,'4086666666','61820','0');"
    db.query(sqlInsert, [password,email], (err,result)=>{
        if (err) {
            console.error('Database insert failed: ' + err.stack);
            return;
        }
        else{
            console.log(result)
        }
    })
})


app.post("/api/login",(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    const sql = "Select * From user Where UserName = ? AND Password = ?;"
    console.log('here')
    db.query(sql, [username,password], (err,result)=>{
        if (err) {
            console.error('Database search failed: ' + err.stack);
            return;
        } 
        else {
            if (result.length > 0) {
                console.log(result)
                console.log(result.FirstName)
                res.send(result);
            }
            else {
                
                res.send({message:"wrong shit try again pussy"});
            }
           
        }
    })
})


app.listen(3001, ()=> {console.log("running on 3001");});