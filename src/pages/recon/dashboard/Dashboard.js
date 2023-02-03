import React, { useState, useEffect } from 'react';
import './dashboard.css';
import db from '../../../firebase.config';
import { onSnapshot, doc, query, collection, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../../../components/form-input/FormInput';

function Dashboard() {
  const [database, setDatabase] = useState({});
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    displayName: ""
  });

  useEffect(_ => {
    if (loading) return
    if (!user) return navigate('/signin')
    fetchTeamName().then(userData => {
      onSnapshot(doc(db, 'recon',
        userData.docs[0].data().teamName), doc => setDatabase(doc.data()))

      setName(userData.docs[0].data().teamName);
    });
  }, [user, loading]);

  const fetchTeamName = async () => {
    const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
    const doc = await getDocs(q);
    return doc;
  }

  useEffect(_ => console.log(database), [database]);

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
      const docRef = doc(db, 'recon', name);
      toast.promise(updateDoc(docRef, { [data.team]: arrayUnion(dataNoTeam) }), {
        pending: 'Uploading...',
        success: 'Uploaded!',
        error: 'Upload Failed!'
      });
    } else {
      console.log('dsahdashjk')
      toast('A scout for the same team in the same match already exists!', { type: 'error' });
    }
  }

  const changeInputs = (e) => {
    console.log(getDisplayName())
    const target = e.currentTarget;

    const name = target.id;
    let value = null;

    switch (target.type) {
      case "number":
        value = parseInt(target.value);
        break;
      case "checkbox":
        value = target.checked;
        break;
      default:
        value = target.value;

    }
    setInputs(values => ({ ...values, [name]: value }));
  }

  const getDisplayName = async () => {
    const userExistsQuery = query(collection(db, "users"), where("uid", "==", user?.uid));
    const docSnap = await getDocs(userExistsQuery);
    return docSnap
  }

  const returnDisplayName = () => {
    let displayName;
    getDisplayName().then(res => displayName = res)

    console.log(displayName)
  }
  const sendDisplayNameData = async () => {
    const payload = inputs;
    const usersDocRef = doc(db, "users", user.uid);

    await updateDoc(usersDocRef, {
      displayName: payload.displayName
    })

    setInputs({ displayName: "" })
    toast("Successfully changed display name!");
  }

  return <>
    <div id='your-profile'>
      {user ?
        <>
          <h1 className='header' id='users-header'>Current Display Name: {returnDisplayName()}</h1>
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
    <div id='recent-scouts-container'>

    </div>

  </>;
}

export default Dashboard;
