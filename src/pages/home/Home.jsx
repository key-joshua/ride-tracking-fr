import { useEffect, useState } from "react";
import { APIsRequests } from "../../api/APIsRequests";
import MinLogo from "../../assets/images/min-logo.png";
import BusStop from "../../assets/images/bus-stop.png";
import BusPhone from "../../assets/images/bus-phone.png";
import BusMoving from "../../assets/images/bus-moving.png";
import BusWaiting from "../../assets/images/bus-waiting.png";
import BusLocation from "../../assets/images/bus-location.png";

const Home = () => {
  const [state, setState] = useState({
    data: {},
  });

  useEffect(() => {
    const getHomeApi = async () => {
      await APIsRequests.getHomeServerMsgApi()
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            data: response?.data,
          }));
        })
        .catch((error) => {
          return console.log(error);
        });
    };

    getHomeApi();
  }, []);

  console.log('====>', state?.data)
  return (
    <section className="flex flex-1 flex-col gap-10 bg-primary">
      <nav className="flex flex-row justify-between border-gray-200 bg-primary dark:bg-gray-900">
        <a href="/" className="flex items-center">
          <img src={MinLogo} alt="Logo" className="ml-10" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white dark:text-white">RIDE - TRACKER</span>
        </a>
      </nav>

      <div className="flex flex-col justify-between md:flex-row">
        <img src={BusStop} alt="bus-stop" className="ml-20 h-[60vh] w-4/5 object-fill md:h-[60vh] md:w-[60vw]" />

        <div className="mr-40 flex flex-col">
          <h1 className='text-[60px] font-semibold text-white'>{state?.data?.message}</h1>
          <div className="mt-9 ">
            <h1 className="text-[40px] font-semibold text-white">
              Gain visibility into your feet with Ride Tracker
            </h1>
            <div className="w-2/5 border-4 border-white"></div>
          </div>
          <p className="mt-16 max-w-lg text-xl text-white">
            Ride Tracker takes the stress out of navigating public transportation in
            a new city or finding a new route by providing up-to-date
            information on bus schedules, routes, and stops.
          </p>
          <button className="mt-20 rounded bg-orange px-10 py-10 text-5xl font-bold text-white"> Find your Bus</button>
        </div>
      </div>
      
      <div>
        <div className="my-10 ml-20 ">
          <h1 className="text-[60px] font-semibold text-white">What We Do</h1>
          <div className="w-1/5 border-4 border-white"></div>
        </div>

        <div className="flex flex-col justify-around md:flex-row">
          <div className="mt-4 max-w-xl flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a href="/"><img src={BusWaiting} alt="bus-waiting" className="rounded-t-lg" /></a>
            <div className="px-5 py-10">
              <p className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-400">
                No more standing around waiting for a bus with no seats - with
                Ride Tracker, you can check available seats on your desired bus in
                real-time. We'll show you which buses have space so you can plan
                your journey accordingly.
              </p>
            </div>
          </div>

          <div className="mt-4 max-w-xl flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a href="/"><img src={BusLocation} alt="bus-location" className="self-center" /></a>
            <div className="px-5 py-10">
              <p className="mb-3  text-lg font-medium text-gray-700 dark:text-gray-400">
                Get real-time location information of your bus with Ride Tracker.
                You'll know exactly when to leave your location to catch the
                bus, and you can even track its progress as it approaches your
                stop.
              </p>
            </div>
          </div>

          <div className="mt-4 max-w-xl flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a href="/"><img src={BusMoving} alt="bus-moving" className="self-center" /></a>
            <div className="px-5 py-10">
              <p className="mb-3  text-lg font-medium text-gray-700 dark:text-gray-400">
                Find out how fast your bus is moving with Ride Tracker. We provide
                you with the bus speed, so you'll have an idea of when you'll
                arrive at your destination. No more guessing or stressing about
                delays - Ride Tracker has you covered with all the information you
                need for a smooth journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full justify-end pl-20">
        <div className="w-full md:w-1/2">
          <h1 className="my-10 text-[60px] font-semibold text-white ">Mobile version</h1>
          <div className="w-2/5 border-4 border-white"></div>

          <div className="flex flex-col md:flex-row">
            <div className="p-5">
              <p className="mb-3 font-normal text-white dark:text-gray-400">
                Our application is designed to be responsive and adaptable to
                different devices, including mobile phones. We understand that
                many of our users rely on their smartphones to navigate public
                transportation, and we want to make sure that they can access
                our service wherever they are.
              </p>
              <button className="mt-20 rounded bg-orange px-10 py-5 text-lg font-bold text-white">Get Started</button>
            </div>
            <img src={BusPhone} alt="" className="rounded-t-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
