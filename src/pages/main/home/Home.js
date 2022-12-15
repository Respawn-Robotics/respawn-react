import React from 'react';
import ImageSlider from '../../../components/image-slider/ImageSlider';
import WhatWeDo from '../../../components/what-we-do/WhatWeDo';

//Images
import img1 from './media/img1.jpg';
import img2 from './media/img2.jpg';
import img3 from './media/img3.jpg';
import img4 from './media/img4.jpg';
import img5 from './media/img5.jpg';
import img6 from './media/img6.jpg';
import img7 from './media/img7.jpg';

import './home.css';

function Home() {
  return (
    <>
      <div className='image-slider-container'>
        <ImageSlider delay={500000} images={[
          <img src={img1} alt='img1' />,
          <img src={img2} alt='img2' />,
          <img src={img3} alt='img3' />,
          <img src={img4} alt='img4' />,
          <img src={img5} alt='img5' />,
          <img src={img6} alt='img6' />,
          <img src={img7} alt='img7' />
        ]} />
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
