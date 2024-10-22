import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';

const LoginPageLazy = lazy(() => import('./pages/LoginPage'));
const DashboardPageLazy = lazy(() => import('./pages/DashboardPage'));
const PrivateRouteLazy = lazy(() => import('./components/PrivateRoute'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/login" component={LoginPageLazy} />
                    <PrivateRouteLazy path="/" component={DashboardPageLazy} />
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
