import React, {useEffect, useState} from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';


const EditRoutine = () => {
    const [isPublic, setIsPublic] = useState(false);
    const [editName, setEditName] = useState("");
    const [editGoal, setEditGoal] = useState("");
    const [everyonesRoutines, setEveryonesRoutines] = useState([]);
    const [personalRoutines, setPersonalRoutines] = useState([]);
    const [routine, setRoutine] = useOutletContext();
    const [myProfile, setMyProfile] = useOutletContext();

    const { id } = useParams();
    const navigate = useNavigate()


    async function editRoutine(event) {
        event.preventDefault()
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
                
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                method: "PATCH",
                body: JSON.stringify({
                    name: editName,
                    goal: editGoal
            })
            })
            
            const editedRoutine = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines")
            console.log(editedRoutine)
            const updatedTranslation = await editedRoutine.json()
            console.log(updatedTranslation)
            // setRoutine([routine, updatedTranslation])
            setEveryonesRoutines(updatedTranslation)
            setPersonalRoutines(updatedTranslation)
            console.log(personalRoutines)
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
    function editIsPublic(event) {
        setIsPublic(event.target.value)
    }

    return (
        <div>
            <form onSubmit={editRoutine} id="edit-routine">
                <label>Edit Routine Name:</label>
                <input type="text" value={editName} onChange={editedName}></input>
                <br />
                <label>Edit Routine Goal:</label>
                <input type="text" value={editGoal} onChange={editedGoal}></input>
                <br />
                <label>Change To Public</label>
                <input type="checkbox" value={isPublic} onChange={editIsPublic}></input>
                <br />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
};

export default EditRoutine;