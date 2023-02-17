import React from "react";
import './alum.css';

function Alum({ content, image }) {
    return <div className='alum-container'>
        <div className='alum-picture'>
            <img src={image} />
        </div>
        <div className='alum-text-content'>
            <h1>{content.name}, Class of {content.year}</h1>
            <h2>{content.titles.map((t, i) => `${t}${i === content.titles.length - 1 ? '' : ', '}`)}</h2>
            <p>{content.desc}</p>
        </div>
    </div>
}

export default Alum;