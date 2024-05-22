import { io, Socket } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DirectionsRenderer, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

import { dencrypt, variables } from "../../helpers";
import MinLogo from "../../assets/images/min-logo.png";
import { APIsRequests } from '../../api/APIsRequests';
import Loading from '../../components/loading/Loading';


export const MapBuses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const ENDPOINT = variables.SERVER_URL;
  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");

  const { isLoaded } = useJsApiLoader({
    id: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4&libraries=places',
    googleMapsApiKey: 'AIzaSyDEDT-0K6NPqZeaptS0TXWxBxrv71PMFJ4'
  });

  const [map, setMap] = useState();
  const [route, setRoute] = useState();
  const [buses, setBuses] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  
  const [selected, setSelected] = useState({
    createdAt: new Date(),
    updatedAt: new Date(),
    location_name: '',
    latitude: '',
    longitude: '',
    id: 0,
  });

  const [selected1, setSelected1] = useState({
    createdAt: new Date(),
    updatedAt: new Date(),
    location_name: '',
    latitude: '',
    longitude: '',
    id: 0,
  });

  const [state, setState] = useState({
    lat: 0,
    lng: 0,
    
    routeBuses: [],
    pageLoading: false,
  });

  const calculateRoute = async (start, end) => {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({ waypoints: [], origin: start, destination: end, travelMode: window.google.maps.TravelMode.DRIVING });
    setDirectionsResponse(results);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => { setState((prevState) => ({ ...prevState, lat: position.coords.latitude, lng: position.coords.longitude })); });
    } else {
      toast.info('geolocation not supported');
    }

    const getRouteBusesApi = async () => {
      await APIsRequests.getRouteBusesApi(dencrypt(origin), dencrypt(destination))
      .then((response) => {
        setState((prevState) => ({ ...prevState, pageLoading: false, routeBuses: response?.data?.data }));
        if (response?.data?.data.length > 0) {
          setRoute({
            id: response?.data?.data[0]?.routes.id,
            busStops: response?.data?.data[0]?.routes.stops,
            end: { lat: parseFloat(response?.data?.data[0]?.routes.locations_end.latitude), lng: parseFloat(response?.data?.data[0]?.routes.locations_end.longitude)},
            start: { lat: parseFloat(response?.data?.data[0]?.routes.locations_start.latitude), lng: parseFloat(response?.data?.data[0]?.routes.locations_start.longitude) },
          });

          calculateRoute(
            { lat: parseFloat(response?.data?.data[0]?.routes.locations_end.latitude), lng: parseFloat(response?.data?.data[0]?.routes.locations_end.longitude)},
            {lat: parseFloat(response?.data?.data[0]?.routes.locations_start.latitude), lng: parseFloat(response?.data?.data[0]?.routes.locations_start.longitude)},
          );

          const BusesInRoute = response?.data?.data.map((bus) => {
            const { id, name, plate_number, routes } = bus;
            return {
              busId: id,
              name,
              seats: 0,
              plate_number,
              state: 'packing',
              position: { lat: parseFloat(routes.locations_start.latitude), lng: parseFloat(routes.locations_start.longitude) },
            };
          });

          setBuses(BusesInRoute);
          setSelected1(response?.data?.data[0].routes?.locations_end);
          setSelected(response?.data?.data[0].routes?.locations_start);
        }
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, pageLoading: false }));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
      });
    }

    getRouteBusesApi();
    const socket = io(ENDPOINT);
  }, [origin, destination]);

  if (state?.pageLoading === true) return <Loading pageLoading={true} />;

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
      </section>

      {
        isLoaded ? (
          <div className='flex h-screen w-full'>
            <div className='relative w-full'>
              <div className='absolute left-1/2 top-12 z-10 flex  -translate-x-1/2  items-center space-x-2 rounded-xl bg-white p-2 shadow-lg transition duration-500 hover:scale-105 hover:shadow-xl'>
                  <div className='flex'>
                    <div className='flex min-w-[15rem] cursor-pointer rounded-lg px-4 py-3 font-semibold text-gray-500'>
                      <div className='flex h-full w-8 items-center justify-center'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                          <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                        </svg>
                      </div>
                      <div className='flex h-full flex-1 flex-col'>
                        <div className='flex w-full items-center'>
                          <span className='flex-1 truncate'>From</span>
                          <span className='focus:shadow-outline  h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight text-gray-700 focus:outline-none max-[768px]:w-full'>
                            {selected.location_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='flex min-w-[15rem] cursor-pointer rounded-lg px-4 py-3 font-semibold text-gray-500'>
                      <div className='flex h-full w-8 items-center justify-center'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                          <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                        </svg>
                      </div>
                      <div className='flex h-full flex-1 flex-col'>
                        <div className='flex w-full items-end '>
                          <span className='flex-1 truncate'>To</span>
                          <span className='focus:shadow-outline h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight  text-gray-700 focus:outline-none max-[768px]:w-full'>
                            {selected1.location_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

              {route && route.start && (
                <GoogleMap
                  zoom={16}
                  center={route.start}
                  onLoad={(mapl) => setMap(mapl)}
                  mapContainerStyle={{ flex: 1, height: '100vh' }}
                  options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
                >

                </GoogleMap>
              )}
            </div>
              
            <div className='p-2'>
              <div className='mt-5 min-w-[300px]  bg-white '>
                <ul className='flex flex-col '>
                  <button type='submit' onClick={() => navigate('/buses')} disabled={state?.buttonDisabled || state?.origin === '' || state?.destination === ''} className={`my-5 px-5 py-3 text-white font-semibold duration-3000 cursor-pointer rounded-lg transition hover:shadow-lg ${state?.buttonDisabled || state?.origin === '' || state?.destination === '' ? 'bg-[#f8c25e] cursor-not-allowed' : 'bg-orange' }`} >
                    <span>{state?.buttonDisabled ? <Loading buttonLoading={true} /> : 'Search'}</span>
                  </button>

                  {
                    buses.length < 1
                      ? <p>No Bus In This route</p>
                      : buses.map((bus, index) => {
                        return (
                          <li key={bus.busId} className='mb-2 flex flex-row border-gray-400'>
                            <div className='flex flex-1 cursor-pointer select-none items-center rounded-md bg-gray-200 p-4  transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-lg'>
                              <div className='mr-4 flex h-10 w-10 flex-col items-center justify-center rounded-md bg-gray-300'>
                                {index + 1}
                              </div>
                              <div className='mr-3 flex-1 pl-1'>
                                <div className='font-medium'>{`${bus.name} ${bus.plate_number} `}</div>
                                <div className='text-sm text-gray-600'>{bus.seats} remaining seats</div>
                              </div>
                              <div className='text-xs text-gray-600'>{bus.state}</div>
                            </div>
                          </li>
                        );
                      }
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span>error occured while reloading google mapp</span>
          </div>
        )
      }

    </>
  )
}
