import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WeatherForecast() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        async function fetchWeatherData() {
            try {
                const response = await axios.get('/api/trip', {
                    params: { arrival: 'Los Angeles' },
                });
                setWeatherData(response.data.weather);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
        fetchWeatherData();
    }, []);

    if (!weatherData) return <p>Loading weather information...</p>;

    return (
        <div className="weather-forecast">
            <h2>Weather Forecast</h2>
            <ul>
                {weatherData.list.slice(0, 5).map((item, index) => (
                    <li key={index}>
                        {item.dt_txt}: {item.main.temp}°C, {item.weather[0].description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WeatherForecast;
