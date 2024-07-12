import React, { useEffect, useState } from "react";
import "./AddListing.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header  from "./Header/Header";

var length = 0
var height = 0
var width = 0

export default function AddListing(){
    const [selected,setSelected] = useState("");
    const [inputs,setInputs] = useState({});
    const [notification,setNotification] = useState('');
    const [visibleInputs,setVisibleInputs] = useState({});

    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    useEffect(()=>{
        setInputs(values => ({...values}));

    },[]);


    const handleSelect = (event) => {
        var numOfElements = Object.keys(inputs).length
        if(inputs["Type"]!=null && numOfElements>4){
            let variableKey = Object.keys(inputs).find(key => !['SKU', 'Product_Name', 'Product_Price','Type'].includes(key));
            const { [variableKey]: _, ...newState } = inputs;
            setInputs(newState);
            setVisibleInputs(newState)
        }
        const name = event.target.name;
        const id = event.target.id;

        var value = document.getElementById(id).value;

        setInputs(values => ({...values,[name]: value}));
        setSelected(value)
        
    }
    const handleChange = (event) => {
        const name = event.target.name;
        var value = event.target.value;
        if (!['SKU', 'Product_Name', 'Type'].includes(name)) {
            var pattern = /[^0-9]/g
            if(pattern.test(value)){
                return
            }

            setVisibleInputs(values => ({...values,[name]: value}));
            if(name === "length" || name === "width" || name === "height"){
                
                if(name === "length"){length = parseFloat(value);}
                if(name === "width"){width = parseFloat(value);}
                if(name === "height"){height = parseFloat(value);}
                
                setInputs(values => ({...values,"Dimensions": height+"x"+width+"x"+length}));
            }
            else{
                setInputs(values => ({ ...values, [name]: parseFloat(value) }));
            }
        }
        else{
            setInputs(values => ({ ...values, [name]: value}));
            setVisibleInputs(values => ({...values,[name]: value}));
        } 
        
        
        
    }

    const handleSubmit = async () =>{
        var form = document.getElementById('product_form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return 
        }

        let variableKey = Object.keys(inputs).find(key => !['SKU', 'Product_Name', 'Product_Price','Type'].includes(key));
        
        // Create a new object with keys in the desired order
        let orderedObject = {
            SKU: inputs.SKU,
            Product_Name: inputs.Product_Name,
            Product_Price: inputs.Product_Price,
            Type:inputs.Type,
            [variableKey]: inputs[variableKey]
        };





        axios.post('https://abdelrhmanscandiweb.000webhostapp.com/wubba',orderedObject, {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
        .then(function(response) {
            if(response.data.includes("Duplicate entry")){
                setNotification('Duplicate SKU entry found. Please try again.');
            }
            else{
                    navigate("/");
            }
        }).catch(function(error) {
            console.error("AxiosError: Network Error", error);
            // Handle the error, show a message, retry, etc.
        });

    }
    const notificationStyle = {
        fontWeight: 'bold',
        color : 'red',
        marginBottom :'20px'
    }
    return(
        <div className="AddListing">
            
            
            <Header handleSubmit = {handleSubmit}/>

            <form className="AddListing-form" id="product_form">
                <h1>Add Product</h1>
                
                <fieldset>
                
                <legend>Product info</legend>
                {notification && <div className="notification" style={notificationStyle}>{notification}</div>}
                <label htmlFor="SKU">SKU:</label>
                <input onChange={handleChange} value={visibleInputs.SKU || ""} type="text" id="sku" name="SKU" required/>
                
                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={visibleInputs.Product_Name || ""} type="text" id="name" name="Product_Name" required/>
                
                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={visibleInputs.Product_Price || ""} type="text" min="1" max="15000" id="price" name="Product_Price" required/>
                
                


                <label htmlFor="Type">Type Switcher:</label>
                <select value={selected} onChange={handleSelect} id="productType" name="Type" required>
                    <option disabled hidden value="">Select Option</option>
                    <option value="Book">Book</option>
                    <option value="DVD_disc">DVD</option>
                    <option value="Furniture">Furniture</option>
                </select>
                {selected === "Book" && (
                    <div>
                    <label htmlFor="weight">Weight (KG):</label>
                    <input onChange={handleChange} value={visibleInputs.weight || ""} type="text" min="1" max="15000" id="weight" name="weight" required/>
                    </div>
                )}
                {selected === "DVD_disc" && (
                    <div>
                    <label htmlFor="size">Size (MB):</label>
                    <input onChange={handleChange} value={visibleInputs.size || ""} type="text" min="1" max="15000" id="size" name="size" required/>
                    </div>
                )}
                {selected === "Furniture" && (
                    <div>
                    <label htmlFor="height">Height (CM):</label>
                    <input onChange={handleChange} value={visibleInputs.height || ""} type="text" min="1" max="15000" id="height" name="height" required/>
                    <label htmlFor="width">Width (CM):</label>
                    <input onChange={handleChange} value={visibleInputs.width || ""} type="text" min="1" max="15000" id="width" name="width" required/>
                    <label htmlFor="length">Length (CM):</label>
                    <input onChange={handleChange} value={visibleInputs.length || ""} type="text" min="1" max="15000" id="length" name="length" required/>
                    </div>
                )}
                
                </fieldset>
                

                                
            </form>
        </div>
    );
}
