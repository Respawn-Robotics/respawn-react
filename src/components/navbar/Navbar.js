import './navbar.css';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../../media/respawn_logo.png';
import paths from '../../paths.json';

function NavItem({ type, className, id, label, link, children }) {
    const [display, setDisplay] = useState(false);

    switch (type) {
        case 'link':
            return (
                <a className={className ? className : 'navbar-section nav-link'} id={id} href={link}>{children}</a>
            );

        case 'dropdown':
            return (
                <div className={className ? className : 'navbar-section dropdown'}>
                    <p className='nav-link'>{label}</p>
                    <div className='dropdown-content'>{children}</div>
                </div>
            );

        case 'menu':
            return (
                <>
                    <p className={className ? className : 'navbar-section'} onClick={() => { setDisplay((prev) => !prev); }}>{label} &#x276F;</p>
                    {display && (<div className='menu-content'>{children}</div>)}
                </>
            );

        case 'hamburger':
            return (
                <>
                    <button className={display ? 'change' : ''} id='navbar-hamburger' style={{ backgroundColor: display ? 'var(--respawn-dark-blue)' : 'transparent' }} onClick={() => { setDisplay((prev) => !prev); }}>
                        <div className='hamburger-icon-bar' id='icon-bar-1' />
                        <div className='hamburger-icon-bar' id='icon-bar-2' />
                        <div className='hamburger-icon-bar' id='icon-bar-3' />
                    </button>
                    {display && (<div className='hamburger-content'>{children}</div>)}
                </>
            );
        default:
            return (<></>);

    }
}

function Navbar({ type }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [isScrolled, setIsScrolled] = useState(false);
    const prevY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > prevY['current']);
            prevY.current = window.scrollY;
        };

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    switch (type) {
        case 'reflect':
            return (
                <nav className={'navbar' + (isScrolled ? ' scrolled' : '')}>
                    <NavItem className='nav-section' type='link' link={paths.main['home']} id='nav-image'>
                        <img src={logo} id='nav-image' alt='Home' />
                    </NavItem>

                    {width / height > 1 ? <>
                        <NavItem type='link' link={paths.reflect['record']}>RECORD</NavItem>
                        <NavItem type='link' link={paths.reflect['daily']}>DAILY</NavItem>
                        <NavItem type='link' link={paths.reflect['legacy']}>LEGACY</NavItem>
                    </> : <>
                        <NavItem type='hamburger'>
                            <NavItem type='link' className='hamburger-link' link={paths.reflect['record']}>RECORD</NavItem>
                            <NavItem type='link' className='hamburger-link' link={paths.reflect['daily']}>DAILY</NavItem>
                            <NavItem type='link' className='hamburger-link' link={paths.reflect['legacy']}>LEGACY</NavItem>
                        </NavItem>
                    </>}
                </nav>
            );

        case 'recon':
            return (
                <nav className={'navbar' + (isScrolled ? ' scrolled' : '')}>
                    <NavItem className='nav-section' type='link' link={paths.main['home']} id='nav-image'>
                        <img src={logo} id='nav-image' alt='Home' />
                    </NavItem>

                    {width / height > 1 ? <>
                        <NavItem type='link' link={paths.recon['dashboard']}>DASHBOARD</NavItem>
                        <NavItem type='link' link={paths.recon['master-table']}>MASTER TABLE</NavItem>
                        <NavItem type='link' link={paths.recon['scout']}>SCOUT FORM</NavItem>
                    </> : <>
                        <NavItem type='hamburger'>
                            <NavItem type='link' className='hamburger-link' link={paths.recon['dashboard']}>DASHBOARD</NavItem>
                            <NavItem type='link' className='hamburger-link' link={paths.recon['master-table']}>MASTER TABLE</NavItem>
                            <NavItem type='link' className='hamburger-link' link={paths.recon['scout']}>SCOUT FORM</NavItem>
                        </NavItem>
                    </>}
                </nav>
            );
        default:
            return (
                <nav className={'navbar' + (isScrolled ? ' scrolled' : '')}>
                    <NavItem className='nav-section' type='link' link={paths.main['home']} id='nav-image'>
                        <img src={logo} id='nav-image' alt='Home' />
                    </NavItem>

                    {width / height > 1 ? <>
                        <NavItem type='link' link={paths.main['about']}>ABOUT</NavItem>
                        {/* <NavItem type='link' link={paths.main['first']}><i>FIRST</i></NavItem> */}
                        <NavItem type='link' link={paths.main['sponsors']}>SPONSORS</NavItem>
                        <NavItem type='dropdown' label='PILLARS OF RESPAWN'>
                            <NavItem type='link' className='dropdown-link' link={paths.recon['dashboard']}>RECON</NavItem>
                            <NavItem type='link' className='dropdown-link' link={paths.reflect['home']}>REFLECT</NavItem>
                            <NavItem type='link' className='dropdown-link' link={paths.main.pillars['reach']}>REACH</NavItem>
                        </NavItem>
                    </> : <>
                        <NavItem type='hamburger'>
                            <NavItem type='link' className='hamburger-link' link={paths.main['about']}>ABOUT</NavItem>
                            {/* <NavItem type='link' className='hamburger-link' link={paths.main['first']}><i>FIRST</i></NavItem> */}
                            <NavItem type='link' className='hamburger-link' link={paths.main['sponsors']}>SPONSORS</NavItem>
                            <NavItem type='menu' className='hamburger-link' label='PILLARS OF RESPAWN'>
                                <NavItem type='link' className='menu-link' link={paths.recon['dashboard']}>RECON</NavItem>
                                <NavItem type='link' className='menu-link' link={paths.reflect['home']}>REFLECT</NavItem>
                                <NavItem type='link' className='menu-link' link={paths.main.pillars['reach']}>REACH</NavItem>
                            </NavItem>
                        </NavItem>
                    </>}
                </nav>
            );

    }


}


export default Navbar;
