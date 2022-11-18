import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

const CreateActivities = () => {
    const currentToken = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [newActivityName, setNewActivityName] = useState("");
    const [newActivityDescription, setNewActivityDescripton] = useState("");
    const [description, setDescription] = useState("");
    const [errorOne, setErrorOne] = useState(null);
    const navigate = useNavigate();

    async function createActivity(event) {
        event.preventDefault();

        try {
            const response = await fetch(`${apiBaseURL}/activities`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                  },
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            })
            const data = await response.json();
            setNewActivityName(data.name);
            setNewActivityDescripton(data.description);
            setErrorOne(data.error)

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

                {newActivityName && newActivityName.length ? 
                    <div>
                        <p>{newActivityName}</p>
                        <p>{newActivityDescription}</p>
                        <p>{errorOne}</p>
                    </div> : null
                }
                
            </form>
        </div>
    )
};

export default CreateActivities;