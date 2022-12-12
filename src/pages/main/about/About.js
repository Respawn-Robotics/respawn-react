import React from 'react'
import './about.css';
import ImageSlider from "./ImageSlider.js"
const delay = "2000";
const slides = [
    {url: "http://localhost:3000/logo192.png", title: "Respawn"},
    {url: "http://localhost:3000/logo512.png", title: "Sand"},
    {url: "http://localhost:3000/respawn-logo.svg", title: "Desert"},
    {url: "http://localhost:3000/logo192.png", title: "Default"}
];

/* "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80"
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" */

function About() {


    const containerStyles = {
        width: "100%",
        height: "300px",
        margin: "0 auto",
    };
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);
    
    function resetTimeout(){
        if (timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    }
    
    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setCurrentIndex((prevIndex) =>
              prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [currentIndex]);

    return (
    <>
    <head></head>
        <body>
            <div style = {containerStyles}>
                <ImageSlider slides= {slides} />
            </div>
            <div className= 'teamPhoto'>
                <p className='larger-text centered'>
                Team Photo
                </p>
                </div>
            <div className='respawnInfo'>
                </div>
        </body>
    </>
  );
}
export default About;