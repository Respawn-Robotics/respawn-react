import { useEffect, useState } from "react"
const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
     const chooseSlideStyle = () => {
        if(slides[currentIndex] != null) {
            return slides[currentIndex].url
        } else{
            setCurrentIndex(slides[0])
        }
    }

    const sliderStyles = {
        height: "100%",
        position: "relative",
    };

    const slideStyles = {
        width: "100%",
        height: "100%",
        borderradius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${chooseSlideStyle()})`,
    };
    const leftArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '60px',
        color: '#fff',
        zIndex: 1,
        cursor: "pointer",
    };

    const rightArrowStyle = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '60px',
        color: '#fff',
        zIndex: 1,
        cursor: "pointer",
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length -1 : currentIndex -1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    // (useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setCurrentIndex((currentIndex) => {
    //             console.log(slides[currentIndex])
    //             return currentIndex + 1;
    //         });
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []));

    return (
    <div style = {sliderStyles}>
        <div style={leftArrowStyle} onClick = {goToPrevious}> ❰ </div>
        <div style={rightArrowStyle} onClick ={goToNext}> ❱ </div>
        <div style={slideStyles}></div>
    </div>
    );

};

export default ImageSlider