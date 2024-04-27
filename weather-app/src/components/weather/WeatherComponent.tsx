/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";

const Weather = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation); // userPosition is obtained by calling the hook previously created and retrieve the user location
  const [weather, setWeather]: any = useState(null);
  const APP_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!userPosition || userPosition.latitude === 0 || userPosition.longitude === 0) {
      // Don't fetch weather if userPosition is not available yet or if it's (0, 0)
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&units=metric&appid=${APP_KEY}`;
    const respons = await fetch(url);
    const result = await respons.json();
    console.log(result);
    setWeather(result);
  }

  useEffect(() => {
    getWeather();
  },[userPosition]); // Re-fetch weather when userPosition changes

  return (
    // TODAY'S WEATHER
    <div>
      {weather && (
        <div className="w-full max-w-screen-sm bg-white p-10 pt-0 rounded-xl ring-8 ring-white ring-opacity-40">
          
          {weather.list.length > 0 && (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <img src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`} alt="Weather Icon"/>
                <div className="flex"><p className="text-4xl font-bold text-left">{Math.round((weather.list[0].main.temp))}°C</p><p className="text-lg font-bold"> ( {Math.round((weather.list[0].main.temp * 9/5) + 32)}°F)</p><br></br></div>
                <h1 className="font-semibold mt-1 text-gray-500 text-lg text-left">{weather.city.name} -- {weather.city.country}</h1>
              </div> 
              <p className="text-right just flex items-center">
                {weather.list[0].wind.speed} m/s  🌬️<br></br>
                {weather.list[0].main.humidity}% 💧<br></br>
                {new Date(weather.city.sunrise * 1000).toLocaleTimeString()} ☀️ <br></br>
                {new Date(weather.city.sunset * 1000).toLocaleTimeString()} 🌙<br></br>
              </p>
            </div>
          )}
          <div className="flex justify-between mt-12">
            {weather.list.slice(0,7).map((element:any) => {
              const date = new Date((element.dt + weather.city.timezone) * 1000);
              return (
                <div className="flex flex-col items-center">
                <p key={element.dt}>
                  {date.getHours()}<br></br>
                  <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="Weather Icon" />
                  {Math.round(element.main.temp)}°C<br></br>
                </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;

// NEED TO UNDERSTAND BETTER THE PROCESS

// Weather is the functionnal component 
// [weather, setWeather] are the state variables + at first, initialized to null + updated when fetch() with fetched data SO weather = fetched data object 
// useEffect => execute getWeather() when first render, so when component mounts

// in JSX => check if weather is not null anymore, so if weather is fetched data 
// if yes => renders => specific properties from the weather data object (so city name, country, list of weather info)

// to have weather info for different times => iteration (loop) of list => use map() for this => and to select a specific property in the map function, we use element.