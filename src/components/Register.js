import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    async function newRegisterForm(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    
                        username: username,
                        password: password
                    
                })
            })
            const data = await response.json()
            console.log("translated data:", data)
            localStorage.setItem("token", data)
        } catch (error) {
            console.log(error)
        }
    }

    function newUsername(event) {
        setUsername(event.target.value)
    }
    function newPassword(event) {
        setPassword(event.target.value)
    }
    return (
        <div>
            <form onSubmit={newRegisterForm}>
                <label>Enter New Username</label>
                <input type="text" value={username} onChange={newUsername}></input>
                <br />
                <label>Enter New Password</label>
                <input type="text" value={password} onChange={newPassword}></input>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
};

// Export
export default Register;

