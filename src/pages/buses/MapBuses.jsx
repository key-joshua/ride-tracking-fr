import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

import MinLogo from "../../assets/images/min-logo.png";

export const MapBuses = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <ToastContainer />
      <section className="flex flex-1 flex-col gap-10">
          <nav className="flex flex-row justify-between border-gray-200 bg-primary dark:bg-gray-900">
            <a href="/" className="flex items-center">
              <img src={MinLogo} alt="Logo" className="ml-10" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">RIDE - TRACKER</span>
            </a>
          </nav>

          <div className='flex h-full w-full justify-center'>
              <div className='mx-[10%] flex w-full flex-col items-center'>
                Tracker Map Buses !!
              </div>
          </div>
      </section>
    </>
  )
}
