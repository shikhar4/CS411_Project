const express = require('express')
const app = express()
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
    const sqlSearchProduct = "SELECT DISTINCT user.UserName, product.ProductName, product.type, product.brandName, product.color, product.productID, user.userID FROM product JOIN user ON product.userID = user.userID WHERE ProductName LIKE ?"
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
            console.log(result)
        }
    })
})

//mogno db connection




const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://admin:admin@borrowme.q3qtp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('BorrowMe');
    const collection = database.collection('User');
    // Query for a movie that has the title 'Back to the Future'
    const movie = await collection.find().toArray(function(err, result) {
        if (err) throw err;
          //console.log(result);
    })
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.listen(3001, () => { console.log("running on 3001"); });