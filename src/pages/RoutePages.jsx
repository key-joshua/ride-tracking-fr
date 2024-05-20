import '../App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './home/Home.jsx';
import { ViewBuses } from './buses/ViewBuses.jsx';

const RoutePages = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/buses' element={<ViewBuses />}></Route>
      </Routes>
    </div>
  );
};

export default RoutePages;
