import Footer from "../../Components/Footer/Footer";
import React from 'react';
import {Outlet} from "react-router-dom";

export default function RootLayout(){
    return(
        <main>
        <Outlet/>
        <Footer/>
        </main>
    )
}