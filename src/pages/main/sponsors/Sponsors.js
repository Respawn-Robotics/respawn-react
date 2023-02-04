import React from 'react';
import './sponsors.css';

import alliance_logo from './media/alliance_robotics_logo.png';
import hydrotech_logo from './media/hydrotech_logo.png';
import belcan_logo from './media/belcan_logo.svg';
import eightyacres_logo from './media/eightyacres_logo.png';
import polezero_logo from './media/polezero_logo.png';
import yaskawa_logo from './media/yaskawa_logo.png';
import pg_logo from './media/pg_core_logo.png';
import bilstein_logo from './media/bilstein_logo.png';
import baxter_logo from './media/baxter_logo.png';
import genehaas_logo from './media/genehaas_logo.png';

import sponsorship_packet from '../../../media/respawn-robotics-sponsorship.pdf';

function Sponsors() {
    return (
        <div id='sponsors-body'>
            <p className='title-text'>
                Respawn Robotics Sponsors
            </p>
            <div id='sponsor-section'>
                <div id='why-sponsor-section'>
                    <h2 id='why-sponsor'>
                        Why Sponsor?
                    </h2>
                    <p className='smaller-text'>
                        Sponsoring the team helps us change the lives of our students.
                        Sponsorships will go toward operating costs, competition entry
                        fees, travel costs, and much more.
                    </p>
                </div>
                <div className='sponsorpacket-container'>
                    <p className='sponsorship-text'>Download our <a className='sponsorship-text' target='blank' href={sponsorship_packet}>Sponsorship Packet</a></p>
                    <embed type="application/pdf" id='sponsorship-packet' title='Sponsorship Packet' src={sponsorship_packet} />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Platinum
                </h2>
                <div className='sponsors-logos'>
                    <img src={hydrotech_logo} alt='Hydrotech' className='logo' id='hydrotech' />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Gold
                </h2>
                <div className='sponsors-logos'>
                    <img src={bilstein_logo} alt='Bilstein' className='logo' id='bilstein' />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Silver
                </h2>
                <div className='sponsors-logos'>
                    <img src={genehaas_logo} alt="Gene Haas Foundation" className='logo' id='genehaas' />
                    <img src={polezero_logo} alt="Pole Zero" className='logo' id='polezero' />
                    <img src={belcan_logo} alt="Belcan Engineering" className='logo' id='belcan' />
                </div>
            </div>
            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Bronze
                </h2>
                <div className='sponsors-logos'>
                    <img src={baxter_logo} alt='Baxter International' className='logo' id='baxter' />
                </div>
            </div>

            <div className='sponsors-section'>
                <h2 className='title-text'>
                    Base
                </h2>
                <div className='sponsors-logos'>
                    <img src={pg_logo} alt='P&G CORE' className='logo' id='pngcore' />
                    <img src={eightyacres_logo} alt="80 Acres Farms" className='logo' id='eightyacres' />
                    <img src={yaskawa_logo} alt="Yaskawa" className='logo' id='yaskawa' />
                </div>
            </div>
        </div>
    );
}

export default Sponsors;