import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

const Routines = () => {
    const [routine, setRoutine] = useState()
    useEffect(()=> {
        async function getAllRoutines () {
            try{
                const data = await fetch(`${apiBaseURL}/routines`, 
                {
                    headers : {
                        'Content-Type': 'application/json'
                    }
                })
                const results = await data.json()
                setRoutine(results)
                console.log(results)
            } catch(error){
                console.error(error).detail
            }
        }
    getAllRoutines()
        }
    
    ,[])


    // Render The State Data To See
    return (
            <div>
                <h1>Routines</h1>
                
                {routine && routine.length ? routine.map(e => {
                    return <div key = {e.id}> 
                        <h2>{e.name}</h2> 
                        <div>{e.goal}</div> 
                        <h4>By: {e.creatorName}</h4> 
                        <h5>Activities</h5>
                </div>}) : "No Routines Available To Display! "}
                        
            </div>

    )
}

// Export
export default Routines;

// i believe we're making a link to go into activities on this page