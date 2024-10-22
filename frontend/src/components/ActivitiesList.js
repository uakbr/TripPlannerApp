import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ActivitiesList() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        async function fetchActivitiesData() {
            try {
                const response = await axios.get('/api/trip', {
                    params: { arrival: 'Los Angeles' },
                });
                setActivities(response.data.activities);
            } catch (error) {
                console.error('Error fetching activities data:', error);
            }
        }
        fetchActivitiesData();
    }, []);

    if (activities.length === 0) return <p>Loading activities...</p>;

    return (
        <div className="activities-list">
            <h2>Things to Do</h2>
            <ul>
                {activities.map((event, index) => (
                    <li key={index}>
                        {event.name} - {event.dates.start.localDate}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivitiesList;
