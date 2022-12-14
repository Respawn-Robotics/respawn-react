import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import './image-slider.css'

Modal.setAppElement('#root');

function ImageSlider(props) {

    const [index, setIndex] = useState(0);
    const [incId, setIncId] = useState(0);

    const [openModal, setOpenModal] = useState(false);
    
    const images = props.images;

    const incIndex = (num) => {
        setIndex((index) => (((index + num) % images.length) + images.length) % images.length);
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
        startInc();
    };

    useEffect(() => {
        startInc();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const popupModal = (x) => {
        setOpenModal(true);
    }

    return (
        <>
            <div className='image-slider' style={{background : images[index]}}>
                <button className='media-nav' onClick={() => { incIndex(-1); pauseInc(); }}>&#x276E;</button>
                <div id='image-container'>
                    {images.map((image, x) => {
                        return(<img src={image.props.src} alt={image.props.alt} style={{display : x === index ? 'block' : 'none'}} onClick={() => popupModal} className={image.props.className} id='image-slider-img' />)
                    })}
                </div>
                <button className='media-nav' onClick={() => { incIndex(1); pauseInc(); }}>&#x276F;</button>
            </div>
            <Modal />
        </>
    );
}

export default ImageSlider;