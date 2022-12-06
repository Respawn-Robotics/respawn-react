import React, { useState, useEffect } from 'react';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import './scout.css';
import db from '../../../firebase.config';
import FormInput from '../../../components/form-input/FormInput';

function ScoutForm() {
    const [inputs, setInputs] = useState({
        'Team': -1,
        'Alliance': 'None',
        'Match': -1,
        'Starting_Position': -1,
        'Exited_Tarmac': false,
        'Auton_Upper': -1,
        'Auton_Lower': -1,
        'Auton_Missed': -1,
        'Climb_Level': 'None',
        'Climb_Time': -1,
        'Additional_Comments': 'None'
    });

    const sendData = async () => {
        const collecRef = collection(db, "recon");
        const payload = inputs;

        await addDoc(collecRef, payload);
    }

    const changeInputs = (event) => {
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

        setInputs(values => ({ ...values, [name]: value }));
    }

    return (<>
        <form>
            <FormInput type='number' name='Team' onChange={changeInputs} />
            <FormInput type='select' name='Alliance' onChange={changeInputs} options={['Red', 'Blue']} />
            <FormInput type='number' name='Match' onChange={changeInputs} />
            <FormInput type='select' name='Starting_Position' onChange={changeInputs} options={[1, 2, 3, 4, 5, 6, 7, 8]} />
            <FormInput type='checkbox' name='Exited_Tarmac' onChange={changeInputs} />
            <FormInput type='number' name='Auton_Upper' onChange={changeInputs} />
            <FormInput type='number' name='Auton_Lower' onChange={changeInputs} />
            <FormInput type='number' name='Auton_Missed' onChange={changeInputs} />
            <FormInput type='select' name='Climb_Level' onChange={changeInputs} options={['Did Not Climb', 'Low Rung', 'High Rung', 'Traversal Rung']} />
            <FormInput type='number' name='Climb_Time' onChange={changeInputs} />
            <FormInput type='textarea' name='Additional_Comments' onChange={changeInputs} />
            <button type='button' onClick={sendData}>SUBMIT</button>
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
            <ScoutForm />
        </>
    );
}

export default Scout;
