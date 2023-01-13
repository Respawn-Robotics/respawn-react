import React, { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import './master-table.css';

import db from '../../../firebase.config';
import reconfig from '../../../recon.config';
import { onSnapshot, collection } from 'firebase/firestore';

function MasterTable() {
    const [data, setData] = useState([]);
    const [averages, setAverages] = useState({});

    const functions = getFunctions();
    const getAverages = httpsCallable(functions, 'getAverages');
    getAverages({ team: 'all' })
        .then((result) => {
            console.log(result.data);
        });
    useEffect(_ =>
        onSnapshot(collection(db, "recon"), snapshot =>
            setData(snapshot.docs.map(doc => doc.data()))), []);

    useEffect(_ => {
        let sortedList = {};
        let avg = {};

        data.map(entry => {
            if (!sortedList[entry.team]) {
                sortedList[entry.team] = [entry];
                avg[entry.team] = {};
                return;
            }

            sortedList[entry.team].push(entry);
        })

        Object.keys(sortedList).map(team => {
            sortedList[team].map(entry => {
                reconfig['data'].map(field => {
                    if (field.name === 'team' || field.name === 'match') return;
                    switch (field.type) {
                        case 'number':
                            if (!avg[team][field.name]) {
                                avg[team][field.name] = entry[field.name] / sortedList[team].length;
                                return;
                            }
                            avg[team][field.name] += entry[field.name] / sortedList[team].length;
                            return;
                        case 'select':
                            const mappedOptions = field.options.reduce((acc, _, i) => {
                                acc[field.options[i]] = i;
                                return acc;
                            }, {});

                            if (!avg[team][field.name]) {
                                avg[team][field.name] = mappedOptions[entry[field.name]] / sortedList[team].length;
                                return;
                            }
                            avg[team][field.name] += mappedOptions[entry[field.name]] / sortedList[team].length;
                            return;
                        default:
                            return;
                    }
                })
            })
        })

        setAverages(avg);
    }, [data])

    useEffect(_ => console.log(averages), [averages])

    return (
        <>
            <table id='master-table'>
                <thead>
                    <tr className='master-table-row'>
                        <th className='master-table-cell master-table-heading'>Team</th>
                        {Object.keys(averages[Object.keys(averages)[0]] ? averages[Object.keys(averages)[0]] : {}).map((field) => {
                            return (
                                <th className='master-table-cell master-table-heading'>
                                    {field.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, (c) => c.toUpperCase())}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(averages).map(team => {
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