const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

async function getWeatherData(city) {
    const cacheKey = `weatherData:${city}`;

    // Check cache
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            q: city,
            units: 'metric',
            appid: apiKey,
        },
    });

    // Cache the data for 1 hour
    await setexAsync(cacheKey, 3600, JSON.stringify(response.data));

    return response.data;
}

module.exports = { getWeatherData };
