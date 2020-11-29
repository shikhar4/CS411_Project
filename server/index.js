const express = require('express')
const app = express()
const app2 = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')


const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "sys"
});
con.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get("/", (req, res) => {

    res.send("hello you suck");
})
app.post("/api/insert", (req, res) => {

    const user_name = req.body.UserName
    const password = req.body.password
    const first_name = req.body.FirstName
    const last_name = req.body.LastName
    const email = req.body.Email
    const phone = req.body.Phone
    const zip = req.body.Zip
    const sqlInsert = "INSERT INTO user (UserName,Password,FirstName,LastName,Email,PhoneNumber,zipCode,Score) VALUES (?,?,?,?,?,?,?,'0');"
    con.query(sqlInsert, [user_name, password, first_name, last_name, email, phone, zip], (err, result) => {
        if (err) {
            console.error('Database insert failed: ' + err.stack);
            return;
        }
        else {
            console.log(result)
        }
    })
})

app.post("/api/delete", (req, res) => {
    const user_name = req.body.user
    const product_name = req.body.product

    const sqlDelete = "DELETE FROM product WHERE userID = ? AND ProductName = ?"
    con.query(sqlDelete, [user_name, product_name], (err, result) => {
        if (err) {
            console.error('Database insert failed: ' + err.stack);
            return;
        }
        else {
            console.log(result)
        }
    })
})


app.post("/api/login", (req, res) => {

    const username = req.body.username
    const password = req.body.password
    const sql = "Select * From user Where UserName = ? AND Password = ?;"
    con.query(sql, [username, password], (err, result) => {
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

                res.send({ message: "Wrong Username/Password" });
            }

        }
    })
})

app.post("/api/search", (req, res) => {
    const user_ID = req.body.userID

    const sqlSearch = "SELECT * FROM Product WHERE userID = ?"
    con.query(sqlSearch, [user_ID], (err, result) => {
        if (err) {
            console.error('Database search for myProducts failed: ' + err.stack);
            return;
        } else {
            if (result.length > 0) {
                console.log(result)
                res.send(result)
            }
            else { res.send({ message: "empty products" }) }
        }
    })
})

app.post("/api/search_borrowed_items", (req, res) => {
    const user_ID = req.body.userID

    const sqlSearch = "SELECT DISTINCT * FROM borrowinfo WHERE borrowerID = ?"
    con.query(sqlSearch, [user_ID], (err, result) => {
        if (err) {
            console.error('Database search for borrowinfo failed: ' + err.stack);
            return;
        } else {
            if (result.length > 0) {
                console.log(result)
                res.send(result)
            }
            else { res.send({ message: "empty borrow" }) }
        }
    })
})

app.post("/api/search_product", (req,res) =>{
    const product = '%' + req.body.ProductName + '%'
    console.log(product) 
    const sqlSearchProduct = "SELECT DISTINCT user.UserName, product.ProductName, product.type, product.brandName, product.color, product.productID, user.userID FROM product JOIN user ON product.userID = user.userID WHERE ProductName LIKE ? AND product.isBorrowed = 0"
    con.query(sqlSearchProduct, [product], (err,result) => {
        if(err){
            console.error("Database search for product failed: " + err.stack)
            return; 
        }
        else{
            if(result.length > 0){
                console.log(result)
                //alert("Product Found")
                res.send(result)
            }
        }
    })
})

app.post("/api/update", (req, res) => {
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phone = req.body.phone
    const zip_code = req.body.Zip
    const user_ID = req.body.userID

    const sqlUpdate = "UPDATE USER SET Password = ?, FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, zipCode = ? WHERE userID = ?"
    con.query(sqlUpdate, [password, firstName, lastName, email, phone, zip_code, user_ID], (err, result) => {
        if (err) {
            console.error('Database update for User failed: ' + err.stack);
            return;
        } else {
            if (result.length > 0) {
                console.log(result)
                res.send(result)
            }
            else { res.send({ message: "you messed up" }) }
        }
    })
})

app.post("/api/insert_product", (req, res) => {

    const userID = req.body.userID
    const name = req.body.name
    const type = req.body.type
    const b = req.body.brandName
    const m = req.body.modelNumber
    const r = req.body.releaseYear
    const c = req.body.color
    const sqlInsert = "INSERT INTO Product (`ProductName`, `type`, `brandName`, `modelNumber`, `releaseYear`, `color`, `userID`) VALUES ( ?,?,?,?,?,?,?);"
    con.query(sqlInsert, [name, type, b,m,r,c,userID], (err, result) => {
        if (err) {
            console.error('Database insert failed: ' + err.stack);
            return;
        }
        else {
            console.log(result)
        }
    })
})


// mongodb connection

var mongoose = require('mongoose');
const userModel = require('./user');
const user = require('./user')
const json = require('body-parser/lib/types/json')

var uri = "mongodb+srv://admin:admin@borrowme.q3qtp.mongodb.net/BorrowMe?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

var apple;

app.post('/mongo/find', async (req, res) => {
    var friends_list;
    let u_id = req.body.userID
    console.log(u_id)
    let query = {user_id: u_id}
    let foods = await userModel.find(query);
    try { 
      console.log(foods)
      res.send(foods);
      friends_list = foods[0].friend_list
    } catch (err) {
      res.status(500).send(err);
    }
    
// var not_friends = [];
// var new_list = [];
// var zip = [];
// //try to find all users
//     const sql = "Select userID, zipCode From user where userID <> ?"
//      con.query(sql, u_id, (err, result) => {
//         if (result.length > 0) {
//             for (const res of result) {
//                 new_list.push(res.userID)
//                 zip.push(res.zipCode)
//             }
//             res.send(result)
//         }
       
//     })
//     console.log(zip)
 
  });
  
  app.post("/mongo/find_notfriends", (req, res) => {
    const user_ID = req.body.userID
   
    const sqlSearch = "SELECT userID FROM user WHERE userID <> ?"
    con.query(sqlSearch, [user_ID], (err, result) => {
        if (err) {
            console.error('Database search for myProducts failed: ' + err.stack);
            return;
        } else {
            if (result.length > 0) {
                //console.log(result)
                res.send(result)
            }
            else { res.send({ message: "empty products" }) }
        }
    })
})

var s = "";
app.post("/find_zipcodes", (req, res) => {
    
    const user_ID = req.body.userID
   let not = req.body.not_friends
   //console.log(not)


    const sqlSearch = "SELECT zipCode FROM user WHERE userID = ? "
    con.query(sqlSearch, not, (err, result) => {
        if (err) {
            return;
        } 
        else {
            if (result.length > 0) {
              //  console.log(result)
                res.send(result)
            }
        }
    })
   
})

app.post("/api/borrow_product",(req,res) => {
    const productID = req.body.ProductID
    const borrowerID = req.body.BorrowerID
    const ownerID = req.body.OwnerID
    const DueDate = req.body.dueDate 
    const BorrowDate = req.body.borrowDate

    const sqlInsert = "INSERT INTO borrowinfo (productID, borrowerID, ownerID, DueDate, BorrowDate) VALUES (?,?,?,?,?);"
    con.query(sqlInsert, [productID, borrowerID, ownerID, DueDate, BorrowDate], (err, result) => {
        if (err) {
            console.error('Database insert into borrowinfo failed: ' + err.stack);
            return;
        }
        else {
            //console.log(result)
        }
    })

    const sqlUpdate = "UPDATE product SET isBorrowed = 1 WHERE product "
})

//mogno db connection



app.post("/find_coordinates", (req, res) => {
    
    let zipcode = req.body.zipcodes
    //console.log(not)
 
 
     const sqlSearch = "SELECT lat,lng FROM zipcodes WHERE zip = ? "
     con.query(sqlSearch, zipcode, (err, result) => {
         if (err) {
             return;
         } 
         else {
             if (result.length > 0) {
                 //console.log(result)
                 res.send(result)
             }
         }
     })
    
 })





app.post('/mongo/add',async function (req, res) {
    const question = new userModel(req.body);
    try {
        await question.save();
        res.status(201).send({message: "OK", data: question});
    } catch (err) {
        res.status(404).send({message: "Error", data: err})
    }
});





app.post("/types", (req, res) => {
    
    let user_id = req.body.userID
    let notfriends = req.body.not_friends

    let person1 = notfriends[0];
    let person2 = notfriends[1];
    let person3 = notfriends[2];
    //console.log(notfriends)
    
    let user_list = [];
    let person1_list = [];
    let person2_list = [];
    let person3_list = [];

    let count_user =0;
    let c1 = 0;
    let c2 =0;
    let c3 = 0;
 
     const sqlSearch = "SELECT userID,type, Count(type) as num FROM sys.Product where userID = ? or userID = ? or userID = ? or userID = ? group by type, userID"

     con.query(sqlSearch, [user_id,person1,person2,person3], (err, result) => {
         if (err) {
             return;
         } 
         else {
             if (result.length > 0) {
                 //console.log(result)
              
                 for (var i = 0; i <result.length; i++)
                 {
                     if(result[i].userID == user_id)
                     {
                        user_list.push({type:result[i].type,num:result[i].num})
                        count_user = count_user +1
                     }
                     if(result[i].userID == person1)
                     {
                        // console.log(result[i].userID)
                        person1_list.push({type:result[i].type,num:result[i].num})
                        c1 = c1+ 1;
                     }
                     else if(result[i].userID == person2)
                     {
                        person2_list.push({type:result[i].type,num:result[i].num})
                        c2 = c2+ 1;
                     }
                     else if(result[i].userID == person3)
                     {
                        person3_list.push({type:result[i].type,num:result[i].num})
                        c3 = c3+ 1;
                     }
                 }
              
                 JSON.stringify(user_list);
                 JSON.stringify(person1_list);
                 JSON.stringify(person2_list);
                 JSON.stringify(person3_list);
                 //console.log(person1_list)
                 let total = [];
                 let t1 = 0; 
                 let t2 = 0;
                 let t3 = 0; 
                for( var i = 0; i < count_user; i++)
                 {
                    
                        for(var  j= 0;  j < c1; j++)
                        {
                            if(user_list[i].type == person1_list[j].type )
                            {
                                t1 = t1+ person1_list[j].num;
                            }
                        }
                 }
                 total.push(t1)
                
                 for( var i = 0; i < count_user; i++)
                 {
                    
                        for(var  j= 0;  j < c2; j++)
                        {
                            if(user_list[i].type == person2_list[j].type )
                            {
                                t2 = t2+ person2_list[j].num;
                            }
                        }
                 }
                 total.push(t2)

                 for( var i = 0; i < count_user; i++)
                 {
                    
                        for(var  j= 0;  j < c3; j++)
                        {
                            if(user_list[i].type == person3_list[j].type )
                            {
                                t3 = t3+ person3_list[j].num;
                            }
                        }
                 }
                 total.push(t3)




                 res.send(total.toString())
             
                }

         }
     })
    
 })




 app.post("/brandname", (req, res) => {
    
    let user_id = 15 //req.body.userID
    let notfriends = [20,16,17]//req.body.not_friends

    let person1 = notfriends[0];
    let person2 = notfriends[1];
    let person3 = notfriends[2];
    //console.log(not)
    
    let user_list = [];
    let person1_list = [];
    let person2_list = [];
    let person3_list = [];

    let count_user =0;
    let c1 = 0;
    let c2 =0;
    let c3 = 0;
 
     const sqlSearch = "SELECT userID, brandName as type, Count(brandName) as num FROM sys.Product where userID = ? or userID = ? or userID = ? or userID = ? group by brandName, userID"

     con.query(sqlSearch, [user_id,person1,person2,person3], (err, result) => {
         if (err) {
             return;
         } 
         else {
             if (result.length > 0) {
                 //console.log(result)
              
                 for (var i = 0; i <result.length; i++)
                 {
                     if(result[i].userID == user_id)
                     {
                        user_list.push({type:result[i].type,num:result[i].num})
                        count_user = count_user +1
                     }
                     if(result[i].userID == person1)
                     {
                        // console.log(result[i].userID)
                        person1_list.push({type:result[i].type,num:result[i].num})
                        c1 = c1+ 1;
                     }
                     else if(result[i].userID == person2)
                     {
                        person2_list.push({type:result[i].type,num:result[i].num})
                        c2 = c2+ 1;
                     }
                     else if(result[i].userID == person3)
                     {
                        person3_list.push({type:result[i].type,num:result[i].num})
                        c3 = c3+ 1;
                     }
                 }
              
                 JSON.stringify(user_list);
                 JSON.stringify(person1_list);
                 JSON.stringify(person2_list);
                 JSON.stringify(person3_list);
                 //console.log(person1_list)
                 let total = [];
                 let t1 = 0; 
                 let t2 = 0;
                 let t3 = 0; 
                for( var i = 0; i < count_user; i++)
                 {
                    
                        for(var  j= 0;  j < c1; j++)
                        {
                            if(user_list[i].type == person1_list[j].type )
                            {
                                t1 = t1+ person1_list[j].num;
                            }
                        }
                 }
                 total.push(t1)
                
                 for( var i = 0; i < count_user; i++)
                 {
                    
                        for(var  j= 0;  j < c2; j++)
                        {
                            if(user_list[i].type == person2_list[j].type )
                            {
                                t2 = t2+ person2_list[j].num;
                            }
                        }
                 }
                 total.push(t2)

                 for( var i = 0; i < count_user; i++)
                 {
                    
                        for(var  j= 0;  j < c3; j++)
                        {
                            if(user_list[i].type == person3_list[j].type )
                            {
                                t3 = t3+ person3_list[j].num;
                            }
                        }
                 }
                 total.push(t3)




                 res.send(total.toString())
             
                }

         }
     })
    
 })

 app.post("/get_friend_recommendation",(req,res) => {
   const person1 = req.body.friendID1;
   const person2 = req.body.friendID2;
   const person3 = req.body.friendID3;
    console.log(person1)
    console.log(person2)
    console.log(person3)


   
    
    const sqlInsert = "Select UserName, FirstName, LastName From User where userID = ?  UNION Select UserName, FirstName, LastName From User where userID = ?  UNION  Select UserName, FirstName, LastName From User where userID = ? ;"
    con.query(sqlInsert, [person1,person2,person3], (err, result) => {
        console.log(result)
        if (err) {
            console.error('Database insert into borrowinfo failed: ' + err.stack);
            return;
        }
        else {
            
            res.send(result)
        }
    })
})

app.listen(3001, () => { console.log("running on 3001"); });