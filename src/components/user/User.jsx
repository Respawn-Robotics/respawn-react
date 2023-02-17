import React, { useEffect, useState } from "react";
import './user.css';

function Users({currentUserRank, userData, rank, scoutData, kickUser, promoteUser, demoteUser}) {
    const [userScouts, setUserScouts] = useState([]);

    useEffect(_ => {
        let tempArray = 0;
        Object.keys(scoutData)?.forEach(teamScouted => scoutData[teamScouted].forEach(entry => {
            if (entry.author === userData.displayName) tempArray++;
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
                {(rank == "Admin") && <button className='manage-user' onClick={_ => demoteUser(userData.uid, userData)}>Demote User</button>}
                {(rank != "Admin") && <button className='manage-user' onClick={_ => promoteUser(userData.uid, userData)}>Promote User</button>} 
                <button className='manage-user' onClick={_ => kickUser(userData.uid, userData)}>Kick User</button>
                </>}
            </>}            
        </div>
}

export default Users;