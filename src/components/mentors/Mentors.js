import React from "react";
import './mentors.css';

//images
import campbell from "./media/campbell.jpg";
import pap from "./media/pap.jpg";

function Mentors() {
    return (
        <div id='mentors-container'>
            <h1 className='leader-header'>Lead Mentors</h1>
            <div id='mentor-section'>
                <div className='mentor-card'>
                    <img src={campbell} alt="Mentor" id="mentor-image" />
                    <h2 className='card-title'>Mentor</h2>
                    <h2 className='card-name'>David Campbell</h2>
                </div>
                <div className='mentor-card'>
                    <img src={pap} alt="Mentor" id="mentor-image" />
                    <h2 className='card-title'>Mentor</h2>
                    <h2 className='card-name'>Rick Oliver</h2>
                </div>
            </div>
        </div>
    );
}

export default Mentors;