import React from 'react';
import './Reflect.css'
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import paths from '../../../paths.json';

const Reflect = () => {
  const auth = getAuth();
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  console.log(user)
  if(!user) {
    navigate('/signin')
  }

  return (
    <>
    <h1 className='reflect-header'>Respawn Reflect</h1>
    <div className='reflect-buttons'>
        <a href={paths.reflect['record']}>Daily Record</a>
        <a href={paths.reflect['legacy']}>Legacy</a>
        <a href={paths.reflect['daily']}>Daily Reflect</a>
    </div>
    </>
  );
};

export default Reflect;