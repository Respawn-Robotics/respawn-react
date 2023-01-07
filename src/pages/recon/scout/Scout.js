import React, { useEffect, useState } from 'react';
import './scout.css';
import reconfig from '../../../recon.config';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../../firebase.config';
import canvasImage from './media/canvas-image.png';
import FormInput from '../../../components/form-input/FormInput';

function ScoutForm() {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        reconfig.data.map(field => setInputs(i => { return { ...i, [field['name']]: field['default'] } }));
    }, [])

    function autofillData() {
        const climbPoints = _ => {
            switch(inputs['climb-level']) {
                case 'Traversal Rung':
                    return 15;
                case 'High Rung':
                    return 10;
                case 'Mid Rung':
                    return 6;
                case 'Low Rung':
                    return 4;
                default:
                    return 0;
            }
        }

        setInputs(i => {
            return {
                ...i,
                'points-scored' :
                    (inputs['exited-tarmac'] ? 2 : 0) +
                    4 * inputs['auton-upper'] +
                    2 * inputs['auton-lower'] +
                    2 * inputs['teleop-shots']['upper'].length +
                    inputs['teleop-shots']['lower'].length +
                    climbPoints(),
                'teleop-accuracy' : 
                    inputs['teleop-shots']['upper'].length / 
                    inputs['teleop-shots']['missed'].length,
                'auton-accuracy' :
                    inputs['auton-upper'] /
                    inputs['auton-missed']
            };
        });
    }

    const sendData = async () => {

        autofillData();

        const collecRef = collection(db, "recon");
        const payload = inputs;

        await addDoc(collecRef, payload);
    }

    const changeInputs = (event, data) => {
        if (!data) {
            const target = event.target;

            const name = target.name;
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

            setInputs(values => ({ ...values, [name]: value }));
        } else {
            setInputs(values => ({ ...values, [data.name]: data.value }));
        }
    }

    return (<>
        <form id='scout-form'>

            {reconfig.data.map(field => {
                return (!field.auto ?
                    <FormInput
                        name={field.name}
                        type={field.type}
                        onChange={changeInputs}
                        options={field.options}
                        dataLabels={field['data-labels']}
                        imageSrc={canvasImage}
                    /> : <></>
                );
            })}

            <div id='submit-button-container'>
                <button type='button' id='submit-button' onClick={sendData}>SUBMIT</button>
            </div>
        </form>
    </>
    )

}

function Scout() {
    return (
        <div id='scout-form-container'>
            <ScoutForm />
        </div>
    );
    }

export default Scout;
