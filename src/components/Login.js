import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
async function loginRequest(event) {
    event.preventDefault()
    try {
        const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                
                    username: username,
                    password: password
                
            })
        })
        const data = await response.json()
        console.log("translated data:", data.token)
            navigate("/profile")
        localStorage.setItem("token", data.token)
    } catch (error) {
        console.log(error)
    }
}

function enterUsername(event) {
    setUsername(event.target.value)
}
function enterPassword(event) {
    setPassword(event.target.value)
}
    return (
        
        <div>
            <br></br>
            <div class="login">Sign in to Fitness Trackr</div>
            <br></br>

                <div id="login-form">
                    <form onSubmit={loginRequest}>
                        <label>Enter Username: </label>
                        <input type="text" value={username} onChange={enterUsername}></input>
                        <br></br>
                        <label>Enter Password: </label>
                        <input type="text" value={password} onChange={enterPassword}></input>
                        <br />
                        <button type="submit">Login</button>
                    </form>
                </div>
            <h5 id="login-disclaimer">If New User Please <Link to="/register">Register </Link> Here</h5>
            
        </div>
    )
};

// Export
export default Login;

