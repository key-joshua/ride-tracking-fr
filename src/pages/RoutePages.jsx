import '../App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './home/Home.jsx';
const RoutePages = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export default RoutePages;
