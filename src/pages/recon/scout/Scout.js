import React, { useEffect, useRef, useState } from 'react';
import './scout.css';
import reconfig from '../../../recon.config';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import db from '../../../firebase.config';
import canvasImage from './media/field-image.png';
import FormInput from '../../../components/form-input/FormInput';

function ScoutForm() {
    const [team, setTeam] = useState(0);
    const downloadLink = useRef(null);
    const [inputs, setInputs] = useState({});
    const [send, setSend] = useState(false);

    useEffect(() => {
        reconfig.data.map(field => setInputs(i => { return (field.name !== 'team' ? { ...i, [field['name']]: field['default'].toString() } : {}) }));
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
            let sum = 0;

            inputs['power-grid'].map(node => {
                if (node.substr(2) < 9) sum += node.charAt(1) === 'T' ? 6 : 5;
                else if (node.substr(2) < 18) sum += node.charAt(1) === 'T' ? 4 : 3;
                else sum += node.charAt(1) === 'T' ? 3 : 2;
            })

            return sum;
        }

        setInputs(i => {
            return {
                ...i,
                'exited-community':
                    exitedCommunity() === 3,
                'points-scored':
                    (parseInt(exitedCommunity()) +
                        parseInt(inputs['auton-charge-station']) +
                        parseInt(powerGrid()) +
                        parseInt(inputs['endgame-charge-station'])).toString()
            };
        });
    }

    const sendData = async _ => {
        const docRef = doc(db, 'recon', 'entries');
        let result = Promise.race([
            updateDoc(docRef, { [team]: arrayUnion(inputs) }),
            new Promise((_, rej) => {
                const timeoutId = setTimeout(_ => {
                    clearTimeout(timeoutId);
                    rej("Request timed out; allow Download")
                }, 2000)
            })
        ]);

        result.then(_, _ => {
            const stringifyJson = JSON.stringify({...inputs, team: team});
            const jsonBlob = new Blob([stringifyJson], { type: 'application/json' });
            const url = URL.createObjectURL(jsonBlob);
            downloadLink.current.href = url;
            downloadLink.current.style.display = 'block';
        });
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

    useEffect(_ => { if (send) sendData(); }, [inputs]);

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
                <a type='button' style={{display: 'none', textDecoration: 'none'}} href='#' ref={downloadLink} id='submit-button' download onClick={autofillData}>DOWNLOAD DATA</a>
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
