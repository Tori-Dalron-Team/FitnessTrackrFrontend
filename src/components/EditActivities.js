import React, {useState} from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router';


const EditActivity = () => {
    const [isPublic, setIsPublic] = useState(true);
    const [editCount, setEditcount] = useState("");
    const [editDuration, setEditDuration] = useState("");
    const [personalActivities, setPersonalActivities] = useOutletContext();
    const [everyonesActivities, setEveryonesActivities] = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate()

    
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
                description: editDuration
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


    function editedCount(event) {
        setEditName(event.target.value)
    }
    function editedDuration(event) {
        setEditDescription(event.target.value)
    }
    return (
        <div>
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

export default EditActivity;