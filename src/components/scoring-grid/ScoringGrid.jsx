import React, { useEffect, useRef, useState } from "react";
import './scoring-grid.css';

function ScoringGrid(props) {
    const [cells, setCells] = useState(Array.from({ length: 27 }, _ => { return { piece: 'none', auton: false, supercharged: false } }));

    const autonToggle = useRef(null);
    const superchargedToggle = useRef(null);

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
        if (autonToggle.current.checked) {
            updateCell(i, 'auton', !cells[i]['auton']);
            e.target.innerHTML = e.target.innerHTML === '' ? 'A' : '';
            return;
        }

        if (superchargedToggle.current.checked) {
            updateCell(i, 'supercharged', !cells[i]['supercharged']);
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
        if (autonToggle.current.checked) {
            updateCell(i, 'auton', !cells[i]['auton']);
            e.target.innerHTML = e.target.innerHTML === '' ? 'A' : '';
            return;
        }

        if (superchargedToggle.current.checked) {
            updateCell(i, 'supercharged', !cells[i]['supercharged']);
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
        if (autonToggle.current.checked) {
            updateCell(i, 'auton', !cells[i]['auton']);
            e.target.innerHTML = e.target.innerHTML === '' ? 'A' : '';
            return;
        }

        if (superchargedToggle.current.checked) {
            updateCell(i, 'supercharged', !cells[i]['supercharged']);
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

    const updateData = _ => {
        props.onChange(_, { name: 'power-grid', value: cells
        .map((cell, i) => {
            if (cell['piece'] === 'none') return;
            return `${cell['piece'] === 'cone' ? '1' : '2'}${cell['auton'] ? 'T' : 'F'}${cell['supercharged'] ? 'S' : 'N'}${i}`
        })
        .filter(c => c !== undefined) })
    }

    useEffect(_ => {
        let tempCells = cells;

        props.value?.forEach(node => {
            tempCells[parseInt(node.substring(3, node.length))] = {
                piece: node.charAt(0) === '1' ? 'cone' : 'cube',
                auton: node.charAt(1) === 'T',
                supercharged: node.charAt(2) === 'S'
            }
        });

        setCells(tempCells);
        updateData();
    }, [props.value]);

    useEffect(_ => updateData(), [cells]);


    return (
        <>
            <div id='toggle-list'>
                <div className='power-grid-toggle'>
                    <label>Auton: </label>
                    <input type='checkbox' ref={autonToggle} />
                    <span />
                </div>
                <div className='power-grid-toggle'>
                    <label>Supercharged: </label>
                    <input type='checkbox' ref={superchargedToggle} />
                    <span />
                </div>
            </div>
            <div className='scoring-grid'>
                {cells.map((cell, index) => {
                    return (
                        <div
                            coop={index % 9 > 2 && index % 9 < 6 ? 'true' : 'false'}
                            className={`scoring-grid-cell option-${cell.piece === 'cone' ? 1 : cell.piece === 'cube' ? 2 : 3} ${cell.supercharged ? 'supercharged' : ''}`}
                            onClick={e => {
                                return (
                                    index - 18 >= 0 ? toggleBoth(e, index) :
                                        (index + 2) % 3 === 0 ? toggleCube(e, index) :
                                            toggleCone(e, index)
                                );
                            }
                            }
                        >
                        {cell.auton ? 'A' : ''}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default ScoringGrid;
