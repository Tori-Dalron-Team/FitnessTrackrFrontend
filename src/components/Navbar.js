import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav id="navbar">
            <Link to="/">Home </Link>
            <Link to="/login">Login </Link>
            {/* <Link to="/register">Register </Link> */}
            <Link to="/profile">Profile</Link>

        </nav>
    )
};

// Export
export default Navbar;



// To Do
    // Whatever pages we will use for; copy and past format