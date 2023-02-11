import React, { useState, useEffect } from "react";
import './master-table.css';

import db from '../../../firebase.config';
import reconfig from '../../../recon.config';
import FormInput from "../../../components/form-input/FormInput";
import { onSnapshot, doc, query, collection, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function MasterTable() {
    const [data, setData] = useState([]);
    const [averages, setAverages] = useState({});
    const [sortField, setField] = useState('points-scored');
    const [numericalFields, setNumericalFields] = useState([]);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));

        const doc = await getDocs(q);

        return doc;
    }

    const getNumericalInputs = inputs => {
        return inputs
            .filter(f =>
                f.type === 'checkbox' ||
                f.type === 'number' ||
                f.type === 'select' ||
                f.type === 'togglebutton' ||
                f.type === '0' ||
                f.type === '1' 
            )
            .map(f => {
                return f.name;
            });
    }

    useEffect(_ => {
        if (loading) return
        if (!user) return navigate('/signin')
        fetchTeamName().then(userData => {
            setNumericalFields(i => i.concat(getNumericalInputs(userData.docs[0].data().fields)));
            onSnapshot(doc(db, 'recon',
                userData.docs[0].data().teamName), doc => setData(doc.data()))
        });
    }, [user, loading]);

    useEffect(_ => {
        setNumericalFields(getNumericalInputs(reconfig.data))
    }, []);

    useEffect(_ => {
        const avg = Object.keys(data).reduce((averages, teamNum) => {
            console.log(numericalFields)
            averages[teamNum] = numericalFields
            .filter(f =>
                f !== 'team' &&
                f !== 'match' &&
                f !== 'alliance'
            )
            .reduce((result, field) => {
                result[field] = (data[teamNum].reduce((sum, m) => sum +
                    (typeof m[field] === 'boolean' || typeof m[field] === 'number' ? m[field] : parseInt(m[field]))
                , 0) / data[teamNum].length).toFixed(1);
                return result;
            }, {});
            return averages;
        }, {});
        console.log(avg)
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