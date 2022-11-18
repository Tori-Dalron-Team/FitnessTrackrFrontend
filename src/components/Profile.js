import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
    const [personalRoutines, setPersonalRoutines] = useState([]);
    const [allRoutines, setAllRoutines] = useState([]);
    const [allActivities, setAllActivities] = useState([]);
    const [personalActivities, setPersonalActivities] = useState([]);
    const [filterArray, setFilterArray] = useState([]);

    useEffect(() => {
        if (personalRoutines) {
            const newArray = personalRoutines.filter((routine) => {
                return routine.active
            })
            setFilterArray(newArray)
        }
    }, [personalRoutines])

    useEffect(() => {
        async function profileInfo(event) {
            try {
                const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json()
                setPersonalRoutines(data.routine)
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
                    filterArray.length ? filterArray.map((routine, idx) =>{
                        return <div key={idx}>
                            <p>Your Routines: {routine.name}</p>
                        </div>
                    }) : <p>There are no Routines to view</p>
                }
            </div>
        </div>
    )
};

// Export
export default Profile;

