import React, { useState, useEffect } from 'react';
import './dashboard.css';
import db from '../../../firebase.config';
import { onSnapshot, collection } from 'firebase/firestore';

function Dashboard() {
  const [data, setData] = useState([]);
  
  useEffect(() =>
    onSnapshot(collection(db, "recon"), (snapshot) =>
      setData(snapshot.docs.map(doc => doc.data()))), []);

  return (
    <>
      <table>
        {
          console.log(data)
        }
      </table>
    </>
  );
}

export default Dashboard;
