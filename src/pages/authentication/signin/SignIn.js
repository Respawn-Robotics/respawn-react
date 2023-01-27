import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { doc, getDoc, collection, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import db from '../../../firebase.config.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [userDoc, setUserDoc] = useState
  const [user] = useAuthState(auth)
  const usersRef = collection(db, "users");
  const navigate = useNavigate();
  
  const addUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      updateDoc(docRef, {
        lastSignInTime: Timestamp.fromDate(new Date(user.metadata.lastSignInTime))
      })
    } else {
      setDoc(docRef, {
        displayName: user.displayName,
        email: user.email,
        dateCreated: Timestamp.fromDate(new Date(user.metadata.creationTime)),
        lastSignInTime: Timestamp.fromDate(new Date(user.metadata.lastSignInTime)),
        admin: false
      })
    }
  }
  if (user) {
    addUserData();
    
    navigate("/recon");
  }

  const login = () => {
    signInWithRedirect(auth, provider).then(_ => {
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      console.log(errorCode, errorMessage)
    });
  }

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