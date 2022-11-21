import React, { useState, useEffect } from "react";
import {Link, useOutletContext, useParams } from "react-router-dom";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

const Routines = () => {
    const [routine, setRoutine] = useOutletContext()
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
                <h1 class="routines">Routines</h1>
                <div id="routines-link"><h3><Link to="/activities">See Activities</Link></h3></div>
                
                {routine && routine.length ? routine.map(e => {
                    return <div id="routines" key = {e.id}> 
                        <h2 id="routines-title">{e.name}</h2> 
                        <div id="routines-goal">{e.goal}</div> 
                        <h4 id="routines-creator">By: {e.creatorName}</h4> 
                        
                        
                </div>}) : "No Routines Available To Display! "}
                
            </div>

    )
}

// Export
export default Routines;

// i believe we're making a link to go into activities on this page