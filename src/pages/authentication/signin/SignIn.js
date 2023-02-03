import React from 'react';
import './sign-in.css';

import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { doc, getDocs, collection, updateDoc, Timestamp, query, where, setDoc, arrayUnion } from 'firebase/firestore';
import db from '../../../firebase.config.js';
import { useAuthState } from 'react-firebase-hooks/auth';

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user] = useAuthState(auth)
  const navigate = useNavigate();
  
  const addUserData = async () => {
    const docRef = doc(db, "users", user.uid);
    const userExistsQuery = query(collection(db, "users"), where("uid", "array-contains", user?.uid));
    const docSnap = await getDocs(userExistsQuery);

    if (!docSnap.empty) {
      updateDoc(docRef, {
        lastSignInTime: Timestamp.fromDate(new Date(user.metadata.lastSignInTime))
      })
    } else {
      setDoc(docRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        dateCreated: Timestamp.fromDate(new Date(user.metadata.creationTime)),
        lastSignInTime: Timestamp.fromDate(new Date(user.metadata.lastSignInTime)),
        team: ""
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
      <h1 id='header'>Sign In</h1>
      <div className='container'>
        <button id='sign-in-button' onClick={login}>Login with Google</button>
      </div>
    </>
  );
};

export default SignIn;