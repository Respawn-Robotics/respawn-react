import React from 'react';
import './Reflect.css'

import paths from '../../../paths.json';

const Reflect = () => {
  return (
    <>
    <h1 className='reflect-header'>Respawn Reflect</h1>
    <div className='reflect-buttons'>
        <a href={paths.reflect['record']}>Daily Record</a>
        <a href={paths.reflect['legacy']}>Legacy</a>
        <a href={paths.reflect['daily']}>Daily Reflect</a>
    </div>
    </>
  );
};

export default Reflect;