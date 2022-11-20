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
    const [myProfile, setMyProfile] = useOutletContext();
   

    


    useEffect(() => {
        if (personalRoutines.length) {
            const newArray = personalRoutines.filter((name) => {
                
                return name
            })
            setRoutineArray(newArray)
        }
    }, [personalRoutines])
    useEffect(() => {
        if (personalActivities.length) {
            const newActivityArray = personalActivities.filter((name) => {
                
                return name
            })
            setActivitiesArray(newActivityArray)
        }
    }, [personalActivities])
    useEffect(() => {
        if(localStorage.getItem("token")) {
            async function profileInfo() {
                try {
                    const response = await fetch ('https://fitnesstrac-kr.herokuapp.com/api/users/me', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    const data = await response.json()
                    setMyProfile(data)
                } catch (error) {
                    console.log(error)
                }
            }
            profileInfo();
        }
        
    }, [])
    useEffect(() => {
        async function myRoutines() {
            try {
                const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${myProfile.username}/routines`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                setPersonalRoutines(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(myProfile.username) {myRoutines()}
    }, [myProfile]);

    useEffect(() => {
        async function myActivities() {
            try {
                const response = await fetch (`https://fitnesstrac-kr.herokuapp.com/api/activities/${myProfile.username}/routines`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await response.json();
                console.log(data)
                setPersonalActivities(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(myProfile.username) {myActivities()}
    }, [myProfile])
    return (
        <div>
            <h3>Profile page</h3>
            <div>
                <h3>Your Routines</h3>
                {
                    routineArray.length ? routineArray.map((routine, idx) =>{
                        return <div key={idx}>
                            <h4>{routine.name}</h4>
                            <p>{routine.goal}</p>
                            <Link to={`/editroutine/${routine.rotuineId}`}>Edit Routine</Link>
                        </div>
                        
                    }) : <p>There are no Routines to view</p>
                }
                </div>
                <div>
                    <h3>Your Activities</h3>
                {
                    activitiesArray.length ? activitiesArray.map((activity, idx) => {
                        return <div key={idx}>
                            <p>{activity.name}</p>
                            <Link to={`/editactivities/${activity.activityId}`}>Edit Activity</Link>
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

