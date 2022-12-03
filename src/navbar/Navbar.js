import './Navbar.css';
import {ReactComponent as Logo} from "../media/respawn_logo.svg"

function Navbar() {
    return (
        <nav class="navbar">
            <div class="navbar-section" id="navbar-logo">
                <a href="/">
                    <Logo />
                </a>
            </div>
            <div class="navbar-section" id="navbar-about">
                <a href="/" class="nav-link">ABOUT</a>
            </div>
            <div class="navbar-section" id="navbar-first">
                <a href="/" class="nav-link"><i>FIRST</i></a>
            </div>
            <div class="navbar-section" id="navbar-sponsors">
                <a href="/" class="nav-link">SPONSORS</a>
            </div>
            <div class="navbar-section" id="navbar-contact">
                <a href="/" class="nav-link">CONTACT</a>
            </div>
        </nav>
    );
}

export default Navbar;
