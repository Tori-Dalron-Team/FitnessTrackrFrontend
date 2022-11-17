import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Pages
import Activities from "./components/Activities";
import ErrorPage from "./components/Errorpage";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Routines from "./components/Routines";


// Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: < />
            },
                // Check the above syntax for what we want to use
            {
                index: "/activities",
                element: <Activities />
            },
            {
                index: "/login",
                element: <Login />
            },
            {
                index: "/profile",
                element: <Profile />
            },
            {
                index: "/register",
                element: <Register />
            },
            {
                index: "/routines",
                element: <Routines />
            },
        ]
    }
])


// Router Provider to pass
ReactDOM.render(<RouterProvider router={router} />, document.getElementById("apps"))