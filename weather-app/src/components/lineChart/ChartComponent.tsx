/* eslint-disable @typescript-eslint/no-explicit-any */
import { Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useUserLocationStore } from '../store/useUserLocationStore';
import { useEffect, useState } from 'react';

const ChartComponent = () => {
    const userPosition = useUserLocationStore((state: any) => state.userLocation);
    const [weatherData, setWeatherData]: any = useState(null);
    const APP_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  
    const getWeather = async () => {
        if (!userPosition || userPosition.latitude === 0 || userPosition.longitude === 0) {
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${userPosition.latitude}&lon=${userPosition.longitude}&units=metric&appid=${APP_KEY}`;
        const response = await fetch(url);
        const result = await response.json();

        // description object we will use -> Create an interface maybe for that?
        const weatherByDay: { [key: string]: { 
            temps: number[], // contains temperatures for a specific day
            rains: number[], // rainfall amounts for a specific day
            temp_max: number[], 
            temp_min: number[] 
            } 
        } = {};

        // organizing the weather data by day
        result.list.forEach((item: any) => {
            const itemDate = new Date(item.dt_txt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
            if (!weatherByDay[itemDate]) {
                weatherByDay[itemDate] = { temps: [], rains: [], temp_max: [], temp_min: [] };
            }
            weatherByDay[itemDate].temps.push(item.main.temp);
            weatherByDay[itemDate].rains.push(item.rain ? item.rain['3h'] || 0 : 0);
            weatherByDay[itemDate].temp_max.push(item.main.temp_max);
            weatherByDay[itemDate].temp_min.push(item.main.temp_min);
        });

        // Create an array of objects with the four properties
        const weatherAverages = Object.entries(weatherByDay).map(([date, { temps, rains, temp_max, temp_min }]) => {
            return {
                date,
                avgTemp: temps.reduce((acc, curr) => acc + curr, 0) / temps.length, // reduce accumulates single value + acc and curr and the callback functions for the reduce() so it adds the curr-ent value to the acc-umulator (initialized at 0)
                maxTemp: Math.max(...temp_max), // find the  maximum value in the temp_max array
                minTemp: Math.min(...temp_min),  // find the  minumum value in the temp_min array
                avgRain: rains.reduce((acc, curr) => acc + curr, 0) / rains.length // reduce accumulates single value + acc and curr and the callback functions for the reduce() so it adds the curr-ent value to the acc-umulator (initialized at 0)
            };
        });

        setWeatherData(weatherAverages);
    };
  
    useEffect(() => {
        getWeather();
    }, [userPosition]);

    return (
        <div>
            {weatherData && (
                <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 pl-0 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
                    {weatherData.length > 0 && (
                        <LineChart width={600} height={300} data={weatherData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Line type="monotone" dataKey="avgTemp" name="Average T°C" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="maxTemp" name="Max T°C" stroke="#FF5733" />
                            <Line type="monotone" dataKey="minTemp" name="Min T°C" stroke="#3366FF" />
                            <Line type="monotone" dataKey="avgRain" name="Average rainfall (mm)" stroke="#8884d8" />
                            <Tooltip />
                        </LineChart>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChartComponent;
