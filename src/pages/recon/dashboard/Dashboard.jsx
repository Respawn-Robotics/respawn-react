import React, { useState, useEffect } from 'react';
import './dashboard.css';
import db from '../../../firebase.config';
import { onSnapshot, doc, query, collection, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {
  const [database, setDatabase] = useState({});
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("")

  useEffect(_ => {
    if (loading) return
    if (!user) return navigate('/signin')
    getDisplayName().then(res => setDisplayName(res.displayName))
    fetchTeamName().then(userData => {
      onSnapshot(doc(db, 'recon',
        `${userData.docs[0].data().teamName}-${userData.docs[0].data().regional}`), doc => setDatabase(doc.data()));
      setName(userData.docs[0].data());
    });
  }, [user, loading]);

  const fetchTeamName = async () => {
    const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
    const doc = await getDocs(q);
    return doc;
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
    let dataNoTeam = structuredClone(data);
    delete dataNoTeam['team'];
    if (!database[data.team] || database[data.team].map(en => en.match).indexOf(data.match) === -1) {
      const docRef = doc(db, 'recon', `${name.teamName}-${name.regional}`);
      toast.promise(updateDoc(docRef, { [data.team]: arrayUnion(dataNoTeam) }), {
        pending: 'Uploading...',
        success: 'Uploaded!',
        error: 'Upload Failed!'
      });
    } else {
      toast('A scout for the same team in the same match already exists!', { type: 'error' });
    }
  }

  const getDisplayName = async () => {
    const userExistsQuery = query(collection(db, "users"), where("uid", "==", user?.uid));
    const docSnap = await getDocs(userExistsQuery);

    return docSnap.docs[0].data()
  }

  return <>
    <div id='your-profile'>
      {user ?
        <>
          <h1 className='header' id='dashboard-header'>Welcome <o>{displayName}</o>!</h1>
        </>
        : <>Loading...</>}
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
  </>;
}

export default Dashboard;
