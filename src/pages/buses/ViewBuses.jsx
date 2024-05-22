import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { APIsRequests } from "../../api/APIsRequests";
import { ToastContainer, toast } from 'react-toastify';
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { encrypt } from '../../helpers';
import Map from "../../assets/images/map.png";
import Loading from '../../components/loading/Loading';
import MinLogo from "../../assets/images/min-logo.png";



export const ViewBuses = () => {
    const navigate = useNavigate();
  const [state, setState] = useState({
    buses: {},
    locations: [],
    routeBuses: [],

    message: '',
    origin: '',
    destination: '',

    pageLoading: true,
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
            setState((prevState) => ({ ...prevState, pageLoading: false }));
            return console.log(error);
        });
    };
    
    const getBusesApi = async () => {
        await APIsRequests.getBusesApi()
        .then((response) => {
            setState((prevState) => ({
                ...prevState,
                buses: response?.data?.data
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

    getServerApi();
    getBusesApi();
    getLocationsApi();
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
    setState((prevState) => ({ ...prevState, buttonDisabled: true }));

    await APIsRequests.getRouteBusesApi(state?.origin, state?.destination)
    .then((response) => {
        setState((prevState) => ({ ...prevState, buttonDisabled: false, routeBuses: response?.data?.data }));
    })
    .catch((error) => {
        setState((prevState) => ({ ...prevState, buttonDisabled: false }));
        toast.error(error?.response?.data?.message || error?.response?.data?.error);
    });
  }

  if (state?.pageLoading === true) return <Loading pageLoading={true} />

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
                    <div className='flex w-full justify-between'>
                        <div className='text-white bg-orange rounded-lg p-5'>
                            <h1 className='text-center text-2xl font-bold mb-4'> {state?.message} </h1>
                            <p className='ml-6 text-center'> {state?.routeBuses.length > 0 ? ` ${state?.routeBuses[0].routes.route_name} ` : ' Select Your Route '} <FontAwesomeIcon icon={faDownLong} /></p>
                        </div>

                        <div className='flex flex-1 justify-end '>
                            <div className='border-1 float-right mr-6 box-border flex h-28 w-52 items-center rounded-md bg-white shadow-lg shadow-indigo-400/20'>
                                <h1 className='border-color-gray ml-4 rounded-full border bg-orange px-5 py-3 text-white'> { state?.routeBuses?.length } </h1>
                                <p className='ml-4 text-sm text-gray-500'>Available Buses</p>
                            </div>
                        </div>

                        <div className='border-1 box-border flex h-28 w-52 items-center bg-white shadow-lg shadow-indigo-400/20'>
                            <h1 className='border-color-gray ml-4 rounded-full border bg-primary px-5 py-3 text-white'> { state?.routeBuses.reduce((acc, bus) => acc + parseInt(bus.available_sits), 0) || 0 } </h1>
                            <p className='ml-4 text-sm text-gray-500'>Availabe Seats</p>
                        </div>
                        
                        <div className='items-center justify-center border-1 relative box-border flex h-28 w-52 bg-white shadow-lg shadow-indigo-400/20'>
                            <img src={Map} alt='map' className='absolute left-0 top-0 h-full w-full' />
                            {
                                state?.routeBuses.length > 0
                                ? (<div onClick={() => navigate(`/map-buses?origin=${encrypt(state?.origin)}&destination=${encrypt(state?.destination)}`)} className='border-color-gray z-10 ml-4 cursor-pointer rounded-full border bg-orange/80 p-4 text-white transition-all duration-300 hover:scale-105' > Track buses </div>)
                                : (<div className='border-color-gray z-10 ml-4 cursor-pointer rounded-full border bg-orange/30 p-4 text-white transition-all duration-300 hover:scale-105'> Track buses </div>)
                            }
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
                                        <select onChange={fromOnChange} value={state?.origin} className='focus:shadow-outline h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight text-gray-500 focus:outline-none max-[768px]:w-full'>
                                            <option/>
                                            { state?.locations.map((element => (<option key={element?.id} value={element?.id} className='bg-primary text-white'>{element?.location_name}</option>)))}
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
                                        <select onChange={toOnChange} value={state?.destination} className='focus:shadow-outline h-auto flex-1 rounded border-b border-gray-300 px-4 leading-tight text-gray-500 focus:outline-none max-[768px]:w-full'>
                                            <option/>
                                            { state?.locations.map((element => (<option key={element?.id} value={element?.id} className='bg-primary text-white'>{element?.location_name}</option>)))}
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

                    <div className='my-10 relative w-full shadow-md shadow-indigo-400/20'>
                        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
                            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                <th scope='col' className='p-4'>
                                    <div className='flex items-center'>
                                    <input
                                        disabled
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
                                {state?.routeBuses.map((element) => (
                                <tr key={`i${element.id}`} className='border-b bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600' >
                                    <td className='w-4 p-4'>
                                        <div className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                id='checkbox-table-1'
                                                className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                                            />
                                            <label htmlFor='checkbox-table-1' className='sr-only'> checkbox </label>
                                        </div>
                                    </td>
                                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white' > {element.name} </th>
                                    <td className='px-6 py-4'>{element.model}</td>
                                    <td className='px-6 py-4'>{element.plate_number}</td>
                                    <td className='px-6 py-4'>{element.available_sits}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
