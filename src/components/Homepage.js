import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <p>Bonjou!</p>
        </div>
    )
};

export default Homepage;