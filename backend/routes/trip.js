const express = require('express');
const router = express.Router();
const flightService = require('../services/flightService');
const weatherService = require('../services/weatherService');
const newsService = require('../services/newsService');
const activitiesService = require('../services/activitiesService');

// Get trip data
router.get('/', async (req, res) => {
    const { departure, arrival, date } = req.query;

    try {
        const [flightData, weatherData, newsData, activitiesData] = await Promise.all([
            flightService.getFlightData(departure, arrival, date),
            weatherService.getWeatherData(arrival),
            newsService.getNewsData(arrival),
            activitiesService.getActivitiesData(arrival),
        ]);

        res.json({
            flight: flightData,
            weather: weatherData,
            news: newsData,
            activities: activitiesData,
        });
    } catch (error) {
        console.error('Error fetching trip data:', error);
        res.status(500).json({ message: 'Error fetching trip data' });
    }
});

module.exports = router;
