import React from "react";
import './respawn-react.css';
import ReactLogo from './media/react-logo.svg'
import FirebaseLogo from './media/firebase-logo.svg'

function RespawnReact() {
    return <>
        <div id='react-intro'>
            <h1>Respawn React</h1>
            <p>
                FRC Team 325: Respawn Robotics's official website was made using
                the <a href='https://reactjs.org'>ReactJS</a> frontend framework
                backed and hosted by <a href='https://firebase.google.com/docs/build'>Firebase</a>.
                All of the source code for our Respawn React including all the apps
                integrated into our website can be found on our <a href='https://github.com/Respawn-Robotics/respawn-react'>GitHub</a>.
            </p>
        </div>
        <div className='react-container'>
            <div className='image-content'>
                <img src={ReactLogo} />
            </div>
            <div className='text-content'>
                <p>
                    We use ReactJS because of its intuitive development process, reusability with
                    component based design, and the extensive tooling for it.
                </p>
            </div>
        </div>
        <div className='react-container'>
            <div className='image-content'>
                <img src={FirebaseLogo} />
            </div>
            <div className='text-content'>
                <p>
                    We use Firebase because of its easy-to-use database, efforless hosting, and
                    affordable rates for uptime.
                </p>
            </div>
        </div>
    </>
}

export default RespawnReact;