import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";

const SignOut = () => {
    const [user] = useAuthState(getAuth())
    console.log(user)
  return (
    <>
        <h1 className='reflect-header'>Sign Out</h1>
        <div className='daily-container'>

        </div>
    </>
  );
};

export default SignOut;