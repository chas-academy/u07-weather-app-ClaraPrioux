/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useUserLocationStore } from "../store/useUserLocationStore";
// import { mockData } from "./weatherMock";

const Weather = () => {
  const userPosition = useUserLocationStore((state: any) => state.userLocation); // userPosition is obtained by calling the hook previously created and retrieve the user location
  const [weather, setWeather]: any = useState(null);
  //const APP_KEY = import.meta.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!userPosition || userPosition.latitude === 0 || userPosition.longitude === 0) {
      // Don't fetch weather if userPosition is not available yet or if it's (0, 0)
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&units=metric&appid=969cb5f571df73c797f4a4a00742805f`; //${APP_KEY}
    const respons = await fetch(url);
    const result = await respons.json();
    console.log(result);
    setWeather(result);
  }

  interface WeatherEmojiMap {
    [key: string]: string;
  }
  
  const weatherEmojiMap: WeatherEmojiMap = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "shower rain": "🌦️",
    "rain": "🌧️",
    "light rain": "🌧️",
    "thunderstorm": "⛈️",
    "snow": "❄️",
    "mist": "🌫️"
  };

  useEffect(() => {
    getWeather();
  },[userPosition]); // Re-fetch weather when userPosition changes

  return (
    <>
      {weather && (
        <>
          <h1>
            {weather.city.name} -- {weather.city.country}
          </h1>
          {/* Display current weather details */}
          {weather.list.length > 0 && (
            <>
              <p>
                Current Weather:<br></br>
                Temperature: {weather.list[0].main.temp}°C / {Math.round((weather.list[0].main.temp * 9/5) + 32)}°F<br></br>
                Wind: {weather.list[0].wind.speed} m/s<br></br>
                Humidity: {weather.list[0].main.humidity}%<br></br>
                Sunrise: {new Date(weather.city.sunrise * 1000).toLocaleTimeString()}<br></br>
                Sunset: {new Date(weather.city.sunset * 1000).toLocaleTimeString()}<br></br>
              </p>
            </>
          )}
          {/* Display forecast */}
          {weather.list.slice(1,8).map((element:any) => {
            const date = new Date((element.dt + weather.city.timezone) * 1000);
            const weatherDescription = element.weather[0].description.toLowerCase();
            const emoji = weatherEmojiMap[weatherDescription] || ""; // If the weather description is not found in the map, default to empty string
            return (
              <p key={element.dt}>
                {date.toUTCString()}<br></br>
                {element.main.temp}°C<br></br>
                {emoji}
              </p>
            );
          })}
        </>
      )}
    </>
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