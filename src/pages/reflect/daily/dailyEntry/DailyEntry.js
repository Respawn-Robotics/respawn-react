import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../../../firebase.config.js';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import FormInput from '../../../../components/form-input/FormInput';
import './DailyEntry.css'

const Entry = (doc) => {
    const {whytext, rating, subteam, howtext, whattext} = doc.props;
    console.log(doc.props)
    return (
        <>
        <div className='container'>
        <form>
            <FormInput id='subteam' type='select' name='Subteam' options={['Base', 'Acquire','Score', 'End-Game']} value={subteam}/>
            <FormInput id='rating' type='number' name='Rating ?/5' value={rating}/>
            <FormInput id='whytext' type='textarea' name='Why was today so good / average / bad?' value={whytext}/>
            <FormInput id='howtext' type='textarea' name='How could today have gone better?' value={howtext}/>
            <FormInput id='whattext' type='textarea' name='What are the goals for tomorrow?'  value={whattext}/>
          </form>
          </div>
        </>
    )
}

const DailyEntry = () => {
    const { date } = useParams();

    const [data, setData] = useState([]);
    useEffect(() =>
    onSnapshot(collection(db, "mockkickoff"), (snapshot) =>
      setData(snapshot.docs.map(doc => {
        if(doc.data().date == date.toString()) {
            if(!(doc == undefined)) {
                return doc.data()

            }
        }
      }))), []);

  return (
    <>
    {data.map(doc => <Entry props={doc}/>)}
    </>
  );
};

export default DailyEntry;