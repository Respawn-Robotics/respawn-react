import React, { useEffect, useRef, useState } from "react";
import './toggle-button.css';

function ToggleButton({ name, options, onChange, value }) {
    const [mode, setMode] = useState(0);
    const buttonRef = useRef(null);

    const toggleMode = e => {
        e.preventDefault();

        let nextMode = (mode + 1) % options.length;
        nextMode += options[nextMode]['title'] ? 1 : 0;

        buttonRef.current.innerHTML = options[nextMode].mode;
        buttonRef.current.style['backgroundColor'] = options[nextMode].color;

        setMode(nextMode);
    }

    useEffect(_ => {
        onChange(_, { name: name, value: options[mode]?.value.toString() });
    }, [mode]);

    useEffect(_ => setMode(value ? options.map(o => o.value).indexOf(parseInt(value)) : mode), [value]);
    
    return ( 
        <>
            <button
                className='toggle-button'
                ref={buttonRef}
                style={{ backgroundColor: options[mode]?.color }}
                onClick={toggleMode}
            >
                {options[mode]?.mode}
            </button>
        </>
    );
}

export default ToggleButton;