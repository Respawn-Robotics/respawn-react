import React, { useEffect, useRef, useState } from "react";
import './scoring-grid.css';

function ScoringGrid(props) {
    const [cells, setCells] = useState(Array.from({ length: 27 }, _ => { return { piece: 'none', auton: false } }));

    const checkbox = useRef(null);

    const updateCell = (index, field, value) => {
        setCells(cells.map((cell, i) =>
            i === index
                ? {
                    ...cell,
                    [field]: value
                }
                : {
                    ...cell
                }
        ))
    }

    const toggleCone = (e, i) => {
        if (checkbox.current.checked) {
            updateCell(i, 'auton', !cells[i]['auton']);
            e.target.innerHTML = e.target.innerHTML === '' ? 'A' : '';
            return;
        }

        if (cells[i]['piece'] === 'none') {
            e.target.className = 'scoring-grid-cell option-1';
            updateCell(i, 'piece', 'cone');
        } else {
            e.target.className = 'scoring-grid-cell option-3';
            updateCell(i, 'piece', 'none');
        }
    }

    const toggleCube = (e, i) => {
        if (checkbox.current.checked) {
            updateCell(i, 'auton', !cells[i]['auton']);
            e.target.innerHTML = e.target.innerHTML === '' ? 'A' : '';
            return;
        }

        if (cells[i]['piece'] === 'none') {
            e.target.className = 'scoring-grid-cell option-2';
            updateCell(i, 'piece', 'cube');
        } else {
            e.target.className = 'scoring-grid-cell option-3';
            updateCell(i, 'piece', 'none');
        }
    }

    const toggleBoth = (e, i) => {
        if (checkbox.current.checked) {
            updateCell(i, 'auton', !cells[i]['auton']);
            e.target.innerHTML = e.target.innerHTML === '' ? 'A' : '';
            return;
        }

        switch (cells[i]['piece']) {
            case 'none':
                e.target.className = 'scoring-grid-cell option-1';
                updateCell(i, 'piece', 'cone');
                break;
            case 'cone':
                e.target.className = 'scoring-grid-cell option-2';
                updateCell(i, 'piece', 'cube');
                break;
            default:
                e.target.className = 'scoring-grid-cell option-3';
                updateCell(i, 'piece', 'none');
        }
    }

    useEffect(_ => {
        const scored = cells
            .map((cell, i) => {
                if (cell['piece'] === 'none') return;
                return `${cell['piece'] === 'cone' ? '1' : '2'}${cell['auton'] ? 'T' : 'F'}${i}`
            })
            .filter(c => c !== undefined);

        props.onChange(_, { name: 'power-grid', value: scored });
    }, [cells])

    return (
        <>
            <div className='auton-toggle'>
                <label>Auton: </label>
                <input type='checkbox' ref={checkbox} />
                <span />
            </div>
            <div className='scoring-grid'>
                {cells.map((_, index) => {
                    return (
                        <div coop={index % 9 > 2 && index % 9 < 6 ? 'true' : 'false'} className="scoring-grid-cell option-3" onClick={e => {
                            return (
                                index - 18 >= 0 ? toggleBoth(e, index) :
                                    (index + 2) % 3 === 0 ? toggleCube(e, index) :
                                        toggleCone(e, index)
                            );
                        }
                        }>

                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ScoringGrid;