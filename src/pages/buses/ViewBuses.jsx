import React, { useEffect, useState } from 'react';
import { APIsRequests } from "../../api/APIsRequests";

import Map from "../../assets/images/map.png";
import Loading from '../../components/loading/Loading';
import MinLogo from "../../assets/images/min-logo.png";


export const ViewBuses = () => {
  const [state, setState] = useState({
    buses: {},
    locations: [],

    message: '',
    origin: '',
    destination: '',

    pageLoading: false,
    buttonDisabled: false,
  });

  useEffect(() => {
    const getServerApi = async () => {
        await APIsRequests.getServerApi()
        .then((response) => {
            setState((prevState) => ({
            ...prevState,
            pageLoading: false,
            message: response?.data?.message,
            }));
        })
        .catch((error) => {
            return console.log(error);
        });
    };
    
    const getLocationsApi = async () => {
        await APIsRequests.getLocationsApi()
        .then((response) => {
            setState((prevState) => ({
                ...prevState,
                locations: response.data.data
            }));
        })
        .catch((error) => {
            return console.log(error);
        });
    };
    
    const getBusesApi = async () => {
        await APIsRequests.getBusesApi()
        .then((response) => {
            setState((prevState) => ({
                ...prevState,
                buses: response.data.data
            }));
        })
        .catch((error) => {
            return console.log(error);
        });
    };

    getServerApi();
    getLocationsApi();
    getBusesApi();
  }, []);

  const fromOnChange = (event) => {
    event.preventDefault();
    setState(prevState => ({
        ...prevState,
        origin: event.target.value
    }));
  }

  const toOnChange = (event) => {
    event.preventDefault();
    setState(prevState => ({
        ...prevState,
        destination: event.target.value
    }));
  }

  const handleSubmitClick = async() => {
    console.log('---->', state?.origin);
    console.log('---->', state?.destination);
    setState((prevState) => ({ ...prevState, buttonDisabled: true }));

    

    await APIsRequests.postStudentQuizResult(state?.origin, state?.destination)
      .then((response) => {
        console.log('----->', response.data)
      })
      .catch((error) => {
        console.log('Error', error?.response?.data?.message || error?.response?.data?.error);
      });
  }

  if (state?.pageLoading === true) return <Loading pageLoading={true} />

  return (
    <section className="flex flex-1 flex-col gap-10">
        <nav className="flex flex-row justify-between border-gray-200 bg-primary dark:bg-gray-900">
            <a href="/" className="flex items-center">
            <img src={MinLogo} alt="Logo" className="ml-10" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">RIDE - TRACKER</span>
            </a>
        </nav>
        
        <div className='flex h-full w-full justify-center'>
            <div className='mx-[10%] flex w-full flex-col items-center'>

                <div className='flex w-full justify-between'>
                    <div className='text-white bg-orange p-5'>
                        <h1 className='text-center text-2xl font-bold mb-4'> {state?.message} </h1>
                        {/* <p className='ml-6'>{buses.length > 1 ? buses[0].routes.route_name : null}</p> */}
                        <p className='text-center'>Hello World</p>
                    </div>

                    <div className='flex flex-1 justify-end '>
                        <div className='border-1 float-right mr-6 box-border flex h-28 w-52 items-center rounded-md bg-white shadow-lg shadow-indigo-400/20'>
                            <h1 className='border-color-gray ml-4 rounded-full border bg-orange px-5 py-4 text-white'> { state?.buses?.count || 0 } </h1>
                            <p className='ml-4 text-sm text-gray-500'>Available Buses</p>
                        </div>
                    </div>
                    
                    <div className='border-1 relative box-border flex h-28 w-52 items-center bg-white shadow-lg shadow-indigo-400/20'>
                        <img src={Map} alt='map' className='absolute left-0 top-0 h-full w-full' />
                        {/* {buses.length > 0 ? (
                        <div
                            onClick={() => navigate('/map-view')}
                            className='border-color-gray z-10 ml-4 cursor-pointer rounded-full border bg-orange/80 p-4 text-white transition-all duration-300 hover:scale-105'
                        >
                            Track buses
                        </div>
                        ) : (
                        <div className='border-color-gray z-10 ml-4 cursor-pointer rounded-full border bg-orange/30 p-4 text-white transition-all duration-300 hover:scale-105'>
                            Track buses
                        </div>
                        )} */}
                    </div>
                </div>

                
                <div className='border-1 mt-10 box-border flex h-20 w-full items-center justify-between bg-white px-4 shadow-md shadow-indigo-400/20 sm:rounded-lg'>
                  <div className='flex w-full'>

                    <div className='flex flex-1 justify-between '>
                        <div className='flex w-[45%] min-w-[15rem] cursor-pointer rounded-lg px-4 py-3 font-semibold text-gray-500'>
                            <div className='flex h-full w-8 items-center justify-center'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                                <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                            </svg>
                            </div>
                            <div className='flex h-full flex-1 flex-col'>
                                <div className='flex w-full items-center'>
                                    <span className='truncate px-2'>From</span>
                                    <select onChange={fromOnChange} value={state?.origin} className='focus:shadow-outline  h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight text-gray-500 focus:outline-none max-[768px]:w-full'>
                                        <option/>
                                        { state?.locations.map((element => (<option key={element?.id} value={element?.location_name}>{element?.location_name}</option>)))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='flex w-[45%] min-w-[15rem] cursor-pointer rounded-lg px-4 py-3 font-semibold text-gray-500'>
                            <div className='flex h-full w-8 items-center justify-center'>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 opacity-30' viewBox='0 0 24 24'>
                                <path d='M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z' />
                            </svg>
                            </div>
                            <div className='flex h-full flex-1 flex-col'>
                                <div className='flex w-full items-center'>
                                    <span className='truncate px-2'>To</span>
                                    <select onChange={toOnChange} value={state?.destination} className='focus:shadow-outline  h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight text-gray-500 focus:outline-none max-[768px]:w-full'>
                                        <option/>
                                        { state?.locations.map((element => (<option key={element?.id} value={element?.location_name}>{element?.location_name}</option>)))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button type='submit' disabled={state?.buttonDisabled || state?.origin === '' || state?.destination === ''} onClick={(event) => handleSubmitClick(event)} className={`w-48 px-5 py-3 text-white font-semibold duration-3000 cursor-pointer rounded-lg transition hover:shadow-lg ${state?.buttonDisabled || state?.origin === '' || state?.destination === '' ? 'bg-[#f8c25e] cursor-not-allowed' : 'bg-orange' }`} >
                            <span>{state?.buttonDisabled ? <Loading buttonLoading={true} /> : 'Search'}</span>
                        </button>
                    </div>

                  </div>
                </div>

                <div className='relative w-full shadow-md shadow-indigo-400/20'>

                    <div>
                        { <h1 className='mt-5 mb-5 text-red'>No Bus found on this route</h1> || <h1 className='mt-5 mb-5'>Buses on track</h1> }
                    </div>

                    <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                    
                        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                            <th scope='col' className='p-4'>
                                <div className='flex items-center'>
                                <input
                                    id='checkbox-all'
                                    type='checkbox'
                                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                                />
                                <label htmlFor='checkbox-all' className='sr-only'>
                                    checkbox
                                </label>
                                </div>
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Model
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Plate number
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Availabe Seats
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>

                    </table>

                </div>

            </div>
        </div>

    </section>
  )
}
