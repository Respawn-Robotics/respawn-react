import React, { useEffect, useState } from 'react';
import './scout.css';
import reconfig from '../../../recon.config';
import { collection, addDoc } from 'firebase/firestore';
import db from '../../../firebase.config';
import canvasImage from './media/field-image.png';
import FormInput from '../../../components/form-input/FormInput';

function ScoutForm() {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        reconfig.data.map(field => setInputs(i => { return { ...i, [field['name']]: field['default'] } }));
    }, []);

    function autofillData() {
        const autonChargeStation = _ => {
            switch(inputs['auton-charge-station']) {
                case 'Docked + Engaged':
                    return 12;
                case 'Docked':
                    return 8;
                default:
                    return 0;
            }
        }

        const endgameChargeStation = _ => {
            switch(inputs['endgame-charge-station']) {
                case 'Docked + Engaged':
                    return 10;
                case 'Docked':
                    return 6;
                case 'Parked':
                    return 2;
                default:
                    return 0;
            }
        }

        setInputs(i => {
            return {
                ...i,
                'points-scored' : 4
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

    useEffect(_ => console.log(inputs));

    return (<>
        <form id='scout-form'>

            {reconfig.data.map((field, i) => {
                return (!field.auto ?
                    <FormInput
                        name={field.name}
                        type={field.type}
                        onChange={changeInputs}
                        lines={field.lines}
                        options={field.options}
                        dataLabels={field['data-labels']}
                        imageSrc={canvasImage}
                        id={`input-${i}`}
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
