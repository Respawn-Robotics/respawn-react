import React, { useEffect, useMemo, useState } from "react";
import './matches.css';

import db from '../../../firebase.config';
import { onSnapshot, doc } from 'firebase/firestore';

function Matches() {
    const [allMatchesData, setAllMatchesData] = useState()
    const [matchesPlayed, setMatchesPlayed] = useState({});
    const [matchNo, setMatchNo] = useState(0);

    useEffect(_ =>
        onSnapshot(doc(db, 'recon', 'entries'), doc => {
            const docData = doc.data();
            let tempMatches = {};

            Object.keys(docData).map(teamNumber => {
                docData[teamNumber].map(teamMatch => {
                    teamMatch['team'] = teamNumber;
                    tempMatches[teamMatch.match] = tempMatches[teamMatch.match] ? [...tempMatches[teamMatch.match], teamMatch] : [teamMatch];
                });
            });

            setMatchesPlayed(tempMatches);
        }), []);

    async function fetchMatches() {
        const apiCall = fetch('https://www.thebluealliance.com/api/v3/event/2022paca/matches', {
            cache: 'force-cache',
            method: 'GET',
            headers: {
                'X-TBA-Auth-Key': process.env.REACT_APP_tbaKey
            }
        })
            .then(response => response.json())
            .then(json => json
                .filter(match => match['comp_level'] === 'qm')
                .map(match => Object.keys(match['alliances'])
                    .map(alliance => { return { [alliance]: match['alliances'][alliance]['team_keys'] } })
                ));

        return await apiCall;
    }

    const DisplayMatch = _ => <>
        
    </>

    const changeMatchNo = e => setMatchNo(parseInt(e.target.value ? e.target.value : 0));

    return <>
        <input type='number' onChange={changeMatchNo} />
        <DisplayMatch />
    </>;
}

export default Matches;