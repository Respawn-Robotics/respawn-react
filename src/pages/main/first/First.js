import React from "react";
import './first.css';

import firstLogo from './media/first-logo.png';
import deanKamen from './media/dean-kamen.jpg';

function First() {
    return (
        <>
            <div id='first-mission'>
                <a href='https://www.firstinspires.org/about/vision-and-mission' target='_blank' rel="noreferrer">
                    <img src={firstLogo} alt='FIRST Logo' />
                </a>
                <p>
                    The mission of FIRST is to inspire young people to be science and
                    technology leaders and innovators, by engaging them in exciting
                    mentor-based programs that build science, engineering, and technology
                    skills, that inspire innovation, and that foster well-rounded life
                    capabilities including self-confidence, communication, and leadership.
                </p>
            </div>
            <h1 id='first-vision'>FIRST's Vision</h1>
            <div id='quote-container'>
                <div id='dean-kamen-pic'>
                    <img src={deanKamen} alt='Dean Kamen' />
                </div>
                <p id='kamen-quote'>
                    “To transform our culture by creating a world where science
                    and technology are celebrated and where young people dream
                    of becoming science and technology leaders.”
                    <p>-Dean Kamen</p>
                </p>
            </div>
        </>
    );
}

export default First;