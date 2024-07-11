import React, { useEffect, useState,useRef } from "react";
import "./Home.css"
import axios from 'axios';
import HomeCard from "./Components/HomeCard";
import Header from "./Components/Header/Header"

export default function Home(){




    const [data, setData] = useState([]);
    const [checkedItems, setChecked] = useState([])
    

    useEffect(() => {
        fetchData();
    }, []);

  const fetchData = () =>{
    axios.get('https://abdelrhmanscandiweb.000webhostapp.com/getproducts', {
        withCredentials: false,  // Disable sending credentials
    })
      .then(
        (response) => { 
            console.log(response.data)
            const withCheckedData = response.data.map
            (product => ({
                ...product,isChecked:false
            }));
            const sortedProducts = [...withCheckedData].sort((a, b) => {
                if (a.SKU < b.SKU) return -1;
                if (a.SKU > b.SKU) return 1;
                return 0;
              });
            setData(sortedProducts);
            
        });
  }



const page_style = {
    flex: '1'
};

const handleCheckbox = (id) =>{ 
    setData(data.map(product => 
        product.SKU == id ? {...product,isChecked:!product.isChecked} : product
    ))
    setChecked( (items) =>{
        if(!items.includes(id)){
            return [...items,id];
        }
        else{
            return items.filter((item) => item != id);
        }
    } )
}

const handleDelete = () =>{
    axios.post("https://abdelrhmanscandiweb.000webhostapp.com/Delete",checkedItems,{
        withCredentials : false,
    }).then( ()=>{
        fetchData()
    } )
}



    
    return(
        <div className="HomeContainer" style={page_style}>
            <Header 
            handleDeleteFunc = {handleDelete}
            />
            {data.length === 0 && 
                <div className="center-text" style={{ height: '60vh' }}>
                    <h1>No Products Available</h1>
                </div>
            }
            <div className="home-products py-5" style={page_style} >
                
                <div className="container px-4 px-lg-5 mt-5"  style={page_style}>
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-2 row-cols-xl-3 justify-content-start " style={page_style} >
                    
                    {
                        
                                  data.map((dataItem,index)=>{
                                    return(
                                        <HomeCard
                                        key={dataItem.SKU} 
                                        SKU = {dataItem.SKU}
                                        Name = {dataItem.Name}
                                        Price = {dataItem.Price}
                                        Type = {dataItem.Type}
                                        Weight = {dataItem.Weight}
                                        Size = {dataItem.Size}
                                        Dimensions = {dataItem.Dimensions}
                                        handleChange = {handleCheckbox}
                                        isChecked = {dataItem.isChecked}
                                        />
                                    );
            
                                })}

                    </div>
                </div>
            </div>
        </div>


    );
}

