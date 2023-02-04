import React, { useState } from 'react';
import './sign-out.css'

import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signOut } from "firebase/auth";

const SignOut = () => {
    const [user] = useAuthState(getAuth())
    const navigate = useNavigate()
    console.log(user)
    const signOutButton = () => {
      if(user) {
        signOut(getAuth()).then(() => {
          navigate('/')
        }).catch((error) => {
          console.log(error)
        }); 
      }
    }

    const cancel = () => navigate('/')

  return (
    <>
        <h1 className='header'>Sign Out</h1>
        <h2 id='warning-text'>Are you sure you want to sign out?</h2>
        <div id='sign-out-button-container'>
          <button className='button-yes' onClick={signOutButton}>YES</button>
          <button className='button-cancel' onClick={cancel}>CANCEL</button>
        </div>
    </>
  );
};

export default SignOut;