import './form-input.css';

function Input({name, type, onChange, options, id, value}) {
    switch (type) {
        case "checkbox":
            return (<input value={value} id={id} type='checkbox' name={name} onChange={onChange} className='form-input' />);
        case "select":
            return (
                <select value={value} id={id} name={name} className='form-input' onChange={onChange}>
                    {options.map((option, index) => {
                        return (
                            <option className={name + "-option"} id={name + "-option" + index} value={value}>{option}</option>
                        );
                    })}
                </select>
            );
        case "textarea":
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
        </div>
    )
}

export default FormInput;