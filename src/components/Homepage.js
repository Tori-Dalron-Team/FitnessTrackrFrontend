import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

 const Homepage = () => {


     return (
         <div>
            <Navbar />

            <Outlet />
         </div>
     )
 };

 export default Homepage;

 // Wants
    // Quick Description
    // Login/Register 
    // Find Better Name