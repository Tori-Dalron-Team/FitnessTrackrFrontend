import React, {useState} from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router';


const EditRoutineActivities = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [editName, setEditName] = useState("");
    const [editGoal, setEditGoal] = useState("");
    const [editCount, setEditCout] = useState("");
    const [editDuration, setEditDuration] = useState("");
    const [everyonesRoutines, setEveryonesRoutines] = useOutletContext();
    const [personalRoutines, setPersonalRoutines] = useOutletContext();
    const [personalActivities, setPersonalActivities] = useOutletContext();
    const [everyonesActivities, setEveryonesActivities] = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate()

    async function editRoutine(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: editName,
                    goal: editGoal
            })
            })
            const editedRoutine = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines")
            const updatedTranslation = await editedRoutine.json()
            setPersonalRoutines(updatedTranslation.rouitne)
            setEveryonesRoutines(updatedTranslation.routine)
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }
    async function editActivity(event) {
        event.preventDefault()
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/api/routine_activities/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                count: editCount,
                duration: editDuration
            })
            })
            const editedActivities = await fetch("http://fitnesstrac-kr.herokuapp.com/api/activities")
            const updatedATranslation = await editedActivities.json()
            setPersonalActivities(updatedATranslation.activity)
            setEveryonesActivities(updatedATranslation.activity)
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }

    function editedName(event) {
        setEditName(event.target.value)
    }
    function editedGoal(event) {
        setEditGoal(event.target.value)
    }
    function editedCount(event) {
        setEditCout(event.target.value)
    }
    function editedDuration(event) {
        setEditDuration(event.target.value)
    }
    return (
        <div>
            <form onSubmit={editRoutine}>
                <label>Edit Routine Name:</label>
                <input type="text" value={editName} onChange={editedName}></input>
                <br />
                <label>Edit Routine Goal:</label>
                <input type="text" value={editGoal} onChange={editedGoal}></input>
                <br />
                <button type="submit">Edit</button>
            </form>
            <form onSubmit={editActivity}>
                <label>Edit Activity Count:</label>
                <input type="text" value={editCount} onChange={editedCount}></input>
                <br />
                <label>Edit Activity Duration:</label>
                <input type="text" value={editDuration} onChange={editedDuration}></input>
                <br />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
};

export default EditRoutineActivities;