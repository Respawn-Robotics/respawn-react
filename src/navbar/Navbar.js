import '../App.css';
import logo from "../media/respawn_logo.png";


function Navbar() {
    return (
        <nav className="navbar">
            <div id='navbar-logo'>
                <img src={logo} id="nav-image"/>
            </div>
            <div className="navbar-section">
                <a href="/" className="nav-link">ABOUT</a>
            </div>
            <div className="navbar-section">
                <a href="/" className="nav-link"><i>FIRST</i></a>
            </div>
            <div className="navbar-section">
                <a href="/" className="nav-link">SPONSORS</a>
            </div>
            <div className="navbar-section">
                <a href="/" className="nav-link">CONTACT</a>
            </div>
        </nav>
    );
}


export default Navbar;
