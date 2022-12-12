import React from 'react';
import './about.css';

function About() {
  return (
    <>
        <body className='about-body'>
            <div className='photo-container1' id='container'>
                <p className='replacement-text'>
                    (Team Photo)
                </p>
            </div>
            <div className='container1' id='container'>
                <p className='initial-text'>
                    FIRST Robotics Team 325:<br></br> Respawn Robotics<br></br> is based in Hamilton, Ohio.
                </p>
            </div>
            <div className='container2' id='container'>
                <p className='secondary-text' id='regular-text'>
                Butler Tech is a technical school located in Hamilton Ohio that pulls students from 12 surrounding school districts, acquiring the best and brightest. The Mechatronics lab participates in FIRST Robotics as Team 325, Respawn Robotics. Students who choose to take this program will have the opportunity to get a associates degree in Electromechanical Engineering Technologies out of high school while also getting trained in Solidworks. Throughout their junior and senior years they accumulate 60 total hours of college credit that they can use toward their future educational careers or join the work force with the skills and knowledge they acquired.
                </p>
            </div>
            <div className='container3' id='container'>
                <p className='leader-text' id='larger-text'>
                    Student Leaders
                </p>
            </div>
            <div className='container4' id='container'>
                <p className='core-text' id='larger-text'>
                    Core 7 Officers
                </p>
            </div>
            <div className='container5' id='container'>
                <p className='subteam-text' id='larger-text'>
                    Sub-Team Leads
                </p>
            </div>
        </body>
    </>
  );
}

export default About;