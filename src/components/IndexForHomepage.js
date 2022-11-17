import React, {useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from "./Navbar";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

const IndexForHomepage = () => {
    const [activities, setActivities] = useState([]);
    const [id, setId] = useState("");
    const [routines, setRoutines] = useState([]);
    const [username, setUsername] = useState("");


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
                console.error
            }
        }
        fetchRoutines();

    }, []);




    return (
        <div>
            <div id="nav-container">
                <h1>Workout Buddys</h1>
                <Navbar />
            </div>
            <Outlet context={[activities, routines, username, id]}/>
        </div>
    )
};

export default IndexForHomepage;
