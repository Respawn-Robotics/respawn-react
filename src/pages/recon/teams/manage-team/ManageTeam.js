import React, { useState, useEffect } from "react";

import { query, collection, where, getDocs } from 'firebase/firestore';
import db from '../../../../firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

function ManageTeam() {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const [team, setTeam] = useState(null)

    const fetchTeam = async () => {
        const q = query(collection(db, "recon-teams"), where("owner", "==", user?.uid));
        const q2 = query(collection(db, "recon-teams"), where("admins", "array-contains", user?.uid));

        const doc1 = await getDocs(q);
        const doc2 = await getDocs(q2);
        
        setTeam(doc1.docs[0] ? doc2.docs[0] : undefined)
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/signup");
        fetchTeam();
      }, [user, loading]);
      console.log(team)
    
    return <>
        { team ? <h1>PERMS</h1> : <h1>NO PERMS</h1>}
    </>
}

const isUserAdmin = () => {
    
}


export default ManageTeam;