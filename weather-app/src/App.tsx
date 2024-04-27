import './App.css'
import ForecastComponent from './components/forecast5days/ForecastComponent'
import GeolocationComponent from './components/geolocation/GeolocationComponent'
import ChartComponent from './components/lineChart/ChartComponent'
import WeatherComponent from './components/weather/WeatherComponent'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
        <GeolocationComponent></GeolocationComponent>
        <WeatherComponent></WeatherComponent>
        <ForecastComponent></ForecastComponent>
        <ChartComponent></ChartComponent>
      </div>
    </>
  )
}

export default App
