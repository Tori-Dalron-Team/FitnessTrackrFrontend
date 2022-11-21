import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

const Homepage = () => {
    const [everyonesRoutines, setEveryonesRoutines] = useState([]);
    const [everyonesActivities, setEveryonesActivities] = useState([]);
    const [personalActivities, setPersonalActivities] = useState([]);
    const [personalRoutines, setPersonalRoutines] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [routine, setRoutine] = useState([])
    const [activity, setActivity] = useState([])
    const [myprofile, setMyProfile] = useState({})
    
    
// useEffect(() => {
//     async function getAllRoutines () {
//         try {
//             const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             const data = await response.json()
//             console.log(data)
//             setEveryonesRoutines(data)
//             // console.log(data.id)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     getAllRoutines()

// }, [])
useEffect(() => {
async function getAllActivities() {
    try {
        const response = await fetch ('http://fitnesstrac-kr.herokuapp.com/api/activities',{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setEveryonesActivities(data)
    } catch (error) {
        console.log(error)
    }
}
getAllActivities();
}, [])


    return (
        <div>
            <Navbar />
            <Outlet context={[everyonesRoutines, setEveryonesRoutines, personalRoutines, setPersonalRoutines, personalActivities, setPersonalActivities, routine, setRoutine, activity, setActivity, myprofile, setMyProfile]} />
        </div>
    )
};

export default Homepage;
