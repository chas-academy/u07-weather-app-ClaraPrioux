/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";
// import { mockData } from "./weatherMock";

const Weather = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation); // userPosition is obtained by calling the hook previously created and retrieve the user location
  const [weather, setWeather]: any = useState(null);
  //const APP_KEY = import.meta.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&units=metric&appid=969cb5f571df73c797f4a4a00742805f`; //${APP_KEY}
    const respons = await fetch(url);
    const result = await respons.json();
    setWeather(result);
  }

  useEffect(() => { //used to execute the getWeather function when the component mounts.
    getWeather();
  });

  return (
    <>
      {weather && (
        <>
          <h2>
            {weather.city.name} -- {weather.city.country}
          </h2>
          {weather.list.map((element:any) => {
            const date = new Date((element.dt + weather.city.timezone)*1000)
            return <p>Date: {date.toUTCString()}<br></br>Temp: {element.main.temp} <br></br>{element.weather[0].description}</p>
          })}
        </>
      )}
    </>
  );
};

export default Weather;
