import './form-input.css';

function Input({name, type, onChange, options}) {
    switch (type) {
        case "checkbox":
            return (<input type='checkbox' name={name} onChange={onChange} className='form-input' />);
        case "select":
            return (
                <select name={name} className='form-input' onChange={onChange}>
                    {options.map((option, index) => {
                        return (
                            <option className={name + "-option"} id={name + "-option" + index} value={option}>{option}</option>
                        );
                    })}
                </select>
            );
        case "textarea":
            return (<textarea name={name} className='form-input' onChange={onChange} />);
        default:
            return (<input type={type} name={name} className='form-input' onChange={onChange} />);
    }
}

function FormInput({name, type, onChange, options}) {
    return (
        <div className='input-container'>
            <label className='form-label'>{name.replace(/(-|_)+/g, " ") + ": "}</label>
            <Input type={type} name={name} options={options} className='form-input' onChange={onChange} />
        </div>
    )
}

export default FormInput;