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
    console.log('here')
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

                res.send({ message: "Wrong UserName/Password" });
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
    

//try to find all users
    const sql = "Select * From user where userID <> ?"
    con.query(sql, u_id, (err, result) => {
        if (result.length > 0) {
            console.log(result)
        }
        var new_list = [];

        for (const res of result) {
            new_list.push(res.userID)
        }
        console.log("List of all users besides current: ", new_list);
        console.log("Friends List: ", friends_list);
        console.log("Differences in friends: ", diff_arr(new_list, friends_list));
    })
  });
  
app.post('/mongo/add',async function (req, res) {
    const question = new userModel(req.body);
    try {
        await question.save();
        res.status(201).send({message: "OK", data: question});
    } catch (err) {
        res.status(404).send({message: "Error", data: err})
    }
});

function diff_arr (arr1, arr2) {

    var temp = [], difference = [];

    for (var i = 0; i < arr1.length; i++) {
        temp[arr1[i]] = true;
    }

    for (var i = 0; i < arr2.length; i++) {
        if (temp[arr2[i]]) {
            delete temp[arr2[i]];
        } else {
            temp[arr2[i]] = true;
        }
    }

    for (var j in temp) {
        difference.push(j);
    }

    return difference;
}

app.listen(3001, () => { console.log("running on 3001"); });