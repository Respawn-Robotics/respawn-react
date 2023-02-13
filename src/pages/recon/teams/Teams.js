import React, { useState, useEffect, useRef } from "react";
import './teams.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '../../../firebase.config';
import reconfig from '../../../recon.config';
import { onSnapshot, doc, query, collection, where, getDocs, updateDoc, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import backImage from '../scout/media/field-image.png';
import {SimpleLineChart, SimpleRadialChart} from "../../../lib/charts.js";
import { ResponsiveContainer } from "recharts";


function TeamMatches({ database, teamNum, admin, tName }) {
    const [teamAvg, setTeamAvg] = useState({});
    const [chartData, setChartData] = useState(null);
    const entryRefs = useRef([]);
    const canvasRefs = useRef([]);
    const imageRef = useRef(null);
    const [data, setData] = useState([]);
    useEffect(_ => setData(database ? database[teamNum] : []), [teamNum])

    useEffect(_ => {
        let avg = {};

        data?.map(entry => {
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
        console.log(formatChartData(data));
    }, [data]);

    const formatChartData = (data) => {
        let formattedChartData = [];
        data?.map(entry => {
            formattedChartData.push({
                'name': "Match " + entry['match'],
                'points': parseInt(entry['points-scored'])
            }) 
        })
        return formattedChartData;
    }

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
                ];
                let currentIndex = 0;
                for (let i = 0; i < 27; i++) {
                    if (value.length <= currentIndex || parseInt(value[currentIndex].substring(2)) !== i) {
                        val[Math.floor(i / 9)].push([false, 0]);
                    } else {
                        val[Math.floor(i / 9)].push([
                            value[currentIndex].charAt(1) === 'T' ? true : false,
                            parseInt(value[currentIndex].charAt(0))
                        ])
                        currentIndex++;
                    }
                }
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
                return <div className={`team-color color-${data}`}>{data === '1' ? 'RED' : 'BLUE'}</div>
            case 'preset-pieces':
                return <>
                    <div className='preset-pieces-container'>
                        {data?.map(d => <div className={`preset-piece piece-${d}`} />)}
                    </div>
                </>;
            case 'auton-path':
                if (canvasRefs.current.length > 0) {
                    const canvas = canvasRefs.current[key];
                    const ctx = canvas?.getContext('2d');
                    ctx?.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
                    let prevX = data[0]?.points[0]?.x;
                    let prevY = data[0]?.points[0]?.y;
                    data[0]?.points.map(p => {
                        if (ctx) {
                            ctx.fillStyle = 'lime';
                            ctx.strokeStyle = 'lime';
                        }

                        ctx?.beginPath();
                        ctx?.arc(p.x * 300, p.y * 150, 3, 0, 2 * Math.PI);
                        ctx?.moveTo(prevX * 300, prevY * 150);
                        ctx?.lineTo(p.x * 300, p.y * 150);
                        ctx?.stroke();

                        prevX = p.x;
                        prevY = p.y;
                    });
                }
                return <>
                    <canvas ref={e => canvasRefs.current[key] = e} className='auton-path-canvas' />
                </>
            case 'power-grid':
                return <>
                    <div className='power-grid-display'>
                        {data?.map(row => row.map(node => <>
                            <div className={`power-grid-node piece-${node[1]}`}>
                                {node[0] ? 'A' : ''}
                            </div>
                        </>
                        ))}
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

    const deleteEntry = match => {
        toast.promise(updateDoc(doc(db, 'recon', tName), {[teamNum] : arrayRemove(match)}), {
            pending: "Deleting...",
            success: "Deleted successfully!",
            pending: "Deleting failed!"
        });
    }

    return <>
        <img src={backImage} ref={imageRef} hidden='hidden' />
        <h1 id='team-number'>{teamNum}</h1>
        {Object.keys(teamAvg).length > 0 && 
        <>
            <div id='averages-container'>
                <div className='average-box'>
                    <h2>Average Points/Match</h2>
                    <h1>{teamAvg['points-scored'].toFixed(1)}</h1>
                </div>
                <div className='average-box'>
                    <h2>Average Endgame Charge Points</h2>
                    <h1>{teamAvg['endgame-charge-station'].toFixed(1)}</h1>
                </div>
                <div className='average-box'>
                    <h2>Average Power Grid</h2>
                    <h1>{(teamAvg['points-scored'] - teamAvg['auton-charge-station'] - teamAvg['endgame-charge-station']).toFixed(1)}</h1>
                </div>
                <div className='average-box'>
                    <h2>Preset Piece Patterns</h2>
                    <div id='avg-preset-pieces'>
                        <h1 className={`avg-piece ${(teamAvg['preset-pieces'][0] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][0] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][0] - 1) / 1 : (teamAvg['preset-pieces'][0] - 1) / 1).toFixed(2) * 100}%</h1>
                        <h1 className={`avg-piece ${(teamAvg['preset-pieces'][1] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][1] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][1] - 1) / 1 : (teamAvg['preset-pieces'][1] - 1) / 1).toFixed(2) * 100}%</h1>
                        <h1 className={`avg-piece ${(teamAvg['preset-pieces'][2] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][2] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][2] - 1) / 1 : (teamAvg['preset-pieces'][2] - 1) / 1).toFixed(2) * 100}%</h1>
                        <h1 className={`avg-piece ${(teamAvg['preset-pieces'][3] - 1) / 1 < 0.5 ? 'piece-cone' : 'piece-cube'}`}>{(((teamAvg['preset-pieces'][3] - 1) / 1) < 0.5 ? 1 - (teamAvg['preset-pieces'][3] - 1) / 1 : (teamAvg['preset-pieces'][3] - 1) / 1).toFixed(2) * 100}%</h1>
                    </div>
                </div>
            </div>
            <div id='averages-container'>
                <ResponsiveContainer width="99%" aspect={2} maxHeight={300} className='charts-box'>
                    <SimpleLineChart data={formatChartData(data)}/>
                </ResponsiveContainer>
                <ResponsiveContainer width="99%" aspect={2} maxHeight={300} className='charts-box'>
                    <SimpleRadialChart />
                </ResponsiveContainer>
            </div>
        </>
        }
        <table id='match-list'>
            <thead>
                <tr id='headings'>
                    {admin && <th className='entries-head'>Delete</th>}
                    {reconfig['data'].map((field, i) => (field.name !== 'team' && !field.additional) ? <th key={`heading-${i}`} className='entries-head'>
                        {field.name.replace(/(-|_)+/g, " ").toLowerCase().replace(/(^|\s)[a-z]/g, c => c.toUpperCase())}
                    </th> : '')}
                    <th className='entries-head'>Author</th>
                    <th>
                        <button className='entries-head' onClick={_ => entryRefs.current.map((_, i) => displayAdditional(i))}>Show All</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((entry, k) => <>
                    <tr key={`main-${k}`} className='match-entry'>
                        {admin && <td className='entry-data data-point-author' onClick={_ => deleteEntry(entry)}><button className='delete-button'>X</button></td>}
                        {reconfig['data'].map((f, i) => (f.name !== 'team' && !f.additional) ? <td className={`entry-data data-point-${i}`}>
                            {displayData(f.name, dataFormat(f, entry[f.name]))}
                        </td> : '')}
                        <td className='entry-data data-point-author'>{entry.author}</td>
                        <td className='entry-data'>
                            <button onClick={_ => displayAdditional(k)} className='entry-data'>More</button>
                        </td>
                    </tr>
                    <tr key={`additional-${k}`} className='entry-additional'>
                        <td colSpan='8' ref={e => entryRefs.current[k] = e}>
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

function Teams() {
    const [data, setData] = useState([]);
    const [team, setTeam] = useState(0);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [teamName, setTeamName] = useState();
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const fetchTeamName = async () => {
        const q = query(collection(db, "teams"), where("users", "array-contains", user?.uid));

        const doc = await getDocs(q);

        return doc;
    }

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


    useEffect(_ => {
        if (loading) return
        if (!user) return navigate('/signin')
        isUserAdmin().then(res => {
            if (res == false) setIsAdmin(true)
        });
        isUserOwner().then(res => {
            if (res == false) setIsAdmin(true)
        });
        fetchTeamName().then(userData => {
            onSnapshot(doc(db, 'recon',
                userData.docs[0].data().teamName), doc => setData(doc.data()));
            setTeamName(userData.docs[0].data().teamName);
        });
    }, [user, loading]);

    const changeTeam = e => setTeam(parseInt(e.target.value ? e.target.value : 0));
    return <>
        <div id='search-container'>
            <label htmlFor='searchbar' id='search-heading'>Search for a team:</label>
            <input id='searchbar' type='number' onChange={changeTeam}></input>
        </div>
        <TeamMatches
            database={data}
            teamNum={team}
            admin={isAdmin}
            tName={teamName}
        />
    </>
}

export default Teams;