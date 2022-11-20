import React, {useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from "./Navbar";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

// Step 1
const IndexForHomepage = () => {
    const [activities, setActivities] = useState([]);
    const [id, setId] = useState("");
    const [routines, setRoutines] = useState([]);
    const [username, setUsername] = useState("");
    const currentToken = localStorage.getItem("token");


    // Fetching Post
    // Fetch Activities
    useEffect(() => {
        async function fetchActivities() {
            try {
                const response = await fetch (`${apiBaseURL}/activities`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();

                setActivities(data)
            } catch (error) {
                console.error(error.detail)
            }
        }
        fetchActivities();
    }, []);

    // Fetch Routines
    useEffect(() => {
        async function fetchRoutines() {
            try {
                const response = await fetch (`${apiBaseURL}/routines`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await response.json();

                setRoutines(data)
            } catch (error) {
                console.error(error.detail)
            }
        }
        fetchRoutines();

    }, []);

    // Fetch Login Status
    // useEffect(() => {
    //     async function setProfile() {
    //         try {
    //             const response = await fetch(`${apiBaseURL}/users/me`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${localStorage.getItem("token")}`
    //                 }
    //             })

    //             const data = await response.json();
    //             setUsername(data.username);
    //             setId(data.Id);
    //         } catch (error) {
    //             console.error
    //         }
    //     }
    //     setProfile();
    // }, []);

        // Render the State Data
    return (
        <div>
            <div class="indexforhomepage-container">
                <h1 class="indexforhomepage-header">Welcome to Fitness Trackr</h1>
                <br></br>
                <br></br>
                <br></br>
                <div class="indexforhomepage-main">Login or Register</div>
                <div class="indexforhomepage-main">to get Started!</div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div>
                    <div class="indexforhomepage-logo">
                        Fitness Trackr
                    </div>
                </div>

                <div>
                    <div class="indexforhomepage-one">
                        Fitness training is our</div>
                        <div class="indexforhomepage-one">
                        foundation, always.</div>


                        <div class="indexforhomepage-two">
                        But with friends it's</div>
                        <div class="indexforhomepage-two">
                        now easier than ever.</div>


                </div>

            </div>
            <Outlet context={[activities, routines, username, id]}/>
        </div>
    )
};

export default IndexForHomepage;
