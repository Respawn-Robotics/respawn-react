import React, { useEffect, useRef, useState } from "react";
import './click-area.css';

function ClickArea({ name, options, imageSrc, onChange, value }) {

    const canvasRef = useRef(null);
    const imageRef = useRef(null);

    const [data, setData] = useState(
        options.reduce((acc, field) => {
            acc[field['label']] = [];
            return acc;
        }, {}));

    const [dataLabel, setDataLabel] = useState(options[0]);

    const toggleLabel = (e, label) => {
        e.preventDefault();

        setDataLabel(label);
    }

    const drawImage = ctx => {
        const canvas = canvasRef.current;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }

    const drawPoints = ctx => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawImage(ctx);
        for (let field in data) {
            if (data[field].length < 1) break;

            let prevX = data[field][0].x;
            let prevY = data[field][0].y;
            data[field].map(p => {
                ctx.fillStyle = dataLabel['color'];
                ctx.strokeStyle = dataLabel['color'];

                ctx.beginPath();
                ctx.arc(p.x * 300, p.y * 150, 3, 0, 2 * Math.PI);
                ctx.moveTo(prevX * 300, prevY * 150);
                ctx.lineTo(p.x * 300, p.y * 150);
                ctx.stroke();


                prevX = p.x;
                prevY = p.y;
            })
        }
    }

    
    const undo = e => {
        e.preventDefault();
        setData({ [dataLabel['label']]: data[dataLabel['label']].slice(0, -1) })
    }
    
    const placePoint = event => {
        const x = event.nativeEvent.offsetX / event.target.offsetWidth;
        const y = event.nativeEvent.offsetY / event.target.offsetHeight;
        
        setData(p => { return { ...p, [dataLabel['label']]: p[dataLabel['label']].concat([{ x: x, y: y }]) } });
    }

    useEffect(_ => {
        if (value) setData(value);
    }, [value]);

    useEffect(() => {
        imageRef.current.onload = () => drawImage(canvasRef.current.getContext('2d'));
    }, []);

    useEffect(_ => {
        onChange(_, { name: name, value: data });
        drawPoints(canvasRef.current.getContext('2d'));
    }, [data]);

    return (
        <div className='click-area'>
            <canvas
                className='interactable-canvas'
                ref={canvasRef}
                onMouseDown={placePoint}
            >
                <img ref={imageRef} src={imageSrc} alt='Field' />
            </canvas>
            <div className='data-toggle-menu'>
                {options.length > 1 && options.map(field => {
                    return (
                        <button onClick={e => toggleLabel(e, field)}>{field['label']}</button>
                    );
                })}
            </div>
            <div className='undo-button'>
                <button onClick={undo}>UNDO</button>
            </div>
        </div>
    );
}

export default ClickArea;