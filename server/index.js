const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'localborrowme'
})
app.get("/",(req,res)=>{
    const sqlInsert = "INSESRT INTO user (user_id, password,phoneNumber,email,address,score,friendsList) VALUES ('2','5678','4087754635','shik4@illinois.edu','1234 Beast Ave.','999','anchit');"
    db.query(sqlInsert,(err,result)=>{
        res.send("hello test");
    });
    
})

app.listen(3001, ()=> {console.log("running on 3001");});