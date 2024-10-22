const axios = require('axios');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

async function getFlightData(departure, arrival, date) {
    const cacheKey = `flightData:${departure}:${arrival}:${date}`;

    // Check cache
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    // Integrate with Amadeus Flight Offers API
    const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
    });

    const accessToken = tokenResponse.data.access_token;

    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
            originLocationCode: departure,
            destinationLocationCode: arrival,
            departureDate: date,
            adults: 1,
            max: 5,
        },
    });

    // Process and return flight data
    const flightData = response.data.data;

    // Cache the data for 1 hour
    await setexAsync(cacheKey, 3600, JSON.stringify(flightData));

    return flightData;
}

module.exports = { getFlightData };
