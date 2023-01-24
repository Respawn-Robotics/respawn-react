import React, { useState, useEffect, useRef } from 'react';
import './dashboard.css';
import db from '../../../firebase.config';
import { onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';

function Dashboard() {
  const [data, setData] = useState([]);

  const handleFile = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const url = reader.result;
      setData(JSON.parse(url))
    }

    reader.readAsText(file);
  }

  const sendData = async _ => {
    const docRef = doc(db, 'recon', 'entries');
    const team = data.team;
    delete data['team'];

    await updateDoc(docRef, { [team]: arrayUnion(data)});
  }

  useEffect(_ => console.log(data.team), [data])

  return <>
    <input type='file' onChange={handleFile} style={{marginTop : '50vh'}} />
    <button onClick={sendData}>SUBMIT</button>
  </>;
}

export default Dashboard;
