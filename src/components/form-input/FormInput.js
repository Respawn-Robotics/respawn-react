import './form-input.css';

function Input(props) {
    switch (props.type) {
        case "checkbox":
            return (<input type='checkbox' name={props.name} onChange={props.onChange} className='form-input' />);
        case "select":
            return (
                <select name={props.name} className='form-input' onChange={props.onChange}>
                    {props.options.map((option, index) => {
                        return (
                            <option className={props.name + "-option"} id={props.name + "-option" + index} value={option}>{option}</option>
                        );
                    })}
                </select>
            );
        case "textarea":
            return (<textarea name={props.name} className='form-input' onChange={props.onChange} />);
        default:
            return (<input type={props.type} name={props.name} className='form-input' onChange={props.onChange} />);
    }
}

function FormInput(props) {
    return (
        <div className='input-container'>
            <label className='form-label'>{props.name.replace(/(-|_)+/g, " ") + ": "}</label>
            <Input type={props.type} name={props.name} options={props.options} className='form-input' onChange={props.onChange} />
        </div>
    )
}

export default FormInput;