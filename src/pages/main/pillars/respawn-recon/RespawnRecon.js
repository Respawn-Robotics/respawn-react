import React from "react";
import './respawn-recon.css';

import ReconUI from './media/recon-ui.png'

function RespawnRecon() {
    return <>
        <h1 id='recon-intro'>Our World Class Scouting App: <a href='/recon'>Respawn Recon</a></h1>
        <div className="recon-feature-container">
            <div className="feature-image">
                <img src={ReconUI} />
            </div>
            <div className="feature-text">
                <p>Intuitive and visually appealing scouting form</p>
                <ul>
                    <li>Record robots starting positions and autonomous paths</li>
                    <li>Click on an interactive grid to record where a robot scored</li>
                    <li>Provide additional important information about robot to team</li>
                </ul>
            </div>
        </div>
        <div className="recon-feature-container">

        </div>
        <div className="recon-feature-container">
            <div className="recon-feature-container">
                <div className="feature-image">
                    <img src={ReconUI} />
                </div>
                <div className="feature-text">
                    <p>Hosting of all scouting data online in the cloud</p>
                    <ul>
                        <li>View all of your team's uploaded scouts in one place</li>
                        <li>Fast searching for individual robot data</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="recon-feature-container">

        </div>
    </>
}

export default RespawnRecon;