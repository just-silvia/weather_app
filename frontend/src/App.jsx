import { useEffect, useState } from 'react'
import './App.css'
import { getWeatherData } from './api';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import { parse } from 'date-fns';

function App() {
  const [city, setCity] = useState('Milan');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getGradientClass = (hour) => {
    if (hour >= 6 && hour < 9) return 'bg-sunrise';
    if (hour >= 9 && hour < 17) return 'bg-day';
    if (hour >= 17 && hour < 20) return 'bg-sunset';
    return 'bg-night';
  }

  const hour = weatherData?.location?.localtime
    ? parse(
      weatherData.location.localtime,
      'yyyy-MM-dd  HH:mm',
      : new Date().getHours();
    )
    : new Date().getHours();

  const gradientClass = getGradientClass(hour);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getWeatherData(city);

        const { mintemp_c, maxtemp_c } = data.forecast.forecastday[0].day;

        setWeatherData({
          current: { ...data.current, mintemp_c, maxtemp_c },
          hourly: data.forecast.forecastday[0],
          weekly: data.forecast.forecastday.slice(1),
          location: data.location
        })
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city])

  console.log(weatherData);

  return (
    <div className={`app ${gradientClass}`}>
      <div className='containter'>
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <>
            <CurrentWeather data={weatherData.current} location={weatherData.location} />
            <HourlyForecast data={weatherData.hourly} />
            <WeeklyForecast data={weatherData.weekly} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
