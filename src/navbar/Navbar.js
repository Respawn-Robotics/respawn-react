import './Navbar.css';
import logo from "../media/respawn_logo.png";
import paths from "../paths.json";

function Navbar() {
    return (
        <nav className="navbar">
            <div id='navbar-logo'>
                <a href={paths['home']}>
                    <img src={logo} id="nav-image" alt='Home' />
                </a>
            </div>
            <div className="navbar-section">
                <a href={paths.main['about']} className="nav-link">ABOUT</a>
            </div>
            <div className="navbar-section">
                <a href={paths.main['first']} className="nav-link"><i>FIRST</i></a>
            </div>
            <div className="navbar-section">
                <a href={paths.main['sponsors']} className="nav-link">SPONSORS</a>
            </div>
            <div className="navbar-section">
                <a href='/' className="nav-link">Pillars of Respawn</a>
            </div>
        </nav>
    );
}


export default Navbar;
