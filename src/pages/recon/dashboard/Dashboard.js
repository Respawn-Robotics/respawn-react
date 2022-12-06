import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/Navbar';
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
      <Navbar />
      <table>
        {
          console.log(data)
        }
      </table>
    </>
  );
}

export default Dashboard;
