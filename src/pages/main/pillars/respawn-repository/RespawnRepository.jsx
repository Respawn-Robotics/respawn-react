import React from "react";
import './respawn-repository.css';

import SolidworksLogo from './media/solidworks-logo.webp';
import _3DExperienceLogo from './media/3dexperience-logo.png';

function Repository() {
    return <>
        <div id='repository-intro'>
            <h1>Respawn Repository</h1>
        </div>
        <div className='column'>
            <div className='repository-container'>
                <div className='image-content'>
                    <img src={SolidworksLogo} />
                </div>
                <div className='text-content'>
                    We use Solidworks to model all of our parts and assemblies. Students
                    have the oppurtunity to earn the CSWA, an industry-recognized certification
                    while they are in the program.
                </div>
            </div>
            <div className='repository-container'>
                <div className='image-content'>
                    <img src={_3DExperienceLogo} />
                </div>
                <div className='text-content'>
                    We use 3DExperience to store all of our models and assemblies on the cloud.
                    It integrates seamlessly with Solidworks and increases productivity in the
                    CAD Department.
                </div>
            </div>
        </div>
    </>
}

export default Repository;