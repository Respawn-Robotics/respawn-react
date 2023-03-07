import React, { useState, useEffect } from "react";
import { onSnapshot, doc, query, collection, where, getDocs, updateDoc, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '../../../../firebase.config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams, useNavigate } from "react-router-dom";
import Scout from "../Scout";

function EditEntry() {
    const [database, setDatabase] = useState({});
    const [inputs, setInputs] = useState({});
    const [teamData, setTeamData] = useState({});
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const entry = useParams()['entry'].split('-');

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
        const doc = await getDocs(q);
        return doc;
    }

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


    useEffect(_ => {
        if (loading) return;
        if (!user) return navigate('/signin');
        isUserAdmin().then(res => {
            if (res === true) {
                isUserOwner().then(res => {
                    if (res == true) return navigate('/recon/teams');
                });
                return;
            }
            return;
        });
        fetchTeamName().then(userData => {
            setTeamData(userData.docs[0].data());
            onSnapshot(doc(db, 'recon',
                `${userData.docs[0].data().teamName}-${userData.docs[0].data().regional}`), doc => setDatabase(doc.data()));
        });
    }, [user, loading]);

    return <>
        <Scout edit={true} values={Object.keys(database).length > 0 ? {...database[entry[0]][database[entry[0]]?.map(e => e.match).indexOf(entry[1])], team: entry[0]} : {}} />
    </>
}

export default EditEntry;