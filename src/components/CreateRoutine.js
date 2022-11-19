import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// URL to make template literal
const apiBaseURL = "https://fitnesstrac-kr.herokuapp.com/api";

const CreateRoutine = () => {
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [name, setName] = useState('');
    // const {routinesObj: [routines, setRoutines]} = useOutletContext();
        // attaching activities?

    const navigate = useNavigate();
    // edit and fix variables

    async function addRoutine(event) {
        event.preventDefault();

        try {
            if (!localStorage.getItem("token")) {
              alert("Log in to create a routine. Register below if you don't have an account. ")
              return;
            }
            const response = await fetch(`${apiBaseURL}/routines`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`
                },
                body: JSON.stringify({
                    name, goal, isPublic
                })
            })
            const data = await response.json();

            // Callbacks
            console.log(data)

            setRoutines([...routines, data])

            if (data.id){
                navigate('/routines');
              }
              
            } catch (error) {
              console.log(error);
            }
          }

    // FNs
    function updateRoutineName(event) {
        setName(event.target.value)
        console.log(name)
      }
      function updateRoutineGoal(event) {
        setGoal(event.target.value)
        console.log(goal)
      }
      function updateIsPublic(event) {
        setIsPublic(event.target.checked)
        console.log('isChecked:', event.target.checked)
        console.log('!isChecked:', !event.target.checked)
        console.log('isPublic:', isPublic)
      }
    
    // Render
    return (
        <div> 
            <form onSubmit={addRoutine}>
                <h2>Create A New Routine</h2>

                <br />                
                <br />

                <label>Enter Routine Name: </label>
                <input required placeholder="Routine Name" value={name} onChange={updateRoutineName} type="text"/>

                <br />
                <br />

                <label>Enter Routine Goal: </label>
                <input required placeholder="Routine Goal" value={goal} onChange={updateRoutineGoal} type="text"/>
            
                <br />
                <br />


                <label>Visable to Public: </label>
                <input required placeholder="Make Public" value={isPublic} onChange={updateIsPublic} type="text"/>
            
                <br />
                <br />

                <button type="submit">Create</button>

                {name && name.length ? 
                    <div>
                        <p>{name}</p>
                        <p>{goal}</p>
                        <p>{isPublic}</p>
                    </div> : null
                }
            
            </form>
        </div>
    )
};
export default CreateRoutine;