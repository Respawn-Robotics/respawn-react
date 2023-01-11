import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { onSnapshot, collection, addDoc, getFirestore } from 'firebase/firestore';
import db from '../../../firebase.config.js';
import { useAuthState } from 'react-firebase-hooks/auth'

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth)

  const login = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      console.log(errorCode, errorMessage)
    });
  }

  getRedirectResult(auth)
  .then((result) => {
      // login logic
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  return (
    <>
        <h1 className='reflect-header'>Sign In</h1>
        <div className='container'>
            <button onClick={login}>Login with Google</button>
        </div>
    </>
  );
};

export default SignIn;