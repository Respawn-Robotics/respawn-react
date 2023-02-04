import React, { useState, useEffect } from "react";
import './manage-team.css';
import User from "../../../../components/user/User";
import FormInput from "../../../../components/form-input/FormInput";
import { query, collection, where, getDocs, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import db from '../../../../firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';

function useForceUpdate(){
    const [value, setValue] = useState(0); 
    return () => setValue(value => value + 1); 
}

function ManageTeam() {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const [currentUserRank, setCurrentUserRank] = useState("")
    const [scoutingData, setScoutingData] = useState({});
    const [team, setTeam] = useState(null)
    const [users, setUsers] = useState([])
    const [inputs, setInputs] = useState({
        email: ""
    })

    const isUserAdmin = async () => {
        const q = query(collection(db, "teams"), where("admins", "array-contains", user.uid));
        const doc1 = await getDocs(q);
        return doc1.empty
    }

    const isUserOwner = async () => {
        const q = query(collection(db, "teams"), where("owner", "==", user.uid));
        const doc1 = await getDocs(q);
        return doc1.empty
    }

    const fetchTeam = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
        const doc1 = await getDocs(q);
        return doc1.docs[0]
    }

    const fetchTeamUsers = async (teamData) => {
        const q = query(collection(db, "users"), where("team", "==", teamData.teamName.toString()));
        const docs = await getDocs(q);
        let userArray = [];
        docs.forEach(doc => {
            const data = doc.data()
            userArray.push(data)
        })
        return userArray
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/signin");
        isUserAdmin().then(res => {
            if(res == false) setCurrentUserRank("Admin")
        })
        isUserOwner().then(res => {
            if(res == false) setCurrentUserRank("Owner")
        })
        fetchTeam().then(res => {
            setTeam(res.data())
            onSnapshot(doc(db, 'recon', res.data().teamName), doc => setScoutingData(doc.data()));
            fetchTeamUsers(res.data()).then(u => setUsers(u.sort((a, b) => {
                if (res.data().owner === a.uid) return -1;
                if (res.data().owner === b.uid) return 1;
                if (res.data().admins?.includes(a.uid)) {
                    if (res.data().admins?.includes(b.uid)) return 0;
                    return -1;
                }
                if (res.data().admins?.includes(b.uid)) return 1;
                return 0;
            })))
        });
    }, [user, loading]);

    const changeInputs = (e) => {
        console.log(currentUserRank)

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

    const sendData = async () => {
        const payload = inputs;
        const invitesDocRef = doc(db, "invites", inputs.email);

        const invitesSnap = await getDoc(invitesDocRef);

        payload.team = team.teamName;
        if(invitesSnap.exists()) {
            toast("That user has already been invited!");
        } else {
            setDoc(invitesDocRef, {
                ...payload
            })
            setInputs({ email: "" })
            toast("Successfully sent invite!");
        }
    }

    return <>
        {team ?
            <>
                <h1 className='header' id='team-name'>Team Name: <o>{team.teamName}</o></h1>
                {(currentUserRank === "Admin" || currentUserRank === "Owner") &&
                <form id='send-invite-form'>
                    <h1 className='header'>Send Invite:</h1>
                    <FormInput inputId='email' type='textarea' name='Email' onChange={changeInputs} value={inputs.email}/>
                    <button id='submit-button' type='button' onClick={sendData}>SUBMIT</button>
                </form>}
                <h1 className='header'>Users:</h1>
                <div id='users-container'>
                    <div id='user-headings'>
                        <h1>Name</h1>
                        <h1>Email</h1>
                        <h1>Rank</h1>
                        <h1>No. Of Scouts</h1>
                    </div>
                    {users.map(i => <User
                        userData={i}
                        key={i.uid}
                        admin={(currentUserRank === "Admin" || currentUserRank === "Owner")}
                        rank={
                            team.owner === i.uid ? 'Owner' :
                            team.admins.includes(i.uid) ? 'Admin' :
                            'User'
                        }
                        scoutData={scoutingData}
                        currentUserRank={currentUserRank}
                    />)}
                </div>
            </>
            
            : <> Loading... </>}

    </>
}

export default ManageTeam;