import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Button, Form, Container,NavDropdown} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Header.css';
import { useHistory } from 'react-router-dom';



export default function Header(props){

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();


    const HandleClickAdd = () => {
        navigate("/add-product");
    }
    const HandleClickDelete = () => {
        axios.post("http://localhost:80/Delete",props.checkedItemstoDelete,{
            withCredentials : false,
        })
    }



    return(
        <div className="Header ">
            <Navbar className = "Header-Navbar " variant="dark" fixed="top" expand="lg">
                <Container fluid className="">
                    <Navbar.Brand href="/">
                        <h2>
                            Product List
                        </h2>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />

                    <Navbar.Collapse id="navbarScroll" className=" " >
                        
                        <Nav
                            className="m-auto my-2 my-lg-0 d-flex justify-content-end"
                            style={{ maxHeight: '100px' ,width:'100%'}}
                            navbarScroll>
                            <Form  className=" d-flex justify-content-center">
                    
                            <button type="" className="Header-Button btn mr-auto text fs-2" onClick={HandleClickAdd}>ADD</button>
                            <button type="button" className="Header-Button btn mr-auto fs-2 " onClick={props.handleDeleteFunc}>MASS DELETE</button>    
                            {/* <button type="submit" className="Header-Button btn">Search</button>   */}
                            </Form>
                        </Nav>

                        <Nav
                        className="m-auto my-2 my-lg-0"
                        navbarScroll>
                        </Nav> 
                        
                        </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}