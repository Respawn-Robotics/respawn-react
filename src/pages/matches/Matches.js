import React from "react";
import './matches.css';

function Matches() {
    const getData = _ => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', _ => {
            console.log(JSON.parse(xhr.responseText));
        });

        xhr.open('GET', 'https://www.thebluealliance.com/api/v3/team/frc325/event/2022paca/matches');
        xhr.setRequestHeader('X-TBA-Auth-Key', process.env.REACT_APP_tbaKey);
        xhr.send();
    }

    getData();

    return <>
        <input type='number' />
    </>;
}

export default Matches;