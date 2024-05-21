import '../App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './home/Home';
import { MapBuses } from './buses/MapBuses';
import { ViewBuses } from './buses/ViewBuses';

const RoutePages = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/buses' element={<ViewBuses />}></Route>
        <Route path='/map-buses' element={<MapBuses />}></Route>
      </Routes>
    </div>
  );
};

export default RoutePages;
