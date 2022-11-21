import React, {useState} from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router';


const EditActivity = () => {
    
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [personalActivities, setPersonalActivities] = useOutletContext();
    const [everyonesActivities, setEveryonesActivities] = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate()

    
    async function editActivity(event) {
        event.preventDefault()
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                name: editName,
                description: editDescription
            })
            })
            const editedActivities = await fetch("http://fitnesstrac-kr.herokuapp.com/api/activities")
            const updatedATranslation = await editedActivities.json()
            // setPersonalActivities(updatedATranslation)
            setEveryonesActivities(updatedATranslation)
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }


    function editedName(event) {
        setEditName(event.target.value)
    }
    function editedDescription(event) {
        setEditDescription(event.target.value)
    }
    return (
        <div>
            <form onSubmit={editActivity}>
                <label>Edit Activity Name:</label>
                <input type="text" value={editName} onChange={editedName}></input>
                <br />
                <label>Edit Activity Description:</label>
                <input type="text" value={editDescription} onChange={editedDescription}></input>
                <br />
                <button type="submit">Edit</button>
            </form>
        </div>
    )
};

export default EditActivity;