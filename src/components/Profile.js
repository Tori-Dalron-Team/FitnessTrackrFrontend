import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Profile = () => {
    const [personalRoutines, setPersonalRoutines] = useOutletContext();
    const [allActivities, setAllActivities] = useOutletContext()
    const [personalActivities, setPersonalActivities] = useState([]);
    const [routineArray, setRoutineArray] = useState([]);
    const [activitiesArray, setActivitiesArray] = useState([])
    const [activity, setActivity] = useState([]);
    const [myProfile, setMyProfile] = useOutletContext();
    const [routine, setRoutine] = useOutletContext()
    const [everyonesRoutines, setEveryonesRoutines] = useOutletContext();
    const navigate = useNavigate();

    


    useEffect(() => {
        if (personalRoutines.length) {
            const newArray = personalRoutines.filter((name) => {
                
                return name
            })
            setRoutineArray(newArray)
        }
    }, [personalRoutines])
    // useEffect(() => {
    //     if (personalActivities.length) {
    //         const newActivityArray = personalActivities.filter((name) => {
                
    //             return name
    //         })
    //         setActivitiesArray(newActivityArray)
    //     }
    // }, [personalActivities])
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

        async function deleteButton(id) {
            try {
                const response = await fetch (`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json()
                console.log(data)
                setEveryonesRoutines(everyonesRoutines.filter((routine) => {
                    return routine.id != id
                }))
                setPersonalRoutines(personalRoutines.filter((routine) => {
                    return routine.id != id
                }))
                navigate("/profile")
                
            } catch (error) {
                console.log(error)
            }
        }
    // useEffect(() => {
    //     async function myActivities() {
    //         try {
    //             const response = await fetch (`https://fitnesstrac-kr.herokuapp.com/api/activities/${myProfile.username}/routines`, {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             })
    //             const data = await response.json();
    //             console.log(data)
    //             setPersonalActivities(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     if(myProfile.username) {myActivities()}
    // }, [myProfile])

    function logOut(event) {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <div>

            <h3 id="profile">My Profile</h3>
            <div id="profile-items">

            
                {
                    routineArray.length ? routineArray.map((routine, idx) =>{
                        return <div key={idx}>
                            <h4>{routine.name}</h4>
                            <p>{routine.goal}</p>
                            <button onClick={(e) => {
                                e.preventDefault()
                                deleteButton(routine.id)}}>Delete</button>
                            <Link to={`/editRoutine/${routine.id}`}>Edit Routine</Link>
                        </div>
                        
                    }) : <p>There are no Routines to view</p>
                }
                </div>


                <div id="profile-items"></div>

                

            

                {/* {
                    activitiesArray.length ? activitiesArray.map((activity, idx) => {
                        return <div key={idx}>
                            <p>{activity.name}</p>
                            <Link to={`/editactivities/${activity.activityId}`}>Edit Activity</Link>
                        </div>
                    }) : <p>There are no Activities to view</p>
                } */}

            
            <div id="profile-items"><Link to="/createroutine">Create New Routine</Link></div>
            <div id="profile-items"><Link to="/createactivities">Create New Activity</Link></div>
                <button onClick={logOut}>Log Out</button>
        </div>
    )
};

// Export
export default Profile;

