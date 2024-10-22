const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

async function getActivitiesData(city) {
    const cacheKey = `activitiesData:${city}`;

    // Check cache
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const apiKey = process.env.TICKETMASTER_API_KEY;

    const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
        params: {
            keyword: city,
            apikey: apiKey,
        },
    });

    if (response.data._embedded) {
        const events = response.data._embedded.events;
        // Cache the data for 1 hour
        await setexAsync(cacheKey, 3600, JSON.stringify(events));

        return events;
    } else {
        return [];
    }
}

module.exports = { getActivitiesData };
