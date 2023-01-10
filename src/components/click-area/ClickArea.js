import React, { useEffect, useRef, useState } from "react";
import './click-area.css';

function ClickArea({ name, dataLabels, imageSrc, onChange }) {

    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const [data, setData] = useState(dataLabels.reduce((acc, field) => {
        acc[field['label']] = [];
        return acc;
    }, {}));

    const [dataLabel, setDataLabel] = useState(dataLabels[0]);

    const toggleLabel = (e, label) => {
        e.preventDefault();

        setDataLabel(label);
    }

    const placePoint = event => {
        const ctx = canvasRef.current.getContext('2d');

        const x = event.nativeEvent.offsetX / event.target.offsetWidth;
        const y = event.nativeEvent.offsetY / event.target.offsetHeight;

        setData(p => { return { ...p, [dataLabel['label']]: p[dataLabel['label']].concat([{ x: x, y: y }]) } });

        ctx.fillStyle = dataLabel['color'];
        ctx.beginPath();
        ctx.arc(x * 300, y * 150, 3, 0, 2 * Math.PI);
        ctx.fill();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        imageRef.current.onload = () => ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }, []);

    useEffect(_ => onChange(_, { name: name, value: data }), [data]);

    return (
        <div className='click-area'>
            <canvas
                value={data}
                className='interactable-canvas'
                ref={canvasRef}
                onMouseDown={placePoint}
            >
                <img ref={imageRef} src={imageSrc} alt='Field' />
            </canvas>
            <div className='data-toggle-menu'>
                {dataLabels.map(field => {
                    return (
                        <button onClick={(e) => toggleLabel(e, field)}>{field['label']}</button>
                    );
                })}
            </div>
        </div>
    );
}

export default ClickArea;