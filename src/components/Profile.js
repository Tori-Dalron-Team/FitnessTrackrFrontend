import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
    const [personalRoutines, setPersonalRoutines] = useOutletContext()
    const [allRoutines, setAllRoutines] = useOutletContext()
    const [allActivities, setAllActivities] = useOutletContext()
    const [personalActivities, setPersonalActivities] = useState([]);
    const [routineArray, setRoutineArray] = useState([]);
    const [activitiesArray, setActivitiesArray] = useState([])
    const [activity, setActivity] = useState([]);

    // useEffect(() => {
    //     if (personalRoutines) {
    //         const routArray = personalRoutines.filter((name) => {
    //             console.log("this is name", personalRoutines)
    //             return name.goal
    //         })
    //         setRoutineArray(routArray)
    //     }
    // }, [personalRoutines])
    // useEffect(() => {
    //     if (personalActivities) {
    //         const actArray = personalActivities.filter((name) => {
    //             return name.description 
    //         })
    //         setActivitiesArray(actArray)
    //     }
    // }, [personalActivities])

    useEffect(() => {
        async function profileInfo() {
            
            try {
                const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json()
                setPersonalRoutines(data.name)
                setPersonalActivities(data.name)
            } catch (error) {
                console.log(error)
            }
        }
        profileInfo()
    }, [])
    return (
        <div>
            <h3>Profile page</h3>
            <div>
                {
                    routineArray.length ? routineArray.map((routine, idx) =>{
                        return <div key={idx}>
                            <p>Your Routines: {goal}</p>
                        </div>
                    }) : <p>There are no Routines to view</p>
                }
                </div>
                <div>
                {
                    activitiesArray.length ? activitiesArray.map((activity, idx) => {
                        return <div key={idx}>
                            <p>Your Activities: {duration}</p>
                        </div>
                    }) : <p>There are no Activities to view</p>
                }
            </div>
            <div><Link to="/createroutine">Create New Routine</Link></div>
            <div><Link to="/createactivities">Create New Activity</Link></div>
        </div>
    )
};

// Export
export default Profile;

