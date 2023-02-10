import React, { useState, useEffect } from "react";
import './manage-inputs.css';
import FormInput from "../../../../components/form-input/FormInput";
import { updateDoc, arrayUnion, query, collection, where, getDocs, doc, getDoc, onSnapshot, setDoc, arrayRemove, deleteDoc } from 'firebase/firestore';
import db from '../../../../firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';

function CustomField({ field, deleteField }) {
    const FieldText = ({ field }) => {
        switch (field.type) {
            case '0':
                return <div className='custom-field-text'>
                    <h1>Name: {field.name}</h1>
                    <h2>Type: Checkbox</h2>
                </div>;
            case '1':
                return <div className='custom-field-text'>
                    <h1>Name: {field.name}</h1>
                    <h2>Type: Number</h2>
                </div>;
            case '2':
                return <div className='custom-field-text'>
                    <h1>Name: {field.name}</h1>
                    <h2>Type: Select</h2>
                    <h3>Options:</h3>
                    <ul>
                        {field.options.map(o => <li key={o}>{o}</li>)}
                    </ul>
                </div>;
            case '4':
                return <div className='custom-field-text'>
                    <h1>Name: {field.name}</h1>
                    <h2>Type: Extended Response</h2>
                </div>;
            default:
                return <div className='custom-field-text'>
                    <h1>Name: {field.name}</h1>
                    <h2>Type: Short Response</h2>
                </div>;
        }
    }

    return <div className='custom-field'>
        <FieldText field={field} />
        <div className='field-control-panel'>
            <button
                className='remove-option'
                onClick={e => {
                    e.preventDefault();
                    deleteField(field);
                }}
            >X</button>
        </div>
    </div>
}

function ManageInputs() {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const [currentUserRank, setCurrentUserRank] = useState("")
    const [customFields, setCustomFields] = useState([]);
    const [team, setTeam] = useState()
    const [inputs, setInputs] = useState({})
    const [currentOptionName, setCurrentOptionName] = useState("")

    const isUserAdmin = async () => {
        const q = query(collection(db, "teams"), where("admins", "array-contains", user.uid));
        const doc1 = await getDocs(q);
        return doc1.empty
    }

    const isUserOwner = async () => {
        const q = query(collection(db, "teams"), where("owner", "==", user.uid));
        const doc1 = await getDocs(q);
        return doc1.empty
    }

    const fetchTeam = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
        const doc1 = await getDocs(q);
        return doc1.docs[0]
    }

    const removeField = field => {
        toast.promise(fetchTeam().then(res => {
            toast.promise(updateDoc(doc(db, 'teams', res.data().teamName), { fields: arrayRemove(field) }), {
                pending: 'Sending...',
                success: 'Updated fields!',
                error: 'Failed to send request!',
            });
        }), {
            pending: 'Fetching team...',
            error: 'Failed to fetch team!'
        })
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

    const updateFields = inputs => {
        toast.promise(fetchTeam().then(res => {
            toast.promise(updateDoc(doc(db, 'teams', res.data().teamName), { fields: arrayUnion(inputs) }), {
                pending: 'Sending...',
                success: 'Updated fields!',
                error: 'Failed to send request!',
            });
        }), {
            pending: 'Fetching team...',
            error: 'Failed to fetch team!'
        })
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/signin");
        isUserAdmin().then(res => {
            if (res === false) setCurrentUserRank("Admin")
        })
        isUserOwner().then(res => {
            if (res === false) setCurrentUserRank("Owner")
        })
        fetchTeam().then(res => {
            if (!res) navigate("/recon/create-join-team")
            setTeam(res.data())
        });
    }, [user, loading]);
    return <div className='column'>
        {(currentUserRank === "Admin" || currentUserRank === "Owner") && <form id='custom-field-creation'>
            <h1>Create New Field:</h1>
            <FormInput
                name='name'
                type='text'
                onChange={changeInputs}
            />
            <FormInput
                name='type'
                type='select'
                options={[
                    { label: "Choose...", value: -1 },
                    { label: "Checkbox", value: 0 },
                    { label: "Number", value: 1 },
                    { label: "Select", value: 2 },
                    { label: "Short Response", value: 3 },
                    { label: "Extended Response", value: 4 },
                ]}
                onChange={changeInputs}
            />
            {inputs.type === '2' && <div id='options-editor'>
                <h2>Options:</h2>
                <ul>
                    {inputs.options ? inputs.options.map((o, i) => <li key={`option-${i}`} className='indv-option'>
                        {o}
                        <button className='remove-option' onClick={e => {
                            e.preventDefault();
                            let temp = inputs.options;
                            temp.splice(i, 1);
                            setInputs(i => ({ ...i, options: temp }));
                        }}>X</button>
                    </li>) : <p>No options provided.</p>}
                </ul>
                <div id='options-adder'>
                    <FormInput name='option_label' id='option-name' onChange={e => setCurrentOptionName(e.target.value)} />
                    <button id='submit-button' onClick={e => {
                        e.preventDefault();
                        setInputs(i => ({ ...i, options: [...i.options ? i.options : '', currentOptionName] }))
                    }}>Add Option</button>
                </div>
            </div>}

            <button id='submit-button' onClick={e => {
                e.preventDefault();
                if (inputs.type && inputs.type !== '-1' && inputs.name && inputs.name !== '') {
                    updateFields(inputs);
                } else {
                    toast('Please give a name and a valid input type!', {type: 'error'})
                }
            }}>Add Field</button>
        </form>}
        <div id='manage-custom-fields'>
            <h1>Current Fields:</h1>
            {team && team.fields ? team.fields.map(f => <CustomField field={f} deleteField={removeField} key={f.name} />) : <p>No fields created yet.</p>}
        </div>
    </div>
}

export default ManageInputs;