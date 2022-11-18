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
        <div>
            <h1>Activities</h1>
          
            {activity && activity.length ? activity.map(e => {
                return <div key = {e.id}> 
                    <h3>{e.name}</h3>
                    <p>{e.description}</p>
            </div>}) : "No Activities Available To Display! "}
                        
        </div>

    )
}

// Export
export default Activities;