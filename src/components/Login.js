import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
async function loginRequest(event) {
    event.preventDefault()
    try {
        const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
        const data = await response.json()
        console.log("translated data:", data)
            navigate("/profile")
        localStorage.setItem("token", )

    } catch (error) {
        console.log(error)
    }
}

    return (
        <div>
            {/* <form onSubmit={}>
                <label></label>
                <input type="text" value={username} onChange={}></input>
                <br />
                <label></label>
                <input type="text" value={password} onChange={}></input>
                <br />
                <button type="submit">Login</button>
            </form> */}
        </div>
    )
};

// Export
export default Login;

