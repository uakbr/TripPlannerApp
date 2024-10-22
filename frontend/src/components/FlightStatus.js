import React, { useEffect, useState, memo } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function FlightStatus() {
    const [flightData, setFlightData] = useState([]);

    useEffect(() => {
        async function fetchFlightData() {
            try {
                const response = await axios.get('/api/trip', {
                    params: { departure: 'JFK', arrival: 'LAX', date: '2023-10-15' },
                });
                setFlightData(response.data.flight);
            } catch (error) {
                console.error('Error fetching flight data:', error);
            }
        }
        fetchFlightData();
    }, []);

    if (flightData.length === 0) return <p>Loading flight information...</p>;

    return (
        <div className="flight-status card">
            <h2>Available Flights</h2>
            <ul className="flight-list">
                {flightData.map((offer, index) => (
                    <li key={index} className="flight-item">
                        <div className="flight-info">
                            <span>
                                {offer.itineraries[0].segments[0].departure.iataCode} &rarr; {offer.itineraries[0].segments[0].arrival.iataCode}
                            </span>
                            <span>
                                ${offer.price.total}
                            </span>
                        </div>
                        <button 
                            onClick={() => {/* handle booking */}}
                            aria-label={`Book flight from ${offer.itineraries[0].segments[0].departure.iataCode} to ${offer.itineraries[0].segments[0].arrival.iataCode}`}
                        >
                            Book Now
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default memo(FlightStatus);
