import React, { useState, useEffect } from 'react';
import './CreateJoinTeam.css';
import db from '../../../../firebase.config';
import FormInput from '../../../../components/form-input/FormInput';
import { doc, getDoc, getFirestore, collection, setDoc, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ToastContainer, toast } from 'react-toastify';
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

  const getUserIndex = async (uid) => {
    const docRef = doc(db, "users", "entries");
    const docSnap = await getDoc(docRef)
    const userArray = docSnap.data()
    let index;
    Object.keys(userArray.users).map(user => {
        console.log(user)
        if(user.uid == uid) {
          index = userArray.users.indexOf(user)
        }
    })
    console.log(index)
    console.log(userArray)
}

  const sendData = async () => {
    const payload = inputs;
    const collecRef = collection(db, "teams");
    const usersDocRef = doc(db, "users", user.uid);
    const teamDofRef = doc(db, "teams", payload.teamName);

    const teamDocSnap = await getDoc(teamDofRef);

    if(teamDocSnap.exists()) {
        toast("A team with this name already exists!");
    } else {
        // This is where I gave up. malding
        payload.owner = user.uid;
        payload.users = [user.uid]
        setDoc(doc(collecRef, payload.teamName), {
            ...payload
        })
        updateDoc(usersDocRef, {
          team: payload.teamName
        })
        }
        navigate('/recon/manage-team')
        toast("Team " + payload.teamName + " successfully created!");
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
        <ToastContainer />
      </form>
    </div>
  </>
  );
}

export default CreateJoinTeam;
