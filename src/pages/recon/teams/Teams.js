import React, { useRef } from "react";
import './teams.css';

function Teams() {
    const searchbar = useRef(null);

    const redirect = k => {
        if (k.key !== "Enter") return;

        window.location.pathname = `/recon/teams${searchbar.current.value ? '/' : ''}${searchbar.current.value}`;
    }

    return <>
        <div id='search-container'>
            <h1 id='search-heading'>Search for a team:</h1>
            <input id='searchbar' ref={searchbar} onKeyDown={redirect}></input>
        </div>
    </>
}

export default Teams;