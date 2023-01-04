import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import './Daily.css'

const Daily = () => {

  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();

  const onClickDay = (value, event) => {
    var date = value.toISOString().slice(0,10).replace(/-/g,"")
    navigate("/reflect/daily/entry/" + date, { replace: true })
  }

  return (
    <>
    <h1 className='reflect-header'>Daily Reflect (WIP)</h1>
    <div className='daily-container'>
      <Calendar onChange={onChange} value={value} showNeighboringMonth={false} onClickDay={onClickDay}/>
    </div>
    </>
  );
};

export default Daily;