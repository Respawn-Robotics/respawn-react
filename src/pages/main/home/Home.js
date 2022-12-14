import React from 'react';
import ImageSlider from '../../../components/image-slider/ImageSlider';
import WhatWeDo from '../../../components/what-we-do/WhatWeDo';
import './home.css';
import one from '../../../pages/main/about/media/one.png';
import two from '../../../pages/main/about/media/two.png';
import three from '../../../pages/main/about/media/three.png';
import four from '../../../pages/main/about/media/four.png';
import logo from '../../../pages/main/about/media/respawnR_logo.png';
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


function Home() {
  return (
    <>
      <div className='image-slider-container'>
      <ImageSlider delay={4000}
                images={[
                  <img src={one} alt="one" />,
                  <img src={two} alt="two" />,
                  <img src={three} alt="three" />,
                  <img src={four} alt="four" />
                ]} />
      </div>
      <div className='join-program'>
              <h2 className='joinUs-text' id='joinUs-title'>
                Join Our Program
              </h2>
              <p className='joinUs-text' id='joinUs-sentence'>
                Learn new skills about Machining, Programming, CAD & Design, and more!
              </p>
              <div className='moreinfo-button'>
                <a href={"https://www.butlertech.org/program/mechatronics/"} className='moreinfo-text'><h2 className='moreinfo-text'>More Info</h2></a>
              </div>
      </div>
      <div className='center'>
        <WhatWeDo />
      </div>
      <div className='associate-schools'>
                <h2 className='associateText'>
                  Associate School Districts
                </h2>
      </div>
      <div className='school-slider-container'>
      <ImageSlider delay={6000}
                images={[
                 <img src={butlertech_logo} alt="Butler Tech" className='school-logo' />,
                 <img src={colerain_logo} alt="Colerain High School" className='school-logo' />,
                 <img src={edgewood_logo} alt="Edgewood High School" className='school-logo'/>,
                 <img src={fairfield_logo} alt="Fairfield High School" className='school-logo' />,
                 <img src={hamilton_logo} alt="Hamilton High School" className='school-logo' />,
                 <img src={lakotaeast_logo} alt="Lakota East High School" className='school-logo' />,
                 <img src={lakotawest_logo} alt="Lakota West High School" className='school-logo' />,
                 <img src={madison_logo} alt="Madison High School" className='school-logo'/>,
                 <img src={middletown_logo} alt="Middletown High School" className='school-logo'/>,
                 <img src={monroe_logo} alt="Monroe High School" className='school-logo' />,
                 <img src={newmiami_logo} alt="New Miami High School" className='school-logo'/>,
                 <img src={northwest_logo} alt="Northwest High School" className='school-logo'/>,
                 <img src={ross_logo} alt="Ross High School" className='school-logo'/>,
                 <img src={talawanda_logo} alt="Talawanda High School" className='school-logo'/>
                ]} id='image-slider'/>
      </div>
      <div className='container'>
        <div className='our-mission-container'>
          <h1 className='our-mission'>Our Mission</h1>
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
                <h2 className='sponsor-text'>
                  Click For Our<br></br>Sponsorship Packet
                </h2>
                <div className='sponsorpacket-linkimage'>
                  <img src={logo} alt="Sponsorship Packet" id='packet-image' />
                </div>
        </div>
      </div>
    </>
  );
}

export default Home;
