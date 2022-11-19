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
useEffect(() => {
    async function getAllRoutines () {
        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines")
            const data = await response.json()
            console.log(data)
            // console.log(data.id)
        } catch (error) {
            console.log(error)
        }
    }
    getAllRoutines()
}, [])
useEffect(() => {
    async function getMyRoutines() {
    try {
        if (localStorage.getItem("token")) {
            const filterThroughRoutines = routine.filter((rouitne) => {
                return routine
            })
            setPersonalRoutines(filterThroughRoutines)
        if (isLoggedIn == true) {
            const filterRoutines = everyonesRoutines.filter(indivRoutine => {
                if (indivRoutine.username === whoeverIsCurrentlyLoggedIn) {
                    return indivRoutine;
                }
            })
        }
    }
    } catch (error) {
        console.log(error)
    }
    }
}, []);

    return (
        <div>
            <Navbar />
            <Outlet context={[everyonesRoutines, setEveryonesRoutines, personalRoutines, setPersonalRoutines, personalActivities, setPersonalActivities]} />
        </div>
    )
};

export default Homepage;
