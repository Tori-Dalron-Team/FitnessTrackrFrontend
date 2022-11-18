import React, { useState, useEffect} from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"

const Homepage = () => {
    const [everyonesRoutines, setEveryonesRoutines] = useState([])
useEffect(() => {
    async function getAllRoutines () {
        try {
            const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines")
            const data = await response.json()
            console.log(data)
            console.log(data.id)
        } catch (error) {
            console.log(error)
        }
    }
    getAllRoutines()
}, [])
    return (
        <div>
            <Navbar />

            <Outlet context={[everyonesRoutines, setEveryonesRoutines]} />
        </div>
    )
};

export default Homepage;