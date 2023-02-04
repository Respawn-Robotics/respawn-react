import React from "react";
import './first.css';

import firstLogo from './media/first-logo.png';
import deanKamen from './media/dean-kamen.jpg';
import coreValues from './media/core-values.jpg';
import woodieFlowers from './media/woodie-flowers.jpg';
import coopertition from './media/coopertition.jpg';

function First() {
    return (
        <>
            <div id='first-mission'>
                <a href='https://www.firstinspires.org/about/vision-and-mission' target='_blank' rel="noreferrer">
                    <img src={firstLogo} alt='FIRST Logo' />
                </a>
                <p>
                    The mission of <i>FIRST</i> (For the Inspiration of Science and Technology) is
                    "<i>
                        to inspire young people to be science and
                        technology leaders and innovators, by engaging them in exciting
                        mentor-based programs that build science, engineering, and technology
                        skills, that inspire innovation, and that foster well-rounded life
                        capabilities including self-confidence, communication, and leadership
                        <br />
                    </i>
                    (firstinspires.org)".
                </p>
            </div>
            <h1 id='first-vision'><i>FIRST</i>'s Vision</h1>
            <div id='quote-container'>
                <div id='dean-kamen-pic'>
                    <img src={deanKamen} alt='Dean Kamen' />
                </div>
                <p id='kamen-quote'>
                    <i>
                        “To transform our culture by creating a world where science
                        and technology are celebrated and where young people dream
                        of becoming science and technology leaders.”
                    </i>
                    <p>-Dean Kamen</p>
                </p>
            </div>
            <div id='core-values'>
                <div className='core-value-container'>
                    <img src={coreValues} />
                    <h1><i>FIRST</i> Core Values</h1>
                    <p>
                        <li>Discovery: We explore new skills and ideas.</li>
                        <li>Innovation: We use creativity and persistence to solve problems.</li>
                        <li>Impact:  We apply what we learn to improve our world.</li>
                        <li>Inclusion: We respect each other and embrace our differences.</li>
                        <li>Teamwork: We are stronger when we work together.</li>
                        <li>Fun: We enjoy and celebrate what we do!</li>
                        (firstinspires.org)
                    </p>
                </div>
                <div className='core-value-container'>
                    <img src={woodieFlowers} />
                    <h1>Gracious Professionalism</h1>
                    <p>
                        "<i>
                            Dr. Woodie Flowers, FIRST Distinguished Advisor and Pappalardo Professor Emeritus
                            of Mechanical Engineering, Massachusetts Institute of Technology, coined the term
                            "Gracious Professionalism. Gracious Professionalism is part of the ethos of FIRST.
                            It's a way of doing things that encourages high-quality work, emphasizes the value
                            of others, and respects individuals and the community. With Gracious
                            Professionalism, fierce competition and mutual gain are not separate notions.
                            Gracious professionals learn and compete like crazy but treat one another with
                            respect and kindness in the process. They avoid treating anyone like losers.
                            No chest thumping tough talk, but no sticky-sweet platitudes either.
                            Knowledge, competition, and empathy are comfortably blended
                        </i> (firstinspires.org)".
                    </p>
                </div>
                <div className='core-value-container'>
                    <img src={coopertition} />
                    <h1>Coopertition</h1>
                    <p>
                        "<i>
                            Coopertition produces innovation. At FIRST, Coopertition is displaying
                            unqualified kindness and respect in the face of fierce competition. Coopertition
                            is founded on the concept and a philosophy that teams can and should help and
                            cooperate with each other even as they compete. Coopertition involves learning
                            from teammates. It is teaching teammates. It is learning from Mentors. And it
                            is managing and being managed. Coopertition means competing always, but assisting
                            and enabling others when you can
                        </i> (firstinspires.org)".
                    </p>
                </div>
            </div>
        </>
    );
}

export default First;