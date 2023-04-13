
import React, { useEffect, useRef, useState } from 'react';
import './scout.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reconfig from '../../../recon.config';
import { doc, updateDoc, arrayUnion, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import db from '../../../firebase.config';
import canvasImage from './media/field-image.png';
import FormInput from '../../../components/form-input/FormInput';

function Scout({ edit, values }) {
    const [team, setTeam] = useState();
    const [teamData, setTeamData] = useState({});
    const [database, setDatabase] = useState({});
    const downloadLink = useRef(null);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState(
        reconfig.data.reduce((acc, cur) => {
            if (cur.name !== 'team') acc[cur.name] = cur.default;
            return acc;
        }, {})
    );
    const [send, setSend] = useState(false);

    useEffect(_ => setTeam(values?.team), [values])

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
        const doc = await getDocs(q);
        return doc;
    }

    useEffect(_ => {
        if (loading) return
        if (!user) return navigate('/signin')
        fetchTeamName().then(document => {
            setTeamData(document.docs[0].data())
            onSnapshot(doc(db, 'recon',
                `${document.docs[0].data().teamName}-${document.docs[0].data().regional}`),
                d => {
                    if (!d._document) (async _ => await setDoc(doc(db, 'recon', `${document.docs[0].data().teamName}-${document.docs[0].data().regional}`), {}))();
                    setDatabase(d.data())
                });
        });
    }, [user, loading]);

    useEffect(_ => { if (values) setInputs(values) }, [values])

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
                if (node.substr(3) < 9) sum += node.charAt(1) === 'T' ? 6 : 5;
                else if (node.substr(3) < 18) sum += node.charAt(1) === 'T' ? 4 : 3;
                else sum += node.charAt(1) === 'T' ? 3 : 2;

                if (node.charAt(2) === 'S') sum += 3;
            });

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
        if (!database[team] || database[team].map(en => en.match).indexOf(inputs.match) === -1) {
            try {
                const docRef = doc(db, 'recon', `${teamData.teamName}-${teamData.regional}`);
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
        } else if (edit) {
            let ogAuthor;
            const docRef = doc(db, 'recon', `${teamData.teamName}-${teamData.regional}`);
            const previousEntries = database[team].filter(entry => {
              if (entry.match != inputs.match) {
                return true;
              } else {
                ogAuthor = entry.author;
                return false;
              }});

            toast.promise(updateDoc(docRef, {
              [team]: previousEntries.length > 0 ?
                [...previousEntries, {...inputs, author: ogAuthor, edited: user.displayName}] :
                [{...inputs, author: ogAuthor, edited: user.displayName}]
            }),
            {
              pending: 'Updating...',
              success: 'Successfully Updated!',
              error: 'Edit Failed!'
            });
        } else {
            toast('A scout for the same team in the same match already exists! If you believe this is an error, download the data and contact a team admin.', { type: 'error' });
            showDownload();
        }
        setSend(false);
    }

    useEffect(_ => { if (send) sendData(); }, [inputs]);

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

    return (<div id='scout-form-container'>
        <form id='scout-form'>
            {reconfig.data.map((field, i) => {
                return (!field.auto ?
                    <FormInput
                        name={field.name}
                        type={field.type}
                        onChange={changeInputs}
                        lines={field.lines}
                        options={field.options}
                        imageSrc={canvasImage}
                        id={`input-${i}`}
                        value={values ? values[field.name] : undefined}
                        key={`input-${i}`}
                    /> : <></>
                );
            })}
            {teamData.fields ? teamData.fields?.map((field, i) => {
                switch (field.type) {
                    case '0':
                        return <FormInput
                            name={field.name}
                            type='checkbox'
                            onChange={changeInputs}
                            className='custom-input'
                            value={values ? values[field.name] ?? undefined : undefined}
                            key={`custom-${i}`}
                        />;
                    case '1':
                        return <FormInput
                            name={field.name}
                            type='number'
                            onChange={changeInputs}
                            className='custom-input'
                            value={values ? values[field.name] ?? undefined : undefined}
                            key={`custom-${i}`}
                        />;
                    case '2':
                        return <FormInput
                            name={field.name}
                            type='select'
                            onChange={changeInputs}
                            options={field.options.map((o, i) => {
                                return {
                                    label: o,
                                    value: i
                                }
                            })}
                            className='custom-input'
                            value={values ? values[field.name] ?? undefined : undefined}
                            key={`custom-${i}`}
                        />;
                    case '3':
                        return <FormInput
                            name={field.name}
                            type='text'
                            onChange={changeInputs}
                            className='custom-input'
                            value={values ? values[field.name] ?? undefined : undefined}
                            key={`custom-${i}`}
                        />;
                    case '4':
                        return <FormInput
                            name={field.name}
                            type='textarea'
                            onChange={changeInputs}
                            className='custom-input'
                            value={values ? values[field.name] ?? undefined : undefined}
                            key={`custom-${i}`}
                        />;
                }
            }) : <></>}

            <div id='submit-button-container'>
                <button type='button' id='submit-button' onClick={autofillData}>SUBMIT</button>
                <a type='button' style={{ display: 'none', textDecoration: 'none' }} href='#' ref={downloadLink} id='submit-button' download onClick={autofillData}>DOWNLOAD DATA</a>
            </div>
        </form>
    </div>
    )

}

export default Scout;
