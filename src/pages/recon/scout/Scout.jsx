import React, { useState, useEffect } from "react";
import './manage-team.css';
import User from "../../../../components/user/User";
import FormInput from "../../../../components/form-input/FormInput";
import { updateDoc, arrayUnion, query, collection, where, getDocs, doc, getDoc, onSnapshot, setDoc, arrayRemove, deleteDoc } from 'firebase/firestore';
import db from '../../../../firebase.config';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { toast } from 'react-toastify';

function CustomField({ field }) {
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
    </div>
}

function ManageTeam() {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const [currentUserRank, setCurrentUserRank] = useState("");
    const [teamRegionals, setTeamRegionals] = useState([])
    const [scoutingData, setScoutingData] = useState({});
    const [team, setTeam] = useState(null)
    const [users, setUsers] = useState([])
    const [inputs, setInputs] = useState({ email: "" });

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

    const fetchTeamUsers = async (teamData) => {
        const q = query(collection(db, "users"), where("team", "==", teamData.teamName.toString()));
        const docs = await getDocs(q);
        let userArray = [];
        docs.forEach(doc => {
            const data = doc.data()
            userArray.push(data)
        })
        return userArray
    }

    const deleteTeam = () => {
        const teamDocRef = doc(db, "teams", team.teamName);
        users.forEach(user => {
            updateDoc(doc(db, "users", user.uid), {
                team: ""
            })
        })
        deleteDoc(teamDocRef)
        toast("Successfuly deleted " + team.teamName + "!")
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
            if (!res) navigate("/recon/create-join-team");
            setTeam(res.data());
            (async num => {
                fetch(`https://www.thebluealliance.com/api/v3/team/frc${num}/events/2023`, {
                    method: 'GET',
                    headers: {
                        'X-TBA-Auth-Key': import.meta.env.VITE_tbaApiKey,
                    }
                })
                    .then(async data => {
                        setTeamRegionals((await data.json())
                            .map(reg => {
                                return {
                                    name: reg.name,
                                    id: reg.event_code
                                }
                            }));
                    });
            })(res.data().teamNumber);
            onSnapshot(doc(db, 'recon', `${res.data().teamName}-${res.data().regional}`), doc => setScoutingData(doc.data()));
            fetchTeamUsers(res.data()).then(u => setUsers(u.sort((a, b) => {
                if (res.data().owner === a.uid) return -1;
                if (res.data().owner === b.uid) return 1;
                if (res.data().admins?.includes(a.uid)) {
                    if (res.data().admins?.includes(b.uid)) return 0;
                    return -1;
                }
                if (res.data().admins?.includes(b.uid)) return 1;
                return 0;
            })))
        });
    }, [user, loading]);

    useEffect(_ => console.log(teamRegionals), [teamRegionals])

    const changeInputs = (e) => {
        const target = e.currentTarget;

        const name = target.id;
        let value = null;

        switch (target.type) {
            case "number":
                value = parseInt(target.value);
                break;
            case "checkbox":
                value = target.checked;
                break;
            default:
                value = target.value.toLocaleLowerCase();

        }
        setInputs(values => ({ ...values, [name]: value }));
    }

    const sendData = async () => {
        const payload = inputs;
        const invitesDocRef = doc(db, "invites", inputs.email);

        const invitesSnap = await getDoc(invitesDocRef);

        payload.team = team.teamName;
        if (invitesSnap.exists()) {
            toast("That user has already been invited!");
        } else {
            setDoc(invitesDocRef, {
                ...payload
            })
            setInputs({ email: "" })
            toast("Successfully sent invite!");
        }
    }

    const promoteUser = (uid, userData) => {
        const teamDocRef = doc(db, "teams", team.teamName);
        updateDoc(teamDocRef, {
            admins: arrayUnion(uid)
        })

        toast("Successfuly promoted " + userData.displayName + "!")
    }

    const demoteUser = (uid, userData) => {

        const teamDocRef = doc(db, "teams", team.teamName);
        updateDoc(teamDocRef, {
            admins: arrayRemove(uid)
        })

        toast("Successfuly demoted " + userData.displayName + "!")
    }

    const updateRegional = reg => {
        if (reg === "-1") return;
        const teamDocRef = doc(db, "teams", team.teamName);
        updateDoc(teamDocRef, {
            regional: reg
        });
        toast("Successfully updated regional!");
    }

    const kickUser = (uid) => {
        const teamDocRef = doc(db, "teams", team.teamName);
        const usersDocRef = doc(db, "users", uid);
        updateDoc(teamDocRef, {
            admins: arrayRemove(uid)
        })

        updateDoc(teamDocRef, {
            users: arrayRemove(uid)
        })

        updateDoc(usersDocRef, {
            team: ""
        })
        toast("Successfully kicked user!");
    }


    return <>
        {team ?
            <>
                <h1 className='header' id='team-name'>Team Name: <o>{team.teamName}</o></h1>
                {(currentUserRank === "Admin" || currentUserRank === "Owner") && <>
                    <div id="regional-selection">
                        <FormInput 
                            name='select-regional'
                            type='select'
                            options={[{
                                label: 'Select...',
                                value: -1
                            }, ...teamRegionals.map(reg => {return {
                                label: reg.name,
                                value: reg.id
                            }})]}
                            value={team.regional}
                            onChange={e => updateRegional(e.target.value)}
                        />
                    </div>
                    <div className='column'>
                        <form id='send-invite-form'>
                            <h1 className='header'>Send Invite:</h1>
                            <FormInput inputId='email' type='textarea' name='Email' onChange={changeInputs} value={inputs.email} />
                            <button id='submit-button' type='button' onClick={sendData}>SUBMIT</button>
                        </form>
                        <div id='custom-inputs'>
                            <h1>Custom Scout Fields:</h1>
                            <div id='custom-fields'>
                                {team.fields ? team.fields.map(f => <CustomField field={f} />) : <p>No custom fields created yet.</p>}
                            </div>
                            <button onClick={_ => navigate('/recon/manage-inputs')}>Manage</button>
                        </div>
                    </div>
                </>}
                <h1 className='header'>Users:</h1>
                <div id='users-container'>
                    <div id='user-headings'>
                        <h1>Name</h1>
                        <h1>Email</h1>
                        <h1>Rank</h1>
                        <h1>No. Of Scouts</h1>
                    </div>
                    {users.map(i => <User
                        userData={i}
                        key={i.uid}
                        admin={(currentUserRank === "Admin" || currentUserRank === "Owner")}
                        rank={
                            team.owner === i.uid ? 'Owner' :
                                team.admins.includes(i.uid) ? 'Admin' :
                                    'User'
                        }
                        scoutData={scoutingData}
                        currentUserRank={currentUserRank}
                        kickUser={kickUser}
                        promoteUser={promoteUser}
                        demoteUser={demoteUser}
                        deleteTeam={deleteTeam}
                    />)}
                </div>
                {(currentUserRank === "Owner") && <div className="delete-team-button">
                    <button id='submit-button' onClick={deleteTeam}>DELETE TEAM</button>
                    <h2>WARNING: THIS CANNOT BE UNDONE</h2>
                </div>}
            </>

            : <> Loading... </>}

    </>
}

export default ManageTeam;
