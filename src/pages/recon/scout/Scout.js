import React, { useEffect, useRef, useState } from 'react';
import './scout.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reconfig from '../../../recon.config';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import db from '../../../firebase.config';
import canvasImage from './media/field-image.png';
import FormInput from '../../../components/form-input/FormInput';

function ScoutForm() {
    const [team, setTeam] = useState(0);
    const [userData, setUserData] = useState({});
    const [database, setDatabase] = useState({});
    const downloadLink = useRef(null);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [send, setSend] = useState(false);

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));

        const doc = await getDocs(q);

        return doc;
    }

    useEffect(_ => {
        if (loading) return
        if (!user) return navigate('/signin')
        fetchTeamName().then(document => {
            setUserData(document.docs[0].data())
            onSnapshot(doc(db, 'recon',
                document.docs[0].data().teamName), d => setDatabase(d.data()));
        });
    }, [user, loading]);

    useEffect(_ => {
        let defaultInputs = {};
        reconfig.data.map(field => field.name !== 'team' ? defaultInputs[field.name] = field.default : '');
        setInputs(defaultInputs);
    }, [user]);

    const autofillData = _ => {
        setSend(true);

        const exitedCommunity = _ => {
            let points = inputs['auton-path']['path-point'];
            if (!points) return 0;
            for (let i = 0; i < points.length; i++) {
                if (
                    (points[i].x < 0.6 && points[i].x > 0.4) ||
                    (points[i].x < 0.8 && points[i].x > 0.2 && points[i].y > 0.15 && points[i].y < 0.5) ||
                    (points[i].x < 0.71 && points[i].x < 0.29 && points[i].y > 0.5)
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

    const showDownload = _ => {
        const stringifyJson = JSON.stringify({ ...inputs, team: team, author: user.displayName });
        const jsonBlob = new Blob([stringifyJson], { type: 'application/json' });
        const url = URL.createObjectURL(jsonBlob);
        downloadLink.current.href = url;
        downloadLink.current.style.display = 'block';
    }

    const sendData = async _ => {
        console.log(database)
        if (!database[team] || database[team].map(en => en.match).indexOf(inputs.match) === -1) {
            try {
                const docRef = doc(db, 'recon', userData.teamName);
                let result = toast.promise(Promise.race([
                    updateDoc(docRef, { [team]: arrayUnion({ ...inputs, author: user.displayName }) }),
                    new Promise((_, rej) => {
                        const timeoutId = setTimeout(_ => {
                            clearTimeout(timeoutId);
                            rej("Request timed out; try downloading the scout and uploading it when you have a connection.")
                        }, 2000)
                    })
                ]), {
                    pending: 'Uploading...',
                    success: 'Uploaded!',
                    error: 'Upload Failed!'
                });

                result.then(_ => {
                    navigate('/recon');
                }, rej => {
                    toast(rej, { type: 'error' });
                    showDownload();
                });
            } catch (error) {
                toast("Request timed out; try downloading the scout and uploading it when you have a connection.", { type: 'error' });
                showDownload();
            }
        } else {
            toast('A scout for the same team in the same match already exists! If you believe this is an error, download the data and contact a team admin.', { type: 'error' });
            showDownload();
        }
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
                <a type='button' style={{ display: 'none', textDecoration: 'none' }} href='#' ref={downloadLink} id='submit-button' download onClick={autofillData}>DOWNLOAD DATA</a>
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
