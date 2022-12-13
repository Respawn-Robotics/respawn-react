import React, { useEffect, useState } from 'react';
import './image-slider.css'

function ImageSlider(props) {

    const [index, setIndex] = useState(0);
    const [incId, setIncId] = useState(0);

    const images = props.images;

    const incIndex = (num) => {
        setIndex((index) => (index + num) % images.length);
    };

    const startInc = () => {
        setIncId(
            setInterval(() => {
                incIndex(1);
            }, props.delay)
        );
    };

    const pauseInc = () => {
        clearInterval(incId);
        setTimeout(() => startInc(), props.delay);
    };

    useEffect(() => {
        startInc();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div className='image-slider'>
                <button className='media-nav' id='back-arrow' onClick={(event) => {incIndex(-1); pauseInc();}}>&#x2B9C;</button>
                {images[index]}
                <button className='media-nav' id='front-arrow' onClick={(event) => {incIndex(1); pauseInc();}}>&#x2B9E;</button>
            </div>
        </>
    );
}

export default ImageSlider;