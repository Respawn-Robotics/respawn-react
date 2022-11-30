import '../App.css';
import {ReactComponent as Logo} from "../media/respawn_logo.svg"

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-section" id="navbar-logo">
                <a href="/">
                    <Logo />
                </a>
            </div>
            <div className="navbar-section" id="navbar-about">
                <a href="/" className="nav-link">ABOUT</a>
            </div>
            <div className="navbar-section" id="navbar-first">
                <a href="/" className="nav-link"><i>FIRST</i></a>
            </div>
            <div className="navbar-section" id="navbar-sponsors">
                <a href="/" className="nav-link">SPONSORS</a>
            </div>
            <div className="navbar-section" id="navbar-contact">
                <a href="/" className="nav-link">CONTACT</a>
            </div>
        </nav>
    );
}

export default Navbar;
