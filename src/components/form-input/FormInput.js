import './form-input.css';
import ClickArea from '../click-area/ClickArea';

<<<<<<< HEAD
function Input({name, type, onChange, options, id, value}) {
=======
function Input({ name, type, onChange, options, imageSrc, dataLabels, className, id }) {
>>>>>>> 944592f8b2bdb6caf870672bb7c6fce1137e20b5
    switch (type) {
        case "clickarea":
            return (
                <>
                    <ClickArea name={name} imageSrc={imageSrc} dataLabels={dataLabels} onChange={onChange} />
                </>
            );
        case "checkbox":
<<<<<<< HEAD
            return (<input value={value} id={id} type='checkbox' name={name} onChange={onChange} className='form-input' />);
        case "select":
            return (
                <select value={value} id={id} name={name} className='form-input' onChange={onChange}>
                    {options.map((option, index) => {
                        return (
                            <option className={name + "-option"} id={name + "-option" + index} value={value}>{option}</option>
=======
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
>>>>>>> 944592f8b2bdb6caf870672bb7c6fce1137e20b5
                        );
                    })}
                </select>
            );
        case "textarea":
<<<<<<< HEAD
            return (<textarea value={value} id={id} name={name} className='form-input' onChange={onChange} />);
        default:
            return (<input value={value} id={id} type={type} name={name} className='form-input' onChange={onChange} />);
    }
}

function FormInput({name, type, onChange, options, id, value}) {
    return (
        <div className='input-container'>
            <label className='form-label'>{name.replace(/(-|_)+/g, " ") + ": "}</label>
            <Input value={value} id={id} type={type} name={name} options={options} className='form-input' onChange={onChange} />
=======
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
>>>>>>> 944592f8b2bdb6caf870672bb7c6fce1137e20b5
        </div>
    )
}

export default FormInput;