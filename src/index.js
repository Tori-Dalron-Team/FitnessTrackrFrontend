import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Pages
import ErrorPage from "./components/Errorpage";
import Homepage from "./components/Homepage";


// Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        children: [
            {
                // index: 
                // element: 
            }
        ]
    }
])


// Router Provider to pass
ReactDOM.render(<RouterProvider router={router} />, document.getElementById("apps"))