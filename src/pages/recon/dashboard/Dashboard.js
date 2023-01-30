import React, { useState, useEffect, useRef } from 'react';
import './dashboard.css';
import db from '../../../firebase.config';
import { onSnapshot, doc, collection, updateDoc, arrayUnion } from 'firebase/firestore';
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

  if (!user) {
    navigate('/signin')
  }

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
    let dataNoTeam = data;
    delete dataNoTeam['team'];

    await updateDoc(docRef, { [data.team]: arrayUnion(dataNoTeam) });
  }

  useEffect(_ => console.log(data), [data])

  return <>
    <div id='your-profile'>

    </div>
    <div id='dashboard-layout'>
      <div id='file-input-container'>
        <h1 id='file-input-heading'>Scout via Upload</h1>
        <label for='upload-file'>Upload Downloaded Scout Entry</label>
        <input type='file' accept='.json' onChange={handleFile} id='upload-file' />
        <p id='file-preview-text'>
          Uploading Team <div>{data.team ? data.team : '...'}</div><br /> Match <div>{data.match ? data.match : '...'}</div>
        </p>
        <button onClick={sendData}>SUBMIT</button>
      </div>
    </div>
    <div id='recent-scouts-container'>

    </div>
    
  </>;
}

export default Dashboard;
