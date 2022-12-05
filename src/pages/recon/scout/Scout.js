import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import './scout.css';
import db from '../../../firebase.config';
import { type } from '@testing-library/user-event/dist/type';

function ScoutForm() {
    const [inputs, setInputs] = useState({});

    const addEntry = async () => {
        const collecRef = collection(db, "recon");
        const payload = inputs;

        await addDoc(collecRef, payload);
    }

    const change = (event) => {
        const target = event.target;

        const name = target.name;
        let value = null;
        
        switch (target.type) {
            case "number":
                value = parseInt(target.value);
                break;
            case "checkbox":
                value = target.checked;
                break;
            default:
                value = target.value;
            
        }

        console.log(value + ", " + typeof value);
        setInputs(values => ({ ...values, [name]: value }))
    }

    let widgets = [
        <input type='number' name='team' value={inputs.team || ""} onChange={change} className='form-input'/>,
        <select name='alliance' value={inputs.alliance || ""} onChange={change} className='form-input'>
                        <option value='Red'>Red</option>
                        <option value='Blue'>Blue</option>
                    </select>,
        <input type='number' name='match' value={inputs.match || ""} onChange={change} className='form-input'/>,
        <select name='Starting_Position' value={inputs.Starting_Position || ""} onChange={change} className='form-input'>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                            </select>,
        <input type='checkbox' name='Exited_Tarmac' value={inputs.Exited_Tarmac || ""} onChange={change} className='form-input'/>,
        <input type='number' name='Auton_Upper_Score' value={inputs.Auton_Upper_Score || ""} onChange={change} className='form-input'/>,
        <input type='number' name='Auton_Lower_Score' value={inputs.Auton_Lower_Score || ""} onChange={change} className='form-input'/>,
        <input type='number' name='Auton_Missed_Shots' value={inputs.Auton_Missed_Shots || ""} onChange={change} className='form-input'/>,
        <select name='Climb_Level' value={inputs.Climb_Level || ""} onChange={change} className='form-input'>
                            <option value='Did_Not_Climb'>Did Not Climb</option>
                            <option value='Low Rung'>Low Rung</option>
                            <option value='Mid Rung'>Mid Rung</option>
                            <option value='High Rung'>High Rung</option>
                            <option value='Traversal Rung'>Traversal Rung</option>
                        </select>,
        <input type='number' name='Time_To_Climb' value={inputs.Time_To_Climb || ""} onChange={change} className='form-input'/>,
        <textarea name='Additional_Comments' value={inputs.Additional_Comments || ""} onChange={change} className='form-input'/>,
    ];

    return (<>
        <form>
            {widgets.map(field => {
                return (
                    <label key={field.props.name}>
                        {field.props.name}: {field}
                    </label>
                )
            })}
            <button type="button" onClick={addEntry} >SUBMIT</button>
        </form>
    </>
    )

}

function Scout() {

    const [data, setData] = useState([]);

    useEffect(() => onSnapshot(collection(db, "recon"), (snapshot) =>
        setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))), []);


    return (
        <>
            <ScoutForm/>
        </>
    );
}

export default Scout;
