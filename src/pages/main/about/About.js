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
                <h1 className='about-us-text'>Based in Hamilton, Ohio, We are <i>FIRST</i> Robotics Team 325, Respawn Robotics</h1>
                <p className='about-us-text'>
                    Butler Tech is a career technical school located in Hamilton Ohio that draws
                    students from 13 surrounding school districts. Our program attracts the best and brightest career-minded 
                    in the region. The students in mech program participate FIRST in <i>FIRST</i> Robotics Competition as Team 325, 
                    Respawn Robotics. Students who choose to take this program will have the opportunity to earn a associates degree 
                    in Electro-mechanical Engineering Technologies while in high school. 
                    Throughout their junior and senior years they earn at least 62 semester hours for their degree. Students 
                    have the option to pursue college and career pathways with the skills and knowledge they acquired.
                </p>
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