import './what-we-do.css';
import Programming from './media/programming.svg';
import Machining from './media/machining.svg';
import Cad from './media/cad.svg';
import Outreach from './media/outreach.svg';
import Degree from './media/degree.svg';
import Leadership from './media/leadership.svg';

function WhatWeDo() {
    return (
        <div className='what-we-do'>
            <div className='what-we-do-square'>
                <img className='square-image' src={Programming} alt='programming' />
                <h1 className='square-heading'>Programming</h1>
                <p className='square-text'>Code and create programs to make the robot come to life using the WPI Suite of tools and libraries.</p>
            </div>
            <div className='what-we-do-square'>
                <img className='square-image' src={Machining} alt='machining' />
                <h1 className='square-heading'>Machining</h1>
                <p className='square-text'>Machine and build parts of a robot using top of the line equipment using top-of-the-line like ProtoTrak CNC mills.</p>
            </div>
            <div className='what-we-do-square'>
                <img className='square-image' src={Cad} alt='cad' />
                <h1 className='square-heading'>CAD</h1>
                <p className='square-text'>Design and model 3D parts using Solidworks, a professional grade 3D software.</p>
            </div>
            <div className='what-we-do-square'>
                <img className='square-image' src={Outreach} alt='outreach' />
                <h1 className='square-heading'>Outreach</h1>
                <p className='square-text'>Reach out to local companies and schools to recruit students and fundraise money.</p>
            </div>
            <div className='what-we-do-square'>
                <img className='square-image' src={Degree} alt='degree' />
                <h1 className='square-heading'>Degree</h1>
                <p className='square-text'>By joining the 2 year program, you can acquire an associates degree in Electro-Mechanical Engineering Technologies.</p>
            </div>
            <div className='what-we-do-square'>
                <img className='square-image' src={Leadership} alt='leadership' />
                <h1 className='square-heading'>Leadership</h1>
                <p className='square-text'>We are a student led team where the students run the team as a business.</p>
            </div>
        </div>
    );
}

export default WhatWeDo;