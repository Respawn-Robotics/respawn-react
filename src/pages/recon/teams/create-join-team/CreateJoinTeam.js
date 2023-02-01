import React, { useState, useEffect } from 'react';
import './create-join-team.css';
import db from '../../../../firebase.config';
import FormInput from '../../../../components/form-input/FormInput';
import { doc, getDoc, getFirestore, collection, setDoc, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateJoinTeam() {
  const auth = getAuth();
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  
  const [inputs, setInputs] = useState({
    'teamNumber': 0,
    'teamName': "",
    'regional': null,
    'owner': null,
    'admins': [],
    'users': []
  });

  if(!user) {
    navigate('/signin')
  }

  const sendData = async () => {
    const collecRef = collection(db, "teams");

    const payload = inputs;

    const docRef = doc(db, "teams", payload.teamName);

    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        toast("A team with this name already exists!");
    } else {
        payload.owner = user.uid;
        payload.users = [user.uid]
        console.log(payload)
        await setDoc(doc(collecRef, payload.teamName), {
            ...payload
        })
        await setDoc(doc(collection(db, 'recon'), payload.teamName), {});
        navigate('/recon/manage-team')
        toast("Team " + payload.teamName + " successfully created!");
    }
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
        <FormInput inputId='teamNumber' type='number' name='Team' onChange={changeInputs} />
        <FormInput inputId='teamName' type='textarea' name='Team Name' onChange={changeInputs} />
        <button type='button' onClick={sendData}>SUBMIT</button>
      </form>
    </div>
  </>
  );
}

export default CreateJoinTeam;
