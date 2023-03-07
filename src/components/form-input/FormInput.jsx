import { useEffect, useRef, useState } from 'react';
import './form-input.css';
import ClickArea from '../click-area/ClickArea';
import ScoringGrid from '../scoring-grid/ScoringGrid';
import ToggleButton from '../toggle-button/ToggleButton';

function Input({ name, type, onChange, options, lines, imageSrc, className, id, value }) {
    const charCount = useRef(null)
    switch (type) {
        // The grid component was made specifically for the 2023 game Charged Up
        case "grid":
            return <ScoringGrid value={value} onChange={onChange} />;
        case "clickarea":
            return <ClickArea value={value} name={name} imageSrc={imageSrc} lines={lines} options={options} onChange={onChange} />;
        case "checkbox":
            return (
                <>
                    <input value={value} type='checkbox' name={name} onChange={onChange} className='form-input' />
                    <span className={`form-input ${className}`} id={id} />
                </>
            );
        case "select":
            return (
                <select name={name} className={`form-input ${className}`} id={id} onChange={onChange}>
                    {options.map((option, index) => {
                        return (
                            <option className={`select-option ${className}-option`} id={`${id}-option-${index}`} selected={value ? options[options.map(o => o.value).indexOf(parseInt(value))].label === option.label ? 'selected' : '' : ''} value={option.value}>{option.label}</option>
                        );
                    })}
                </select>
            );  
        case "togglebutton":
            return <ToggleButton value={value} name={name} className={`form-input ${className}`} id={id} onChange={onChange} options={options} />;
        case "textarea":
            return <>
                <textarea value={value} name={name} maxLength='200' className={`form-input ${className}`} id={id} onChange={e => {onChange(e); charCount.current.innerHTML = `Characters Left: ${200 - e.target.value.length}`;}} />
                <p className='character-count' ref={charCount} />
            </>
        case "array":
            return <ArrayInputs value={value} name={name} onChange={onChange} options={options} />;
        default:
            return <input value={value} type={type} required name={name} className={`form-input ${className}`} id={id} onChange={onChange} />;
    }
}

function ArrayInputs({ name, onChange, options, value }) {
    const [input, setInput] = useState(options.map(o => o['default']));

    useEffect(_ => onChange(_, { name: name, value: input }), [input]);

    const updateInput = (e, data, index) => {
        if (!data) {
            const target = e.target;
            let value = null;

            switch (target.type) {
                case "number":
                    value = parseInt(target.value);
                    break;
                case "checkbox":
                    value = target.checked;
                    break;
                default:
                    value = target.value;

            }

            setInput(input.map((v, i) => i === index ? value : v));
        } else {
            setInput(input.map((v, i) => i === index ? data['value'] : v));
        }
    }

    return (
        <div className='array-input'>
            {options.map((input, i) => {
                return <Input type={input['type']} options={input['options']} value={value ? value[i] : input[i]} onChange={(e, data) => updateInput(e, data, i)} />
            })}
        </div>
    )
}

function FormInput({ name, type, onChange, options, imageSrc, dataLabels, className, id, inputClassName, inputId, value }) {
    return (
        <div className={`input-container${className === undefined ? '' : ` ${className}`}`} id={id}>
            <label className='form-label'>{name.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, (c) => c.toUpperCase())}</label>
            <Input
                type={type}
                name={name}
                options={options}
                imageSrc={imageSrc}
                dataLabels={dataLabels}
                className={inputClassName === undefined ? '' : inputClassName}
                id={inputId === undefined ? '' : inputId}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default FormInput;