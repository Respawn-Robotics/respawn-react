import './sponsors.css';
import React from 'react';


function Sponsors() {
    return (
    <>
        <head>
        </head>
        <body className = 'sponsors-body'>
            <div className='sponsors-section' id='container1'>
                <p className='larger-text'>
                Respawn Robotics Sponsors
                </p>
            </div>
            <div className='sponsors-section' id='container2'>
                <h2 className='why-sponsor'>
                Why Sponsor?
                </h2>
                <p className='smaller-text'>
                Sponsoring the team helps us change the lives of our students. Your money will go toward operating costs, competition entry fees, 
                travel costs, and much more.
                </p>
            </div>
            <div className ='sponsors-section' id='container1'>
                <h2 className='larger-text'>
                    Platinum ($10,000+)
                </h2>
            </div>
            <div className='sponsors-section' id='container2'>
            </div>
            <div className='sponsors-section' id='container1'>
                <p className='larger-text'>
                    Silver ($5000+)
                </p>
            </div>
            <div className='sponsors-section' id='container2'>
            </div>
            <div className='sponsors-section' id='container1'>
                <p className='larger-text'>
                    Bronze ($2500+)
                </p>
            </div>
            <div className='sponsors-section' id='container2'>
            </div>
            <div className='sponsors-section' id='container1'>
                <p className='larger-text'>
                    Base (Any Amount)
                </p>
            </div>
            <div className='sponsors-section' id='container2'>
            </div>
        </body>
    </>
  );
}

export default Sponsors;