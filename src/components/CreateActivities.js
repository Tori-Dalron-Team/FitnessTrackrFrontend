import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// URL to make template literal


const CreateActivities = () => {
    // const apiBaseURL = "http://fitnesstrac-kr.herokuapp.com/api";
    // const currentToken = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [newActivityName, setNewActivityName] = useState("");
    const [newActivityDescription, setNewActivityDescripton] = useState("");
    const [description, setDescription] = useState("");
    const [errorOne, setErrorOne] = useState(null);
    const [everyonesActivities, setEveryonesActivities] = useOutletContext();
    const navigate = useNavigate();

    async function createActivity(event) {
        event.preventDefault();

        try {
            const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            })
            const data = await response.json();
            setEveryonesActivities([everyonesActivities, data])
            navigate("/profile")

            // Callbacks
            console.log("this is the name response: ", newActivityName)
            console.log("this is the description response: ", newActivityDescription)
            console.log("this is the error response: ", errorOne)
        } catch (error) {
            console.error(error.detail)
        }
    };

    // FNs
    function updateNameState(event) {
        setName(event.target.value)
    };

    function updateDescriptionState(event) {
        setDescription(event.target.value)
    };

    // Render
    return (
        <div> 
            <form onSubmit={createActivity}>
                <h2>Create A New Activity</h2>

                <br />                
                <br />

                <label>Name of Activity: </label>
                <input required placeholder="Name of activity" value={name} onChange={updateNameState} type="text"/>

                <br />
                <br />

                <label>Activity Description: </label>
                <input required placeholder="Description" value={description} onChange={updateDescriptionState} type="text"/>
                
                <br />
                <br />

                <button type="submit">Create</button>

                {/* {newActivityName && newActivityName.length ? 
                    <div>
                        <p>{newActivityName}</p>
                        <p>{newActivityDescription}</p>
                        <p>{errorOne}</p>
                    </div> : null
                } */}
                
            </form>
        </div>
    )
};

export default CreateActivities;