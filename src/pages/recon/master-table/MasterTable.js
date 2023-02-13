import React, { useState, useEffect, useRef } from "react";
import './master-table.css';

import db from '../../../firebase.config';
import reconfig from '../../../recon.config';
import { onSnapshot, doc, query, collection, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { SimpleLineChart, SimpleRadialChart } from "../../../lib/charts.js";
import { ResponsiveContainer } from "recharts";

function MasterTable() {
    const [data, setData] = useState({});
    const [averages, setAverages] = useState({});
    const [maximums, setMaximums] = useState({});
    const [sortField, setField] = useState('points-scored');
    const chartRefs = useRef([]);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));
        const doc = await getDocs(q);
        return doc;
    }

    const formatChartData = (data, type, team) => {
        switch (type) {
            case 'line':
                return data[team].map(entry => {
                    return {
                        'name': "Match " + entry['match'],
                        'points': parseInt(entry['points-scored'])
                    }
                });
            case 'radial':
                return Object.keys(averages[team]).map(k => {return {
                    subject: k.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, (c) => c.toUpperCase()),
                    A: parseFloat(averages[team][k]),
                    fullMark: 50
                }});
        }
    }

    useEffect(_ => {
        if (loading) return
        if (!user) return navigate('/signin')
        fetchTeamName().then(userData => onSnapshot(doc(db, 'recon',
            userData.docs[0].data().teamName), doc => setData(
                Object.keys(doc.data())
                    .reduce((sortedData, team) => {
                        sortedData[team] = doc.data()[team]
                            .sort((a, b) => parseInt(a['match']) < parseInt(b['match']) ? -1 : 1);
                        return sortedData;
                    }, {})
            )));
    }, [user, loading]);

    useEffect(_ => {
        let avg = {};

        Object.keys(data).map(team => {
            if (data[team].length < 1) return;
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

    const displayAdditional = i => {
        chartRefs.current[i].hidden = !chartRefs.current[i].hidden;
        chartRefs.current[i].style.display = chartRefs.current[i].hidden ? 'flex' : 'none';
    }

    return (
        <>
            <div id='master-table'>
                <div className='master-table-row'>
                    <div className='master-table-cell master-table-heading'>Team</div>
                    {Object.keys(averages[Object.keys(averages)[0]] ? averages[Object.keys(averages)[0]] : {}).map((field) => {
                        return (
                            <div className='master-table-cell master-table-heading' onClick={_ => setField(field)}>
                                Average {field.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, (c) => c.toUpperCase())}
                            </div>
                        );
                    })}
                    <div className='master-table-cell master-table-heading' onClick={_ => chartRefs.current.forEach((_, i) => displayAdditional(i))}>
                        Show All Charts
                    </div>
                </div>
                {Object.keys(averages).sort((a, b) => averages[b][sortField] - averages[a][sortField]).map((team, k) => {
                    return <>
                        <div className='master-table-row'>
                            <td className='master-table-cell'><o>{team}</o></td>
                            {Object.keys(averages[team]).map(a => <td className='master-table-cell'>{averages[team][a]}</td>)}
                            <td className='master-table-cell' onClick={_ => displayAdditional(k)}>Show Charts</td>
                        </div>
                        <div className='column' id='master-charts-container' ref={e => chartRefs.current[k] = e}>
                            <div className='master-chart-container'>
                                <ResponsiveContainer width="100%" aspect={2} maxHeight={200} className='master-charts-box'>
                                    <SimpleLineChart data={formatChartData(data, 'line', team)} />
                                </ResponsiveContainer>
                            </div>
                            <div className='master-chart-container'>
                                <ResponsiveContainer width="100%" aspect={2} maxHeight={200} className='master-charts-box'>
                                    <SimpleRadialChart data={formatChartData(data, 'radial', team)} />
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                })}
            </div>
        </>
    );
}

export default MasterTable;