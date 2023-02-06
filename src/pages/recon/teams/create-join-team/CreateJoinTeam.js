import React, { useState, useEffect } from 'react';
import './create-join-team.css';
import db from '../../../../firebase.config';
import FormInput from '../../../../components/form-input/FormInput';
import { doc, getDoc, getFirestore, collection, setDoc, addDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';
import Invite from '../../../../components/invite/Invite';
import 'react-toastify/dist/ReactToastify.css';

function CreateJoinTeam() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [invite, setInvite] = useState(null)
  
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
        await setDoc(doc(collection(db, 'recon'), payload.teamName), {});
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

  const fetchInvite = async () => {
    const q = query(collection(db, "invites"), where("email", "==", user?.email));
    const doc1 = await getDocs(q);

    return doc1.docs[0]
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/signin");
    fetchInvite().then(res => setInvite(res.data()))
  }, [user, loading]);

  return (
  <>
    <div className='column' id='forms-container'>
      <form id='create-team-form'>
        <h1 className='header'>Create Team:</h1>
        <FormInput inputId='teamNumber' type='number' name='Team' onChange={changeInputs} />
        <FormInput inputId='teamName' type='textarea' name='Team Name' onChange={changeInputs} />
        <button id='submit-button' type='button' onClick={sendData}>SUBMIT</button>
      </form>
      {invite ? 
      <div id='invite-container'>
        {user && <Invite user={user} invite={invite}/>}
      </div> :
      <div>
        <h1 className='header'>No invites.</h1>
      </div>
      }
    </div>
  </>
  );
}

export default CreateJoinTeam;
