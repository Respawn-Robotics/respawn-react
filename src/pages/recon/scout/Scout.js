import React, { useEffect, useState } from 'react';
import './scout.css';
import reconfig from '../../../recon.config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from '../../../firebase.config';
import canvasImage from './media/field-image.png';
import FormInput from '../../../components/form-input/FormInput';

function ScoutForm() {
    const [team, setTeam] = useState(0);
    const [inputs, setInputs] = useState({});
    const [send, setSend] = useState(false);

    useEffect(() => {
        reconfig.data.map(field => setInputs(i => { return (field.name !== 'team' ? { ...i, [field['name']]: field['default'] } : {}) }));
    }, []);

    const autofillData = _ => {
        setSend(true);

        const exitedCommunity = _ => {
            const points = inputs['auton-path']['path-point'];
            for (let i = 0; i < points.length; i++) {
                if (
                    points[i].x > 0.57 ||
                    points[i].y < 0.32 ||
                    (points[i].x > 0.37 && points[i].y < 0.51)
                ) return 3;
            }
            return 0;
        }

        const powerGrid = _ => {
            let pieces = inputs['power-grid'];
            let sum = 0;

            for (let i = 0; i < pieces.length; i++) {
                if (pieces[i].piece !== 'cone' && pieces[i].piece !== 'cube') continue;

                if (i < 9) sum += pieces[i].auton ? 6 : 5; 
                else if (i < 18) sum += pieces[i].auton ? 4 : 3;
                else sum += pieces[i].auton ? 3 : 2;
            }

            return sum;
        }

        setInputs(i => {
            return {
                ...i,
                'exited-community':
                    exitedCommunity() === 3,
                'points-scored':
                    exitedCommunity() +
                    inputs['auton-charge-station'] +
                    powerGrid() +
                    inputs['endgame-charge-station']
            };
        });
    }

    const sendData = async _ => {
        const docRef = doc(db, 'recon', 'entries');

        updateDoc(docRef, {[team] : arrayUnion(inputs)});

        setSend(false);
    }

    const changeInputs = (event, data) => {
        if (event && event.target.name === 'team') {
            setTeam(parseInt(event.target.value));
            return;
        }
        if (!data) {
            const target = event.target;

            const name = target.name;
            let value;
            switch (target.type) {
                case "number":
                case "select-one":
                    value = target.value !== '' ? parseInt(target.value) : 0;
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

    useEffect(_ => {
        console.log(inputs);
        if (send) sendData();
    }, [inputs]);

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
                <button type='button' id='submit-button' onClick={autofillData}>SUBMIT</button>
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
