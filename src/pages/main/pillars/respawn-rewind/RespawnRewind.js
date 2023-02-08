import React from "react";
import './respawn-rewind.css';
import Alum from "../../../../components/alum/Alum";

function RespawnRewind() {
    return <>
        <div id='rewind-intro'>
            <h1>Respawn Rewind</h1>
            <h3>Where they are now</h3>
        </div>
            <h1 style={{color: 'red', fontFamily: 'roboto-slab', textAlign: 'center', fontSize: '3rem'}}>FUTURE ALUMS WILL BE POSTED HERE</h1>
        <div id='alumnis-container'>
            {/* <Alum 
                content={{
                    name: 'Dev Bhagat',
                    titles: ['CTO'],
                    desc: "BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME BEST IN THE GAME ",
                    year: 2023
                }}
                image='https://th.bing.com/th/id/OIP.YQqrNNzp_SRwlkaDUaLLwgHaEo?w=269&h=180&c=7&r=0&o=5&dpr=1.8&pid=1.7'
            /> */}
        </div>
    </>
}

export default RespawnRewind;