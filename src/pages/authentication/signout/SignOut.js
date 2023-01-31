import React, { useState } from 'react';
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
        <h1 className='reflect-header'>Sign Out</h1>
        <div className='daily-container'>
          <h2>Are you sure you want to sign out?</h2>
        </div>
        <div className='daily-container'>
          <button onClick={signOutButton}>YES</button>
          <button onClick={cancel}>CANCEL</button>
        </div>
    </>
  );
};

export default SignOut;