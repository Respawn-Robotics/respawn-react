import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalContent } from '../modal/Modal';
import './image-slider.css'

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

    const popupModal = () => {
        setOpenModal((prev) => !prev);
    }

    return (
        <>
            <div className='image-slider' style={{background : images[index]}}>
                <button className='media-nav' onClick={() => { incIndex(-1); pauseInc(); }}>&#x276E;</button>
                <div id='image-container'>
                        {images.map((image, x) => {
                            return(
                                <>
                                    <Modal style={{display : x === index ? 'block' : 'none'}} onOpen={() => popupModal()}>
                                        <img src={image.props.src} alt={image.props.alt} style={{display : x === index ? 'block' : 'none'}} className={image.props.className} id='image-slider-img' />
                                    </Modal>
                                    {openModal && (
                                        <ModalContent onClose={() => popupModal()}>
                                                <img src={image.props.src} style={{display : x === index ? 'block' : 'none'}} alt={image.props.alt} id='image-popup' />
                                        </ModalContent>
                                    )}
                                
                                </>
                            )
                        })}
                </div>
                <button className='media-nav' onClick={() => { incIndex(1); pauseInc(); }}>&#x276F;</button>
            </div>
        </>
    );
}

export default ImageSlider;