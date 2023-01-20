import React, { useState, useEffect, useRef } from "react";
import './team-matches.css';
import { useParams } from "react-router-dom";

import db from '../../../../firebase.config';
import reconfig from '../../../../recon.config';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';
import backImage from '../../scout/media/field-image.png';

function TeamMatches() {
    const { team } = useParams();
    const [data, setData] = useState([]);
    const [teamAvg, setTeamAvg] = useState({});
    const entryRefs = useRef([]);
    const canvasRefs = useRef([]);
    const imageRef = useRef(null);

    useEffect(_ =>
        onSnapshot(doc(db, 'recon', 'entries'), doc =>
            setData(doc.data()[team])), []);

    useEffect(_ => {
        let avg = {};

        data.map(entry => {
            reconfig['data'].map(field => {
                if (field.name === 'team' || field.name === 'match') return;
                const value = dataFormat(field, entry[field.name]);
                switch (field.type) {
                    case 'array':
                        if (!avg[field.name]) {
                            avg[field.name] = value.map(_ => 0);
                        }
                        value.map((v, i) => {
                            avg[field.name][i] = avg[field.name][i] + (v / data.length);
                        })
                        break;
                    case 'grid':
                        break;
                    default:
                        avg[field.name] = (avg[field.name] ? avg[field.name] : 0) + (value / data.length);
                }
            })

        });

        setTeamAvg(avg);
    }, [data]);

    const dataFormat = (field, value) => {
        if (!value) return;
        switch (field.type) {
            case 'clickarea':
                return (Object.keys(value).map((val, i) => {
                    return {
                        name: field.options[i].label,
                        points: value[val]
                    }
                }))
            case 'grid':
                let val = [
                    [],
                    [],
                    []
                ]
                value.map((node, i) => {
                    val[Math.floor(i / 9)].push([node.auton, node.piece])
                });
                return val;
            case 'array':
                return field.options.map((o, i) => dataFormat(o, value[i]));
            default:
                return value;
        }
    }

    const displayData = (name, data, key) => {
        switch (name) {
            case 'alliance':
                return <div className={`team-color color-${data}`}>{data === 1 ? 'RED' : 'BLUE'}</div>
            case 'preset-pieces':
                return <>
                    <div className='preset-pieces-container'>
                        {data.map(d => <div className={`preset-piece piece-${d}`} />)}
                    </div>
                </>;
            case 'auton-path':
                if (canvasRefs.current.length > 0) {
                    const canvas = canvasRefs.current[key];
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
                    let prevX = data[0].points[0].x;
                    let prevY = data[0].points[0].y;
                    data[0].points.map(p => {
                        ctx.fillStyle = 'lime';
                        ctx.strokeStyle = 'lime';

                        ctx.beginPath();
                        ctx.arc(p.x * 300, p.y * 150, 3, 0, 2 * Math.PI);
                        ctx.moveTo(prevX * 300, prevY * 150);
                        ctx.lineTo(p.x * 300, p.y * 150);
                        ctx.stroke();

                        prevX = p.x;
                        prevY = p.y;
                    })
                };
                return <>
                    <canvas ref={e => canvasRefs.current[key] = e} className='auton-path-canvas' />
                </>
            case 'power-grid':
                return <>
                    <div className='power-grid-display'>
                        {data.map(row => row.map(node => <>
                            <div className={`power-grid-node piece-${node[1]}`}>
                                {node[0] ? 'A' : ''}
                            </div>
                        </>
                        )
                        )}
                    </div>
                </>
            default:

                return <>{data}</>;
        }
    }

    const displayAdditional = i => {
        entryRefs.current[i].hidden = !entryRefs.current[i].hidden;
        entryRefs.current[i].style.display = entryRefs.current[i].hidden ? 'table-cell' : 'none';
    }

    return <>
        <img src={backImage} ref={imageRef} hidden />
        <h1 id='team-number'>{team}</h1>
        {Object.keys(teamAvg).length > 0 && <div id='averages-container'>
            <div className='average-box'>
                <h2>Average Points/Match</h2>
                <h1>{teamAvg['points-scored']}</h1>
            </div>
            <div className='average-box'>
                <h2>Average Auton Charge Points</h2>
                <h1>{teamAvg['auton-charge-station']}</h1>
            </div>
            <div className='average-box'>
                <h2>Average Power Grid</h2>
                <h1>{teamAvg['points-scored'] - teamAvg['auton-charge-station'] - teamAvg['endgame-charge-station']}</h1>
            </div>
            <div className='average-box'>
                <h2>Preset Piece Patterns</h2>
                <div id='avg-preset-pieces'>
                    <h1 className={`avg-piece ${(teamAvg['preset-pieces'][0] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][0] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][0] - 1) / 1 : (teamAvg['preset-pieces'][0] - 1) / 1) * 100}%</h1>
                    <h1 className={`avg-piece ${(teamAvg['preset-pieces'][1] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][1] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][1] - 1) / 1 : (teamAvg['preset-pieces'][1] - 1) / 1) * 100}%</h1>
                    <h1 className={`avg-piece ${(teamAvg['preset-pieces'][2] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][2] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][2] - 1) / 1 : (teamAvg['preset-pieces'][2] - 1) / 1) * 100}%</h1>
                    <h1 className={`avg-piece ${(teamAvg['preset-pieces'][3] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][3] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][3] - 1) / 1 : (teamAvg['preset-pieces'][3] - 1) / 1) * 100}%</h1>
                </div>
            </div>
        </div>
        }
        <table id='match-list'>
            <thead>
                <tr id='headings'>
                    {reconfig['data'].map(field => (field.name !== 'team' && !field.additional) ? <th className='entries-head'>
                        {field.name.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, c => c.toUpperCase())}
                    </th> : '')}
                    <th>
                        <button className='entries-head' onClick={_ => entryRefs.current.map((_, i) => displayAdditional(i))}>Show All</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, k) => <>
                    <tr className='match-entry'>
                        {reconfig['data'].map((f, i) => (f.name !== 'team' && !f.additional) ? <td className={`entry-data data-point-${i}`}>
                            {displayData(f.name, dataFormat(f, entry[f.name]))}
                        </td> : '')}
                        <td className='entry-data'>
                            <button onClick={_ => displayAdditional(k)} className='entry-data'>More</button>
                        </td>
                    </tr>
                    <tr className='entry-additional'>
                        <td colspan='6' ref={e => entryRefs.current[k] = e}>
                            <div className='additional-info'>
                                {reconfig['data'].map((f, i) => (f.name !== 'exited-community' && f.additional) ? <div className={`additional-data data-point-${i}`}>
                                    {displayData(f.name, dataFormat(f, entry[f.name]), k)}
                                </div> : '')}
                            </div>
                        </td>
                    </tr>
                </>
                )}
            </tbody>
        </table>
    </>;
}

export default TeamMatches;