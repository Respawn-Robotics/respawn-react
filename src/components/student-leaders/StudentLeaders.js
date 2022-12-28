import React from "react";
import './student-leaders.css';

function StudentLeaders() {
    return (
        <div id='student-leaders'>
            <div id='core-7'>
                <h1 className='leader-header'>Core 7 Officers</h1>
                <div id='core-7-leaders'>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CEO</h2>
                        <h2 className='card-name'>Nikhil Acharya</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>COO</h2>
                        <h2 className='card-name'>Mathias Yohannes</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CIO</h2>
                        <h2 className='card-name'>Taylor Buchanan</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CTO</h2>
                        <h2 className='card-name'>Dev Bhagat</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CMO</h2>
                        <h2 className='card-name'>Kylie Stewart</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CFO</h2>
                        <h2 className='card-name'>Jackson Shadowens</h2>
                    </div>
                    <div className='officer-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CRO</h2>
                        <h2 className='card-name'>Braden Burgess</h2>
                    </div>
                </div>
            </div>
            <div id='sub-teams'>
                <h1 className='leader-header'>Sub-Team Leaders</h1>
                <div id='sub-teams-leaders'>
                    <div className='team-lead-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>Project Manager</h2>
                        <h2 className='card-name'>Steven Malimasuro</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>Controls & Wiring<br />Team Lead</h2>
                        <h2 className='card-name'>Dru Frazier</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>Programming<br />Team Lead</h2>
                        <h2 className='card-name'>Bharat Khadka</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CAD Team<br />Co-Lead</h2>
                        <h2 className='card-name'>Anuj Timishina</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>CAD Team<br />Co-Lead</h2>
                        <h2 className='card-name'>Nathan Karrick</h2>
                    </div>
                    <div className='team-lead-card'>
                        <div className='image-placeholder' />
                        <h2 className='card-title'>Machining<br />Team Lead</h2>
                        <h2 className='card-name'>Justin Pierce</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLeaders;