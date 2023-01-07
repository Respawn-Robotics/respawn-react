import React from "react";
import './mentors.css';

//images
import campbell from "./media/campbell.jpg";
import pap from "./media/pap.jpg";

function Mentors() {
    return (
        <div id='lead-mentors'>
            <div id='mentors-container'>
                <h1 className='leader-header'>Lead Mentors</h1>
                <div id='mentor-section'>
                    <div className='mentor-card'>
                        <div className='mentor-placeholder'>
                            <img src={campbell} alt="Image Not Available" id="mentor-image"/>
                        </div>
                        <h2 className='card-title'>Mentor</h2>
                        <h2 className='card-name'>David Campbell</h2>
                    </div>
                    <div className='mentor-card'>
                        <div className='mentor-placeholder'>
                            <img src={pap} alt="Image Not Available" id="mentor-image" />
                        </div>
                        <h2 className='card-title'>Mentor</h2>
                        <h2 className='card-name'>Rick Oliver</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mentors;