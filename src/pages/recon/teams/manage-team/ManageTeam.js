import React, { useState, useEffect } from "react";
import User from "../../../../components/user/User";

import { query, collection, where, getDocs, doc, getDoc, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

function ManageTeam() {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(null)
    const [scoutingData, setScoutingData] = useState({});
    const [team, setTeam] = useState(null)
    const [users, setUsers] = useState([])

    const isUserAdmin = async () => {
        const q = query(collection(db, "teams"), where("owner", "==", user?.uid));
        const q2 = query(collection(db, "teams"), where("admins", "array-contains", user?.uid));

        const doc1 = await getDocs(q);
        const doc2 = await getDocs(q2);
        
        return (doc1.empty && doc2.empty) ? false : true
    }

    const fetchTeam = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
        const doc1 = await getDocs(q);
        return doc1.docs[0]
    }

    const fetchTeamUsers = async (teamData) => {
        console.log(teamData.teamName)
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
        isUserAdmin().then(res => setIsAdmin(res))
        fetchTeam().then(res => {
            setTeam(res.data())
            onSnapshot(doc(db, 'recon', res.data().teamName), doc => setScoutingData(doc.data()));
            fetchTeamUsers(res.data()).then(res => setUsers(res))
        });
      }, [user, loading]);
    
    return <>
    {team ? 
    <>
        <h1 className='no-data-message'>Team Name: {team.teamName}</h1> 
        <h1 className='no-data-message'>Users</h1>
        {users.map(user => <User userData={user} admin={isAdmin} scoutData={scoutingData} />)}
    </>
    : <> Loading... </>}
        
    </>
}

export default ManageTeam;