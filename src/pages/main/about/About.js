import React from 'react'
import './about.css';
import ImageSlider from "../../../components/image-slider/ImageSlider"

import one from './media/one.png';
import two from './media/two.png';
import three from './media/three.png';
import four from './media/four.png';

import logo from './media/respawnR_logo.png';

function About() {
  return (
    <>
        <body className='about-body'>
              <div className='image-slider-container'>
              <ImageSlider delay={4000}
                images={[
                  <img src={one} alt="one" />,
                  <img src={two} alt="two" />,
                  <img src={three} alt="three" />,
                  <img src={four} alt="four" />
                ]} />
            </div>
            <div className="logo-container" id='logo-container'>
                <img src={logo} alt="Respawn Robotics Logo" id='logos'></img>
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
                    <div className='core-text-container' id='core-display'>
                        <p className='larger-text' id='core-text'>
                            Core 7 Officers
                        </p>
                    </div>
                    <div className='core-container' id='core-display'>
                        <div className='ceo-picture' id='picture-container'>

                        </div>
                        <div className='coo-container' id='picture-container'>

                        </div>
                        <div className='cio-container' id='picture-container'>

                        </div>
                        <div className='cto-container' id='picture-container'>

                        </div>
                        <div className='cfo-container' id='picture-container'>

                        </div>
                        <div className='cmo-container' id='picture-container'>

                        </div>
                        <div className='cro-container' id='picture-container'>

                        </div>
                    </div>
            </div>
            <div className='container5' id='container'>
                <p className='subteam-text' id='larger-text'>
                    Sub-Team Leads
                </p>
                <div className='subteamLead-container' id='secondaryContainer'>
                    <div className='projectManager-picture' id='picture-container'>

                    </div>
                    <div className='controlsAndWiring-container' id='picture-container'>

                    </div>
                    <div className='programming-container' id='picture-container'>

                    </div>
                    <div className='cad-container1' id='picture-container'>

                    </div>
                    <div className='machining-container' id='picture-container'>

                    </div>
                    <div className='cad-container2' id='picture-container'>

                    </div>
                </div>
            </div>
        </body>
    </>
  );
}

export default About;