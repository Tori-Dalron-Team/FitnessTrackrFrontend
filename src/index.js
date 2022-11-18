import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client"
// Import Pages
import Activities from "./components/Activities";
import CreateActivities from "./components/CreateActivities";
import CreateRoutine from "./components/CreateRoutine";
import ErrorPage from "./components/Errorpage";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Routines from "./components/Routines";
import IndexForHomepage from "./components/IndexForHomepage";


// Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <IndexForHomepage />
            },
                // Check the above syntax for what we want to use
            {
                path: "/activities",
                element: <Activities />
            },
            {
            path: "/createactivities",
            element: <CreateActivities />
            },
            {
            path: "/createroutine",
            element: <CreateRoutine />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/routines",
                element: <Routines />
            },
        ]
    }
])


// Router Provider to pass
const app = document.getElementById("apps")
const root = createRoot(app)
root.render(<RouterProvider router={router} />)