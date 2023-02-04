import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

function Profile() {
  const auth = getAuth();
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  
  console.log(user)
  if(!user) {
    navigate('/signin')
  }
  
  return (
    <>
      { user ?  
        <h2 className='no-data-message'>Display Name: {user.displayName}</h2>
        :  
        <h2 className='no-data-message'>LOADING</h2>
      }
    </>
  );
}

export default Profile;
