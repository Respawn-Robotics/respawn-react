import React, { useState } from 'react';
import './about.css';
import Modal from '../../../components/modal/Modal';
import StudentLeaders from '../../../components/student-leaders/StudentLeaders';
import Mentors from '../../../components/mentors/Mentors';

import img1 from './media/pic1.jpg';





function About() {

    const [modalState, setModalState] = useState(false);

    return (
        <>
            <div className='image-container' onClick={() => setModalState(true)} />
            <Modal caption='Respawn Robotics Team Photo' state={modalState} onClose={() => setModalState(false)}>
                <img src={img1} alt='Respawn Robotics Team Photo' /> {/* eslint-disable-line jsx-a11y/img-redundant-alt */}
            </Modal>
            <div className='about-us-text-container'>
                <h1 className='about-us-text'>Based in Hamilton, Ohio, We are FIRST Robotics Team 325, Respawn Robotics</h1>
                <p className='about-us-text'>Butler Tech is a technical school located in Hamilton Ohio that pulls 
                students from 12 surrounding school districts, acquiring the best and brightest. The Mechatronics 
                lab participates in FIRST Robotics as Team 325, Respawn Robotics. Students who choose to take this 
                program will have the opportunity to get a associates degree in Electromechanical Engineering Technologies 
                out of high school while also getting trained in Solidworks. Throughout their junior and senior years they 
                accumulate 60 total hours of college credit that they can use toward their future educational careers or join 
                the work force with the skills and knowledge they acquired.</p>
            </div>
            <div id='mentor-container'>
                <Mentors />
            </div>
            <div id='student-leaders-container'>
                <StudentLeaders />
            </div>
        </>
    );
}

export default About;