import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import './index.css';
import Home from "./pages/Home/Home"
import AddListing from "./pages/AddListing/AddListing"
import RootLayout from './pages/Routes/RootLayout';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>} >
      <Route index element = {<Home/>}/>
      <Route path="/add-product"  element = {<AddListing/>}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));        
root.render( 
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
);
