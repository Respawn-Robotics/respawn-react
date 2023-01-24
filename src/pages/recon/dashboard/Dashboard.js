import React, { useState, useEffect } from 'react';
import './dashboard.css';
import db from '../../../firebase.config';
import { onSnapshot, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

function Dashboard() {
  const [data, setData] = useState([]);
  const auth = getAuth();
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() =>
    onSnapshot(collection(db, "recon"), (snapshot) =>
      setData(snapshot.docs.map(doc => doc.data()))), []);
  
  if(!user) {
    navigate('/signin')
  }
  
  return (
    <>
      <table>
        {
          console.log(data)
        }
      </table>
      <h2 className='no-data-message'>Global data will be displayed soon.</h2>
    </>
  );
}

export default Dashboard;
