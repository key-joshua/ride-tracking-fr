import React, { useEffect, useState } from 'react';
import { APIsRequests } from "../../api/APIsRequests";

import Loading from '../../components/loading/Loading';
import MinLogo from "../../assets/images/min-logo.png";


export const ViewBuses = () => {
  const [state, setState] = useState({
    data: {},
    pageLoading: true,
  });

  useEffect(() => {
    const getHomeApi = async () => {
      await APIsRequests.getHomeServerMsgApi()
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            pageLoading: true,
            data: response?.data,
          }));
        })
        .catch((error) => {
          return console.log(error);
        });
    };

    getHomeApi();
  }, []);

  if (state?.pageLoading === true) return <Loading pageLoading={true} />

  return (
    <section className="flex flex-1 flex-col gap-10 bg-primary">
      <nav className="flex flex-row justify-between border-gray-200 bg-primary dark:bg-gray-900">
        <a href="/" className="flex items-center">
          <img src={MinLogo} alt="Logo" className="ml-10" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">RIDE - TRACKER</span>
        </a>
      </nav>
      
      
    </section>
  )
}
