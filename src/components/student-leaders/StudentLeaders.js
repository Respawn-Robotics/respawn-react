import React from "react";
import './student-leaders.css';

//images
import anuj from './media/anuj.jpg';
import bharat from './media/bharat.jpg';
import braden from './media/braden.jpg';
import dev from './media/dev.jpg';
import dru from './media/dru.jpg';
import jackson from './media/jackson.jpg';
import justin from './media/justin.jpg';
import kylie from './media/kylie.jpg';
import mathias from './media/mathias.jpg';
import nathan from './media/nathan.jpg';
import nikhil from './media/nikhil.jpg';
import stephen from './media/stephen.jpg';
import taylor from './media/taylor.jpg';

function StudentLeaders() {
    return (
        <div id='student-leaders'>
            <div id='core-7'>
                <h1 className='leader-header'>Core 7 Officers</h1>
                <div id='core-7-leaders'>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={nikhil} alt="Image Not Available" id="core-image"/>
                        </div>
                        <h2 className='card-title'>CEO</h2>
                        <h2 className='card-name'>Nikhil Acharya</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={mathias} alt="Image Not Available" id="core-image"/>

                        </div>
                        <h2 className='card-title'>COO</h2>
                        <h2 className='card-name'>Mathias Yohannes</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={taylor} alt="Image Not Available" id="core-image"/>
                        </div>
                        <h2 className='card-title'>CIO</h2>
                        <h2 className='card-name'>Taylor Buchanan</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={dev} alt="Image Not Available" id="core-image"/>
                        </div>
                        <h2 className='card-title'>CTO</h2>
                        <h2 className='card-name'>Dev Bhagat</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={kylie} alt="Image Not Available" id="core-image"/>
                        </div>
                        <h2 className='card-title'>CMO</h2>
                        <h2 className='card-name'>Kylie Stewart</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={jackson} alt="Image Not Available" id="core-image"/>
                        </div>
                        <h2 className='card-title'>CFO</h2>
                        <h2 className='card-name'>Jackson Shadowens</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='core-placeholder'>
                            <img src={braden} alt="Image Not Available" id="core-image"/>
                        </div>
                        <h2 className='card-title'>CRO</h2>
                        <h2 className='card-name'>Braden Burgess</h2>
                    </div>
                </div>
            </div>
            <div id='sub-teams'>
                <h1 className='leader-header'>Sub-Team Leaders</h1>
                <div id='sub-teams-leaders'>
                    <div className='team-lead-card'>
                        <div className='sub-placeholder'>
                            <img src={stephen} alt="Image Not Available" id="sub-image"/>
                        </div>
                        <h2 className='card-title'>Project Manager</h2>
                        <h2 className='card-name'>Stephen Malamisuro</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='sub-placeholder'>
                            <img src={dru} alt="Image Not Available" id="sub-image"/>
                        </div>
                        <h2 className='card-title'>Controls & Wiring<br />Team Lead</h2>
                        <h2 className='card-name'>Dru Frazier</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='sub-placeholder'>
                            <img src={justin} alt="Image Not Available" id="sub-image"/>
                        </div>
                        <h2 className='card-title'>Machining<br />Team Lead</h2>
                        <h2 className='card-name'>Justin Pierce</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='sub-placeholder'>
                            <img src={anuj} alt="Image Not Available" id="sub-image"/>
                        </div>
                        <h2 className='card-title'>CAD Team<br />Co-Lead</h2>
                        <h2 className='card-name'>Anuj Timishina</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='lower-sub-placeholder'>
                            <img src={nathan} alt="Image Not Available" id="sub-image"/>
                        </div>
                        <h2 className='card-title'>CAD Team<br />Co-Lead</h2>
                        <h2 className='card-name'>Nathan Karrick</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='lower-sub-placeholder'>
                            <img src={bharat} alt="Image Not Available" id="sub-image"/>
                        </div>
                        <h2 className='card-title'>Programming<br />Team Lead</h2>
                        <h2 className='card-name'>Bharat Khadka</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLeaders;