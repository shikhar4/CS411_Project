import React, { Component } from 'react';
import Axios from 'axios'
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { Link } from 'react-router-dom';
var head = [];
var table_data = [];


class Prod_Reccomender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productInfo: []
        }
        this.generateSearchBar = this.generateSearchBar.bind(this);
        this.searchProduct = this.searchProduct.bind(this);
        this.add_product_info = this.add_product_info.bind(this);
        this.borrowItem = this.borrowItem.bind(this);

    }

    generateSearchBar() {
        return (
            <>
                <h3>Reccomended Products</h3>
            </>)
    }

    add_product_info(Username, ProductName, type, brandName, productID, userID) {
        const product_arr = { Username, ProductName, type, brandName, productID, userID }
        this.setState(prevState => ({
            productInfo: [...prevState.productInfo, product_arr]
        }))

    }
    searchProduct() {
        head = []
        table_data = [];
        this.setState({ productInfo: [] })
        // console.log(this.state.productInfo)
        Axios.post('http://localhost:3001/api/get_product_reccomendation',
            { user_id: localStorage.getItem("user_id_global") }).then((res) => {
                // console.log(res.data)
                for (var i = 0; i < res.data[0].length; i++) {
                    var user = res.data[0];
                    // console.log(user[i]);
                    this.add_product_info(user[i].UserName, user[i].ProductName, user[i].type, user[i].brandName, user[i].productID, user[i].userID)
                }
            })
        console.log(this.state.productInfo)




        if (this.state.productInfo.length > 0) {

            head.push(<th key={'Username'}>{'Username'}</th>)
            head.push(<th key={'ProductName'}>{'ProductName'}</th>)
            head.push(<th key={'type'}>{'type'}</th>)
            head.push(<th key={'brandName'}>{'brandName'}</th>)

            for (var i = 0; i < this.state.productInfo.length; i++) {
                const { Username, ProductName, type, brandName, productID, userID } = this.state.productInfo[i]

                table_data.push(
                    <tr key={Username} id={productID}>
                        <td>{Username}</td>
                        <td>{ProductName}</td>
                        <td>{type}</td>
                        <td>{brandName}</td>
                        <td><Link to='/borrowed_items'><Button onClick={() => this.borrowItem(Username, ProductName, type, brandName, productID, userID)}> Borrow </Button></Link></td>
                    </tr>)
            }

        }

    }

    borrowItem(Username, ProductName, type, brandName, productID, userID) {
        var today = new Date();
        var BorrowDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        var DueDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 7)

        Axios.post('http://localhost:3001/api/borrow_product',
            { ProductID: productID, BorrowerID: localStorage.getItem('user_id_global'), OwnerID: userID, dueDate: DueDate, borrowDate: BorrowDate })

    }

    render() {


        return (
            <>
                <div>{this.generateSearchBar()}</div>
                <div><Button onClick={this.searchProduct}>Refresh</Button> </div>
                <div>
                    <table className="table  table-hover">
                        <thead><tr>{head}</tr></thead>
                        <tbody>
                            {table_data}
                        </tbody>
                    </table>
                </div>
            </>
        )

    }
}


export default Prod_Reccomender;