import React, {useState} from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router';


const EditRoutine = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [editName, setEditName] = useState("");
    const [editGoal, setEditGoal] = useState("");
    const [everyonesRoutines, setEveryonesRoutines] = useOutletContext();
    const [personalRoutines, setPersonalRoutines] = useOutletContext();
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
            setPersonalRoutines(updatedTranslation)
            setEveryonesRoutines(updatedTranslation)
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
            <form onSubmit={editRoutine}>
                <label>Edit Routine Name:</label>
                <input type="text" value={editName} onChange={editedName}></input>
                <br />
                <label>Edit Routine Goal:</label>
                <input type="text" value={editGoal} onChange={editedGoal}></input>
                <br />
                <label>Chnage To Private</label>
                <input type="checkbox" value={isPublic} onChange={editIsPublic}></input>
                <br />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
};

export default EditRoutine;