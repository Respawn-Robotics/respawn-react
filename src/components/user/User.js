import React, { useEffect, useState } from "react";
import './user.css';

function Users({userData, rank, admin, scoutData}) {
    const [userScouts, setUserScouts] = useState([]);

    const manageUser = uid => {
        console.log(uid)
    }

    useEffect(_ => {
        let tempArray = 0;
        // Object.keys(scoutData).map(teamScouted => scoutData[teamScouted].map(entry => {
        //     if (entry.author === userData.uid) tempArray++;
        // }));
        setUserScouts(tempArray);
    }, [scoutData]);

    return <div className="user-display">
            <h3 className="display-name">{userData.displayName}</h3>
            <p className="user-email">{userData.email}</p>
            <p className='user-rank'>{rank}</p>
            <p className='scout-count'>{userScouts}</p>
            {admin && <button className='manage-user' onClick={_ => manageUser(userData.uid)}>Manage User</button>}
        </div>
}

export default Users;