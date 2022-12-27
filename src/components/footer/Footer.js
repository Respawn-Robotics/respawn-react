import './footer.css';
import logo from '../../media/respawn_icon.png';
import BlueAlliance from './media/blue-alliance.png';
import Instagram from './media/instagram.png';
import Facebook from './media/facebook.png';
import Youtube from './media/youtube.png';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-info'>
                <img src={logo} alt='respawn_icon' id='foot-logo' />
                <div className='info-text'>
                    <h3 className='info-heading'>Respawn Robotics</h3>
                    <hr id='info-underline' />
                    <a href='mailto:Info@respawnrobotics.com' className='info-email'>Info@respawnrobotics.com</a>
                    <address className='info-address'>
                        3603 Hamilton Middletown Rd. <br />
                        West Chester Township, Ohio 45011
                    </address>
                </div>
            </div>
            <div className='footer-socials'>
                <h3 className='socials-heading'>Follow Us</h3>
                <hr id='socials-underline' />
                <div className='socials-links'>
                    <a href='https://www.thebluealliance.com/team/325' target='_blank' rel="noreferrer">
                        <img src={BlueAlliance} alt='blue_alliance' id='socials-blue-alliance' />
                    </a>
                    <a href='https://www.instagram.com/respawnrobotics' target='_blank' rel="noreferrer">
                        <img src={Instagram} alt='instagram' id='socials-instagram' />
                    </a>
                    <a href='https://www.facebook.com/RespawnRobotics' target='_blank' rel="noreferrer">
                        <img src={Facebook} alt='facebook' id='socials-facebook' />
                    </a>
                    <a href='https://www.youtube.com/@respawnrobotics3252' target='_blank' rel="noreferrer">
                        <img src={Youtube} alt='youtube' id='socials-youtube' />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;