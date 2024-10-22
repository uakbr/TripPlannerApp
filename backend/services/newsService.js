const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

async function getNewsData(city) {
    const cacheKey = `newsData:${city}`;

    // Check cache
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const apiKey = process.env.NEWSAPI_API_KEY;

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
            q: city,
            apiKey: apiKey,
        },
    });

    // Cache the data for 1 hour
    await setexAsync(cacheKey, 3600, JSON.stringify(response.data.articles));

    return response.data.articles;
}

module.exports = { getNewsData };
