import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <form onSubmit={loginRequest}>
                <label>Enter Username</label>
                <input type="text" value={username} onChange={enterUsername}></input>
                <br />
                <label>Enter Password</label>
                <input type="text" value={password} onChange={enterPassword}></input>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
};

// Export
export default Login;

