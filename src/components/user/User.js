import React, { useEffect, useState } from "react";
import './user.css';
import { query, collection, where, getDocs, doc, getDoc, onSnapshot, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import db from '../../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Users({currentUserRank, userData, rank, scoutData}) {
    const [userScouts, setUserScouts] = useState([]);
    const teamDocRef = doc(db, "teams", userData.team);
    const navigate = useNavigate()
    const [rankState, setRankState] = useState("")
    const usersDocRef = doc(db, "users", userData.uid);

    useEffect(_ => {
        setRankState(rank)
    }, [rank])

    const promoteUser = uid => {
        updateDoc(teamDocRef, {
            admins: arrayUnion(uid)
        })
        navigate('/recon/manage-team')
        toast("Successfuly promoted " + userData.displayName + "!")
    }

    const demoteUser = uid => {
        updateDoc(teamDocRef, {
            admins: arrayRemove(uid)
        })
        navigate('/recon/manage-team')
        toast("Successfuly demoted " + userData.displayName + "!")
    }

    const kickUser = uid => {
        updateDoc(teamDocRef, {
            admins: arrayRemove(uid)
        })

        updateDoc(teamDocRef, {
            users: arrayRemove(uid)
        })

        updateDoc(usersDocRef, {
            team: ""
        })

        navigate('/recon/manage-team')
        toast("Successfuly kicked " + userData.displayName + "!")
    }

    useEffect(_ => {
        let tempArray = 0;
        Object.keys(scoutData)?.map(teamScouted => scoutData[teamScouted].map(entry => {
            if (entry.author === userData.uid) tempArray++;
        }));
        setUserScouts(tempArray);
    }, [scoutData]);

    return <div className="user-display">
            <h3 className="display-name">{userData.displayName}</h3>
            <p className="user-email">{userData.email}</p>
            <p className='user-rank'>{rank}</p>
            <p className='scout-count'>{userScouts}</p>
            {(currentUserRank == "Owner") && 
            <>
                {(rank != "Owner") && <> 
                {(rank == "Admin") && <button className='manage-user' onClick={_ => demoteUser(userData.uid)}>Demote User</button>}
                {(rank != "Admin") && <button className='manage-user' onClick={_ => promoteUser(userData.uid)}>Promote User</button>} 
                <button className='manage-user' onClick={_ => kickUser(userData.uid)}>Kick User</button>
                </>}
            </>}            
        </div>
}

export default Users;