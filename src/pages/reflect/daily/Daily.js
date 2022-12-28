import React, { useState } from 'react';
import Calendar from 'react-calendar'
import './Daily.css'

const Daily = () => {
  const worksessions = ['01-03-2023', '03-03-2020', '05-03-2020'];

  const [value, onChange] = useState(new Date());

  return (
    <>
    <h1 className='reflect-header'>Daily Reflect (WIP)</h1>
    <div className='daily-container'>
      <Calendar onChange={onChange} value={value} showNeighboringMonth={false}/>
    </div>
    </>
  );
};

export default Daily;