import './form-input.css';
import ClickArea from '../click-area/ClickArea';
import ScoringGrid from '../scoring-grid/ScoringGrid';

function Input({name, type, onChange, options, id, value}) {
    switch (type) {
        //The grid component was made specifically for the 2023 game Charged Up
        case "grid" :
            return (
                <>
                    <ScoringGrid onChange={onChange} />
                </>
            );
        case "clickarea":
            return (
                <>
                    <ClickArea name={name} imageSrc={imageSrc} dataLabels={dataLabels} onChange={onChange} />
                </>
            );
        case "checkbox":
            return (
                <>
                    <input type='checkbox' name={name} onChange={onChange} className='form-input' />
                    <span className={`form-input ${className}`} id={id} />
                </>
            );
        case "select":
            return (
                <select name={name} className={`form-input ${className}`} id={id} onChange={onChange}>
                    {options.map((option, index) => {
                        return (
                            <option className={`select-option ${className}-option`} id={`${id}-option-${index}`} value={option}>{option}</option>
                        );
                    })}
                </select>
            );
        case "textarea":
            return (<textarea name={name} className={`form-input ${className}`} id={id} onChange={onChange} />);
        default:
            return (<input type={type} name={name} className={`form-input ${className}`} id={id} onChange={onChange} />);
    }
}

function FormInput({ name, type, onChange, options, imageSrc, dataLabels, className, id, inputClassName, inputId }) {
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
            />
        </div>
    )
}

export default FormInput;