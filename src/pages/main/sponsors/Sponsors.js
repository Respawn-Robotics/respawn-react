import React from 'react';
import './sponsors.css';

import alliance_logo from './media/alliance_robotics_logo.png';
import hydrotech_logo from './media/hydrotech_logo.png';
import belcan_logo from './media/belcan_logo.svg';
import eightyacres_logo from './media/eightyacres_logo.png';
import polezero_logo from './media/polezero_logo.png';
import yaskawa_logo from './media/yaskawa_logo.png';
import pg_logo from './media/pg_logo.png';
import bilstein_logo from './media/bilstein_logo.png';
import baxter_logo from './media/baxter_logo.png';
import genehaas_logo from './media/genehaas_logo.png';




function Sponsors() {
    return (
        <div id='sponsors-body'>
            <div id='sponsors-section'>
                <p className='title-text'>
                    Respawn Robotics Sponsors
                </p>
            </div>
            <div id='why-sponsor-section'>
                <h2 id='why-sponsor'>
                    Why Sponsor?
                </h2>
                <p className='smaller-text'>
                    Sponsoring the team helps us change the lives of our students. Your money will go toward operating costs, competition entry fees,
                    travel costs, and much more.
                </p>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Platinum ($10,000+)
                </h2>
                <div className='sponsors-logos'>
                    <img src={hydrotech_logo} alt='Hydrotech' className='solo-logo' />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Gold ($5000+)
                </h2>
                <div className='sponsors-logos'>
                    <img src={bilstein_logo} alt='Bilstein' className='solo-logo' />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Silver ($2500+)
                </h2>
                <div className='sponsors-logos'>
                    <img src={genehaas_logo} alt="Gene Haas Foundation" className='logo' />
                    <img src={polezero_logo} alt="Pole Zero" className='logo' />
                    <img src={belcan_logo} alt="Belcan Engineering" className='logo' />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Bronze ($1000+)
                </h2>
                <div className='sponsors-logos'>
                    <img src={baxter_logo} alt='Baxter International' className='solo-logo' />
                </div>
            </div>

            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Base (Any Amount)
                </h2>
                <div className='sponsors-logos'>
                    <img src={pg_logo} alt='P&G CORE' className='bottom-logos' />
                    <img src={eightyacres_logo} alt="80 Acres Farms" className='bottom-logos' />
                    <img src={yaskawa_logo} alt="Yaskawa" className='bottom-logos' />
                </div>
            </div>
        </div>
    );
}

export default Sponsors;