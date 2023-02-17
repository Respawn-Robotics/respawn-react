import React from "react";
import './respawn-recon.css';

import ReconUI from './media/recon-ui.png';
import TeamsUI from './media/teams-ui.png';
import OfflineJSON from './media/offline-json.png';
import ManageUI from './media/manage-team-ui.png';

function RespawnRecon() {
    return <>
        <h1 id='recon-intro'>Our World Class Scouting App: <a href='/recon'>Respawn Recon</a></h1>
        <h2 id='recon-intro'>View it <a href='/recon'>here</a>.</h2>
        <div className="recon-feature-container">
            <div className="feature-image">
                <img className="vertical-image" src={ReconUI} />
            </div>
            <div className="feature-text">
                <p>Intuitive and visually appealing scouting form</p>
                <ul>
                    <o>
                        <li>Record robots starting positions and autonomous paths</li>
                        <li>Click on an interactive grid to record where a robot scored</li>
                        <li>Provide additional important information about robot to team</li>
                    </o>
                </ul>
            </div>
        </div>
        <div className="recon-feature-container">
            <div className="feature-text">
                <p>Capabilities for both online and offline scouting</p>
                <ul>
                    <o>
                        <li>Ability to upload instantly if internet is available</li>
                        <li>Download JSON file containing scout data and upload to database once internet is available</li>
                    </o>
                </ul>
            </div>
            <div className="feature-image">
                <img className="vertical-image" src={OfflineJSON} />
            </div>
        </div>
        <div className="recon-feature-container">
            <div className="feature-image">
                <img className="horizontal-image" src={TeamsUI} />
            </div>
            <div className="feature-text">
                <p>Hosting of all scouting data online in the cloud</p>
                <ul>
                    <o>
                        <li>View all of your team's uploaded scouts in one place</li>
                        <li>Fast searching for individual robot data</li>
                    </o>
                </ul>
            </div>
        </div>
        <div className="recon-feature-container">
            <div className="feature-text">
                <p>Account management system for creating and deleting scouts</p>
                <ul>
                    <o>
                        <li>Create an account and scouting team</li>
                        <li>Invite users to team and promote / demote them to admins</li>
                        <li>Review scouts and delete bad data</li>
                    </o>
                </ul>
            </div>
            <div className="feature-image">
                <img className="horizontal-image" src={ManageUI} />
            </div>
        </div>
    </>
}

export default RespawnRecon;