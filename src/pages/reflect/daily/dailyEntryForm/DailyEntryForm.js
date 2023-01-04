import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import db from '../../../../firebase.config.js';
import FormInput from '../../../../components/form-input/FormInput';
import './DailyEntryForm.css'

const DailyEntryForm = () => {
  const { date } = useParams();

  const [inputs, setInputs] = useState({
        'date': date,
        'subteam': 'None',
        'rating': -1,
        'whytext': '',
        'howtext': '',
        'whattext': ''
    });

    const sendData = async () => {
        const collecRef = collection(db, "mockkickoff");
        const payload = inputs;

        await addDoc(collecRef, payload);
    }

    const changeInputs = (e) => {
        const target = e.currentTarget;

        const name = target.id;
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

  return (
    <>
        <div className='container'>
          <form>
            <FormInput id='subteam' type='select' name='Subteam' onChange={changeInputs} options={['Base', 'Acquire','Score', 'End-Game']} />
            <FormInput id='rating' type='number' name='Rating ?/5' onChange={changeInputs} />
            <FormInput id='whytext' type='textarea' name='Why was today so good / average / bad?' onChange={changeInputs} />
            <FormInput id='howtext' type='textarea' name='How could today have gone better?' onChange={changeInputs} />
            <FormInput id='whattext' type='textarea' name='What are the goals for tomorrow?' onChange={changeInputs} />
            <button type='button' onClick={sendData}>SUBMIT</button>
          </form>
        </div>
    </>
  );
};

export default DailyEntryForm;