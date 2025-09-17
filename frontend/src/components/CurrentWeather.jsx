import { format, parse } from 'date-fns';
import './CurrentWeather.css'
import React from 'react'

const CurrentWeather = ({data, location}) => {
  const { localtime, name } = location;
  const { 
    temp_c, 
    condition,
    feelslike_c, 
    maxtemp_c, 
    mintemp_c, 
    wind_kph, 
    humidity, 
    uv 
  } = data;

  const getDayAndHHMM = (rawdate) => {
    const date = parse(rawdate, 'yyyy-MM-dd HH:mm', new Date());
    return format(date, 'EEEE, h:mm a');
  }

  const getWindDescription = (windKph) => {
    if (windKph < 10) return 'Calm';
    if (windKph < 20) return 'A little breezy';
    if (windKph < 30) return 'Windy';
    return 'Very windy'
  }

  const getHumidityDescription = (humidity) => {
    if (humidity < 30) return 'Dry';
    if (humidity < 60) return 'Comfortable';
    if (humidity < 80) return 'Humid';
    return 'Sticky;'
  }

  const getUVDescription = (uv) => {
    if (uv < 3) return 'Low';
    if (uv < 6) return 'Moderate';
    if (uv < 8) return 'High';
    if (uv < 11) return 'Very high';
    return 'Extreme';
  }

  return (
    <div className='current-weather'>
      <div className='card left-card'>
        <div>
          <h2>{name}</h2>
          <h1 className='temp'>{Math.round(temp_c)}</h1>
          <p>
            ↑{Math.round(maxtemp_c)}° / ↓{Math.round(mintemp_c)}°
          </p>
          <p>Feels like {feelslike_c}°</p>
          <p>{getDayAndHHMM(localtime)}</p>
        </div>
        <div className='condition'>
          <img src={condition.icon} alt={condition.text} />
          <h2 className='cpmdotopm-text'>{condition.text}</h2>
        </div>
      </div>
      <div className='card right-card'>
        <div className='detail-item'>
          <span className='detail-label'>💨 Wind</span>
          <span className='detail-value'>
            {wind_kph} km/h
            <br />
            <small>{getWindDescription(wind_kph)}</small>
          </span>
        </div>
        <div className='detail-item'>
          <span className='detail-label'>💧 Humidity</span>
          <span className='detail-value'>
            {humidity}%
            <br />
            <small>{getHumidityDescription(humidity)}</small>
          </span>
        </div>
        <div className='detail-item'>
          <span className='detail-label'>🔆 UV Index</span>
          <span className='detail-value'>
            {uv}
            <br />
            <small>{getUVDescription(uv)}</small>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather