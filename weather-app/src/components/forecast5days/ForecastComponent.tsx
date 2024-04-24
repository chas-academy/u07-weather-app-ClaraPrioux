/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const Forecast = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation);
  const [weather, setWeather]: any = useState(null);
  //const APP_KEY = import.meta.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!userPosition || userPosition.latitude === 0 || userPosition.longitude === 0) {
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&units=metric&appid=969cb5f571df73c797f4a4a00742805f`; //${APP_KEY}
    const respons = await fetch(url);
    const result = await respons.json();
    console.log(result);
    setWeather(result);
  }

  useEffect(() => {
    getWeather();
  },[userPosition]);

return (
    <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
      {weather && (
        <div className="flex justify-between items-center">
            {weather.list.filter((_element: any, index: number) => index % 8 === 0).map((element: any) => { 
                const date = new Date((element.dt + weather.city.timezone) * 1000);
                const weekday = date.toLocaleDateString(undefined, { weekday: 'short' });

                return (
                <p key={element.dt}>
                    {weekday}<br></br>
                    <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="Weather Icon" />
                    {Math.round(element.main.temp)}°C
                </p>
                );
            })}
        </div>
    )}
    </div>
);
};

export default Forecast;