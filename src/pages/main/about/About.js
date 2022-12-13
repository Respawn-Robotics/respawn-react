import React from 'react'
import './about.css';
import ImageSlider from "../../../components/image-slider/ImageSlider"

import one from './media/one.png';
import two from './media/two.png';
import three from './media/three.png';
import four from './media/four.png';

function About() {

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
      <div className='teamPhoto'>
        <p className='larger-text centered'>
          Team Photo
        </p>
      </div>
      <div className='respawnInfo'>
      </div>
    </>
  );
}
export default About;