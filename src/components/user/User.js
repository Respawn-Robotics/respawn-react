import React, { useEffect, useState } from "react";
import './user.css';

function Users({userData, admin, scoutData}) {
    const [userScouts, setUserScouts] = useState([]);

    useEffect(_ => {
        let tempArray = [];
        Object.keys(scoutData).map(teamScouted => scoutData[teamScouted].map(entry => {
            if (entry.author === userData.uid) tempArray.push(entry)
        }));
        setUserScouts(tempArray);
    }, [scoutData]);

    return <>
        <div className="user-display">
            <h3 className="display-name">{userData.displayName}</h3>
            <p className="user-email">{userData.email}</p>
            <button className='view-scouts'>View Scouts</button>
            {admin && <button className='manage-user'>Manage User</button>}
        </div>
        <div className="scouts-container">
            {userScouts.map(scout => <>
                
            </>)}
        </div>
    </>
}

export default Users;