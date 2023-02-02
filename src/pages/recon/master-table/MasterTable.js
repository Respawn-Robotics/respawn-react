import React, { useState, useEffect } from "react";
import './master-table.css';

import db from '../../../firebase.config';
import reconfig from '../../../recon.config';
import { onSnapshot, doc, query, collection, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function MasterTable() {
    const [data, setData] = useState([]);
    const [averages, setAverages] = useState({});
    const [sortField, setField] = useState('points-scored');
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));

        const doc = await getDocs(q);

        return doc;
    }

    useEffect(_ => {
        if (loading) return
        if (!user) return navigate('/signin')
        fetchTeamName().then(userData => onSnapshot(doc(db, 'recon',
            userData.docs[0].data().teamName), doc => setData(doc.data())));
    }, [user, loading]);

    useEffect(_ => {
        let avg = {};

        Object.keys(data).map(team => {
            avg[team] = {};
            data[team].map(entry => {
                reconfig['data'].map(field => {
                    if (field.name === 'team' || field.name === 'match') return;
                    switch (field.type) {
                        case 'number':
                            if (!avg[team][field.name]) {
                                avg[team][field.name] = entry[field.name] / data[team].length;
                                return;
                            }
                            avg[team][field.name] += entry[field.name] / data[team].length;
                            return;
                        case 'select':
                            if (!avg[team][field.name]) {
                                avg[team][field.name] = entry[field.name] / data[team].length;
                                return;
                            }
                            avg[team][field.name] += entry[field.name] / data[team].length;
                            return;
                        default:
                            return;
                    }
                })
            })
        })

        Object.keys(avg).map(a => {
            a = avg[a];

            a['points-scored'] = a['points-scored'].toFixed(1);
            a['auton-charge-station'] = a['auton-charge-station'].toFixed(1);
            a['endgame-charge-station'] = a['endgame-charge-station'].toFixed(1);

            a['power-grid'] = (a['points-scored'] - a['auton-charge-station'] - a['endgame-charge-station']).toFixed(1);
        });

        setAverages(avg);
    }, [data]);

    return (
        <>
            <table id='master-table'>
                <thead>
                    <tr className='master-table-row'>
                        <th className='master-table-cell master-table-heading'>Team</th>
                        {Object.keys(averages[Object.keys(averages)[0]] ? averages[Object.keys(averages)[0]] : {}).map((field) => {
                            return (
                                <th className='master-table-cell master-table-heading' onClick={_ => setField(field)}>
                                    Average {field.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, (c) => c.toUpperCase())}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(averages).sort((a, b) => averages[b][sortField] - averages[a][sortField]).map(team => {
                        return (
                            <tr className='master-table-row' id={team.id}>
                                <td className='master-table-cell'>{team}</td>
                                {Object.keys(averages[team]).map(a => <td className='master-table-cell'>{averages[team][a]}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default MasterTable;