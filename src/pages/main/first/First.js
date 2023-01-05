import React from "react";
import './first.css';

import firstLogo from './media/first-logo.png';
import deanKamen from './media/dean-kamen.jpg';

function First() {
    return (
        <div id='quote-container'>
            <div id='dean-kamen-pic'>
            </div>
            <blockquote id='kamen-quote'>
                “To transform our culture by creating a world where science
                and technology are celebrated and where young people dream
                of becoming science and technology leaders.” <p>-Dean Kamen</p>
            </blockquote>
        </div>
    );
}

export default First;