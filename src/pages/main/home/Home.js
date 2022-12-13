import React from 'react';
import ImageSlider from '../../../components/image-slider/ImageSlider';
import WhatWeDo from '../../../components/what-we-do/WhatWeDo';
import './home.css';

function Home() {
  return (
    <>
      <div className='image-slider-container'>
        {/* <ImageSlider /> */}
      </div>
      <div className='center'>
        <WhatWeDo />
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
      </div>
    </>
  );
}

export default Home;
