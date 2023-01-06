import React from 'react';
import './outreach.css';
import ImageSlider from '../../../components/image-slider/ImageSlider';
import taylor from '../../../components/student-leaders/media/taylor.jpg';
import mathias from '../../../components/student-leaders/media/mathias.jpg';

function Outreach() {
    return(
        <>
            <div className='slider-container'>
                <ImageSlider imageStyle='cover' delay={4000}>
                    <img src={mathias} alt="mathias" />
                    <img src={taylor} alt='taylor' />
                </ImageSlider>
            </div>
            <div className='intro-title'>
                <h1 className='title-text'>Respawn Robotics is deeply rooted in its community</h1>
            </div>
            <div className='intro-text'>
                <p className='regular-text'>Respawn Robotics participates in a variety of outreach activities that benefit the community, and inspire young leaders to gain an appreciation and interest in STEM fields. Our largest goal is to educate others with knowledge that is needed in the modern world.</p>
            </div>
            <div className='revolution'>
                <h2 className='leftSmaller-title-text'>An Education Revolution</h2>
                <hr className='separator' />
                <p className='leftRegular-text'>We are honored to have the opportunity to host over 3000 8th graders in our lab throughout the school year. With a goal to recruit students to our degree education program here at Butler Tech, that enables them to gain extensive knowledge in engineering and hands on experience.</p>
                <div className='image-placeholder' />
            </div>
            <div className='inspiring'>
                <h2 className='rightSmaller-title-text'>Inspiring the Next Generation</h2>
            </div>

        </>
    );
    }

export default Outreach;