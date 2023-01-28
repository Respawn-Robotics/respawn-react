import React, { useEffect, useState } from "react";
import './matches.css';

import db from '../../../firebase.config';
import { onSnapshot, doc, getDoc } from 'firebase/firestore';


function Matches() {
    const [matches, setMatches] = useState({});

    useEffect(_ =>
        onSnapshot(doc(db, 'recon', 'entries'), doc => {
            const docData = doc.data();
            let tempMatches = {};
            console.log(docData)

            Object.keys(docData).map(teamNumber => {
                docData[teamNumber].map(teamMatch => {
                    console.log(teamMatch)
                    // teamMatch['team'] = teamNumber;
                    // tempMatches[teamMatch.match] = [...tempMatches[teamMatch.match], teamMatch];
                });
            });

            console.log(tempMatches);
        }), []);

    const getMatches = _ => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', _ => {
            console.log(JSON.parse(xhr.responseText));
        });

        xhr.open('GET', 'https://www.thebluealliance.com/api/v3/team/frc325/event/2022paca/matches');
        xhr.setRequestHeader('X-TBA-Auth-Key', process.env.REACT_APP_tbaKey);
        xhr.send();
    }

    return <>
        <input type='number' />
    </>;
}

export default Matches;