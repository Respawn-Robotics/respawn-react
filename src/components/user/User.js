import React from "react";
import './user.css';

function Users({userData}) {
    return <>
    {console.log(userData)}
        <div className="user-display">
            <h3 className="display-name">Giga Chad</h3>
            <p className="user-email">sigma@hustlersuni.edu</p>
        </div>
    </>
}

export default Users;