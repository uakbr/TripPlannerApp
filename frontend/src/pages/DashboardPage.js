import React, { Suspense, lazy } from 'react';
import Header from '../components/Header';
import FlightStatus from '../components/FlightStatus';
import WeatherForecast from '../components/WeatherForecast';
import NewsFeed from '../components/NewsFeed';
import FeedbackForm from '../components/FeedbackForm';

const ActivitiesList = lazy(() => import('../components/ActivitiesList'));

function DashboardPage() {
    return (
        <div className="dashboard-page">
            <Header />
            <div className="container">
                <FlightStatus />
                <WeatherForecast />
                <NewsFeed />
                <Suspense fallback={<div>Loading activities...</div>}>
                    <ActivitiesList />
                </Suspense>
                <FeedbackForm />
            </div>
        </div>
    );
}

export default DashboardPage;
