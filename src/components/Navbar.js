import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav id="navbar">
            <Link to="/" id="navbar-text">Home</Link>
            <Link to="/login" id="navbar-text">Login</Link>
            <Link to="/profile" id="navbar-text">Profile</Link>
            <Link to="/routines" id="navbar-text">Routines</Link>

        </nav>
    )
};

// Export
export default Navbar;



// To Do
    // Whatever pages we will use for; copy and past format