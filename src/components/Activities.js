import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

const Activities = () => {
    const [activity, setActivity] = useState([]);
    useEffect(()=> {
        async function getAllActivities () {
            try {
                const data = await fetch(`${apiBaseURL}/activities`,
                {
                    headers : {
                        'Content-Type': 'application/json'
                    }
                })
                const results = await data.json()
                setActivity(results)
                console.log(results)
            } catch (error) {
                console.error(error.detail)
            }
        }
        getAllActivities()
        }
    
    ,[])

    // Render The State Data To See
    return (
        <div id="activities-container">
            <h1 id="activities-container">Activities</h1>
                <div id="activities-container">
            {activity && activity.length ? activity.map(e => {
                return <div key = {e.id} id="activities-container2"> 
                    <h3>{e.name}</h3>
                    <p>{e.description}</p>
            </div>}) : "No Activities Available To Display! "}
            </div>
                        
        </div>

    )
}

// Export
export default Activities;