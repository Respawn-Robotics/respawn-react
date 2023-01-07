import React, { useState, useEffect } from "react";
import './master-table.css';
import db from '../../../firebase.config';
import { onSnapshot, collection } from 'firebase/firestore';

function MasterTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        onSnapshot(collection(db, "recon"), (snapshot) =>
            setData(snapshot.docs.map(doc => {
                const sortedDoc = Object.keys(doc.data()).sort().reduce((obj, key) => {
                    obj[key] = doc.data()[key];
                    return obj;
                }, {});
                return (sortedDoc);
            })));
    }, []);

    return (
        <>
            <table id='master-table'>
                <thead>
                    <tr className='master-table-row'>
                        {Object.keys(data[0] ? data[0] : {}).map((field) => {
                            return (
                                <th className='master-table-cell master-table-heading'>{field.toString()}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => {
                        return (
                            <tr className='master-table-row' id={entry.id}>
                                {Object.keys(entry).map((field) => {
                                    return (
                                        <td className='master-table-cell'>{entry[field].toString()}</td>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}

export default MasterTable;