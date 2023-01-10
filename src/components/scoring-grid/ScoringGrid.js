import React, { useEffect, useRef, useState } from "react";
import './scoring-grid.css';

function ScoringGrid(props) {
    let [cells, setCells] = useState(Array.from({ length: 27 }, _ => {return {}}));

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
        props.onChange(_, { name: 'power-grid', value: cells }); 
    }, cells)

    return (
        <>
            <input type='checkbox' ref={checkbox} />
            <div className='scoring-grid'>
                {cells.map((_, index) => {
                    return (
                        <div className="scoring-grid-cell option-3" onClick={e => {
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