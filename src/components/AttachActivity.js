import React, { useState } from 'react';
import { useParams } from 'react-router-dom'

const AttachActivityToRoutine = () => {
    const [count, setCount] = useState()
    const [duration, setDuration] = useState()
    const { id } = useParams

    async function putActivityIntoRoutines (event) {
        event.preventDefault()
        try {
            if(!localStorage.getItem("token")) {
                return;
            }
        const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                activityId,
                count,
                duration
            })
        })
        const data = await response.json()
        //Not sure what to attach it to
        } catch (error) {
            console.log(error)
        }
    }
    function editCount(event) {
        setCount(event.target.value)
    }
    function editDuration(event) {
        setDuration(event.target.value)
    }
    return (
        <div>
            <form onSubmit={putActivityIntoRoutines}>
                <label>Enter Count</label>
                <input type="number" value={count} onChange={editCount}></input>
                <br />
                <label>Enter Duration</label>
                <input type="number" value={duration} onChnage={editDuration}></input>
                <br />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AttachActivityToRoutine;