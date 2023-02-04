import React from 'react';
import './invite.css';

import { useNavigate } from 'react-router-dom'
import { doc, updateDoc, deleteDoc, arrayUnion } from 'firebase/firestore';
import db from "../../firebase.config";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

function Invite({ user, invite }) {
    const inviteRef = doc(db, "invites", user.email);
    const usersDocRef = doc(db, "users", user.uid);

    const navigate = useNavigate()

    const acceptInvite = async (e) => {
        e.preventDefault()
        const teamDocRef = doc(db, "teams", invite.team);

        updateDoc(usersDocRef, {
          team: invite.team
        })

        updateDoc(teamDocRef, { 
          users: arrayUnion(user.uid)
        })

        await deleteDoc(inviteRef);
        toast("Invite accepted!");
        navigate('/recon/manage-team')
    }

    const denyInvite = async (e) => {
        e.preventDefault()
        await deleteDoc(inviteRef);
        toast("Invite denied!");
        navigate('/recon/manage-team')
    }

  return (
    <>  {invite ? <>
        <h1 className='header'>Invite</h1>
        <h1 className='header'>From team <o>{invite.team}</o></h1>
        <div className='button-container'>
          <button className='accept-button' onClick={acceptInvite}>ACCEPT</button>
          <button className='deny-button' onClick={denyInvite}>DENY</button>
        </div>
    </> : <> </>}

    </>
  );
}

export default Invite;