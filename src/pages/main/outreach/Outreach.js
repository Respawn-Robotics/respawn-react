import React from 'react';
import './outreach.css';
import ImageSlider from '../../../components/image-slider/ImageSlider';
import reach11 from "./media/reach 11.jpg";
import reach5 from "./media/reach 5.jpg";
import reach6 from "./media/reach 6.jpg";
import reach7 from "./media/reach7.jpg";
import reach8 from "./media/reach8.jpg";
import reach10 from "./media/reach10.jpg";


function Outreach() {
    return(
        <>
            <div className='slider-container'>
                <ImageSlider imageStyle='cover' delay={4000}>
                    <img src={reach6} alt="Respawn Robotics Outreach" />
                    <img src={reach7} alt="Respawn Robotics Outreach" />
                    <img src={reach10} alt="Respawn Robotics Outreach" />
                    <img src={reach8} alt="Respawn Robotics Outreach" />
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
                <hr className='leftSeparator' />
                <p className='leftRegular-text'>We are honored to have the opportunity to host over 3000 8th graders in our lab throughout the school year. With a goal to recruit students to our degree education program here at Butler Tech, that enables them to gain extensive knowledge in engineering and hands on experience.</p>
                <div className='topImage-placeholder'>
                    <img src={reach5} alt="Respawn Robotics Outreach" className="right-lower-image" />
                </div>
            </div>
            <div className='inspiring'>
                <div className='bottomImage-placeholder'>
                    <img src={reach11} alt="Respawn Robotics Outreach"  className='left-lower-image'/>
                </div>
                <h2 className='rightSmaller-title-text'>Inspiring the Next Generation</h2>
                <hr className='rightSeparator' />
                <p className='rightRegular-text'>We are proud to introduce our new program that takes FIRST not only to middle schools, but to the elementary schools! Our first event was at Wildwood Elemenatry School where we had the opportunity to inspire the younger generation and get them integrated into STEM and FIRST. We were able to reach over 500 students with one event.</p>
            </div>
        </>
    );
    }

export default Outreach;