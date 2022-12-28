import React from 'react';
import './home.css';
import ImageSlider from '../../../components/image-slider/ImageSlider';
import WhatWeDo from '../../../components/what-we-do/WhatWeDo';

//Pictures
import img1 from './media/picture1.jpg';
import img2 from './media/picture2.jpg';
import img3 from './media/picture3.jpg';
import img4 from './media/picture4.jpg';
import img5 from './media/picture5.jpg';
import img6 from './media/picture6.jpg';
import img7 from './media/picture7.jpg';

//Logos
import butlertech_logo from './media/butlertech_logo.png';
import colerain_logo from './media/colerain_logo.png';
import edgewood_logo from './media/edgewood_logo.png';
import fairfield_logo from './media/fairfield_logo.png';
import hamilton_logo from './media/hamilton_logo.png';
import lakotawest_logo from './media/lakotawest_logo.png';
import lakotaeast_logo from './media/lakotaeast_logo.png';
import madison_logo from './media/madison_logo.png';
import middletown_logo from './media/middletown_logo.png';
import monroe_logo from './media/monroe_logo.png';
import newmiami_logo from './media/newmiami_logo.png';
import ross_logo from './media/ross_logo.png';
import talawanda_logo from './media/talawanda_logo.png';
import northwest_logo from './media/northwest_logo.png';

//Misc
import sponsorship_packet from '../../../media/respawn-robotics-sponsorship.pdf';


function Home() {
  return (
    <>
      <div className='image-slider-container'>
        <ImageSlider imageStyle='cover' delay={4000}>
          <img src={img1} alt='Respawn Robotics at 2022 Rocket City Regional' />
          <img src={img2} alt='Tempest' />
          <img src={img3} alt='Our Human Player After Sinking a Shot' />
          <img src={img4} alt='Respawn Robotics Showcasing Tempest at Wildwood Elementary' />
          <img src={img5} alt='Talking to the Kids About Mechatronics as a Career Field' />
          <img src={img6} alt="Team 325's Pit at 2022 Greater Pittsburgh Regional" />
          <img src={img7} alt='Students Learning from Mentor' />
        </ImageSlider>
      </div>
      <div className='join-program'>
        <h2 className='joinUs-text' id='joinUs-title'>
          Join Our Program
        </h2>
        <p className='joinUs-text' id='joinUs-sentence'>
          Learn new skills like machining, programming, CAD & design, and more!
        </p>
        <div className='center-horizontal'>
          <div className='moreinfo-button'>
            <a href={"https://www.butlertech.org/program/mechatronics/"} className='moreinfo-text'>More Info</a>
          </div>
        </div>
      </div>
      <div className='center-horizontal'>
        <WhatWeDo />
      </div>
      <div className='associate-schools'>
        <h2 className='associateText'>
          Associate School Districts
        </h2>
      </div>
      <div className='center-horizontal'>
        <div className='school-slider-container'>
          <ImageSlider imageStyle='contain' delay={6000}>
            <img src={butlertech_logo} alt="Butler Tech" />
            <img src={colerain_logo} alt="Colerain High School" />
            <img src={edgewood_logo} alt="Edgewood High School" />
            <img src={fairfield_logo} alt="Fairfield High School" />
            <img src={hamilton_logo} alt="Hamilton High School" />
            <img src={lakotaeast_logo} alt="Lakota East High School" />
            <img src={lakotawest_logo} alt="Lakota West High School" />
            <img src={madison_logo} alt="Madison High School" />
            <img src={middletown_logo} alt="Middletown High School" />
            <img src={monroe_logo} alt="Monroe High School" />
            <img src={newmiami_logo} alt="New Miami High School" />
            <img src={northwest_logo} alt="Northwest High School" />
            <img src={ross_logo} alt="Ross High School" />
            <img src={talawanda_logo} alt="Talawanda High School" />
          </ImageSlider>
        </div>
      </div>
      <div className='column'>
        <div className='our-mission-container'>
          <h1 className='our-mission'>Our Mission</h1>
          <hr className='heading-underline' />
          <p className='our-mission'>
            To inspire young students to be science and technology leaders by
            getting them excited about engineering and technology skills. We
            promote innovation, learning, and foster well-rounded life
            capabilities including self-confidence, communication, and leadership.
            Immersion in these experiences will help students pursue careers that
            our community needs in order to keep up with the fast-paced global
            evolution of cutting-edge technologies.
          </p>
        </div>
        <div className='sponsorpacket-container'>
          <p className='sponsorship-text'>Download our <a className='sponsorship-text' target='blank' href={sponsorship_packet}>Sponsorship Packet</a></p>
          <embed type="application/pdf" id='sponsorship-packet' title='Sponsorship Packet' src={sponsorship_packet} />
        </div>
      </div>
    </>
  );
}

export default Home;
