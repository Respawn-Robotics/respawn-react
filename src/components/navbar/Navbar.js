import './navbar.css';
import logo from '../../media/respawn_logo.png';
import paths from '../../paths.json';

function Navbar() {
    return (
        <nav className='navbar'>
            <a href={paths.main['home']} id='navbar-logo'>
                <img src={logo} id='nav-image' alt='Home' />
            </a>
            <a href={paths.main['about']} className='navbar-section nav-link'>ABOUT</a>
            <a href={paths.main['first']} className='navbar-section nav-link'><i>FIRST</i></a>
            <a href={paths.main['sponsors']} className='navbar-section nav-link'>SPONSORS</a>
            <a href={paths.main['outreach']} className='navbar-section nav-link'>OUTREACH</a>
            <div className='navbar-section dropdown'>
                <p href={paths.recon['dashboard']} className='nav-link'>PILLARS OF RESPAWN</p>
                <div className='dropdown-content'>
                    <a href={paths.recon['dashboard']} className='dropdown-link'>REWIND</a>
                    <a href={paths.recon['dashboard']} className='dropdown-link'>RECON</a>
                    <a href={paths.recon['dashboard']} className='dropdown-link'>REFLECT</a>
                    <a href={paths.recon['dashboard']} className='dropdown-link'>REPOSITORY</a>
                    <a href={paths.recon['dashboard']} className='dropdown-link'>REACH</a>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;
