import React, { useState, useEffect, useRef } from "react";
import './teams.css';
import { useParams } from "react-router-dom";

import db from '../../../firebase.config';
import reconfig from '../../../recon.config';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';

function Teams() {
    const { team } = useParams();
    const [data, setData] = useState([]);
    const [teamAvg, setTeamAvg] = useState({});

    useEffect(_ =>
        onSnapshot(doc(db, 'recon', 'entries'), doc =>
            setData(doc.data()[team])), []);

    useEffect(_ => {
        let avg = {};

        data.map(entry => {
            reconfig['data'].map(field => {
                avg[field.name] = field['type'] !== 'select' ? field['default'] : 0;

                if (field.name === 'team' || field.name === 'match') return;
                const value = dataFormat(field, entry[field.name]);
                switch (field.type) {
                    case 'clickarea':
                        if (field.lines) break;

                        return 0;
                    default:
                        avg[field.name] += value / data.length;
                }
            })

            console.log(avg)
        });

        // if (Object.keys(avg).length > 0) {
        //     avg['points-scored'] = avg['points-scored'].toFixed(1);
        //     avg['auton-charge-station'] = avg['auton-charge-station'].toFixed(1);
        //     avg['endgame-charge-station'] = avg['endgame-charge-station'].toFixed(1);
        //     avg['power-grid'] = (avg['points-scored'] - avg['auton-charge-station'] - avg['endgame-charge-station']).toFixed(1);
        // }

        // console.log(dataFormat({type: 'array', options: [{type : 'power-grid'}, {type : 'power-grid'}]},[ [{piece: 'cone', auton: true}], [{piece: 'cube', auton: false}]]))
        setTeamAvg(avg);
    }, [data]);

    const dataFormat = (field, value) => {
        if (!value) return;
        switch (field.type) {
            case 'clickarea':
                return <canvas>
                    
                </canvas>
            case 'grid':
                let val = {
                    'auton-cubes': 0,
                    'auton-cones': 0,
                    'teleop-cubes': 0,
                    'teleop-cones': 0
                }

                value.map(node => {
                    if (node.piece !== 'cone' && node.piece !== 'cube') return;

                    node.piece === 'cone' ?
                        node.auton ? val['auton-cones']++ : val['teleop-cones']++ :
                        node.auton ? val['auton-cubes']++ : val['teleop-cubes']++;
                });

                return val;
            case 'array':
                return field.options.map((o, i) => dataFormat(o, value[i]));
            default:
                return value;
        }
    }

    return <>
        <h1 id='team-number'>{team}</h1>
        <div id='match-list'>
            <div id='headings'>
                {
                    Object.keys(data[0] ? data[0] : []).sort().map(head => <h1 className='entries-head'>
                        {head.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, c => c.toUpperCase())}
                    </h1>)
                }
            </div>
            {data.map(entry => <div className='match-entry'>
                {Object.keys(entry).sort().map((k, i) => <div className={`entry-data-${i}`}>
                    bruh
                </div>)}
            </div>)}
        </div>
    </>;
}

export default Teams;