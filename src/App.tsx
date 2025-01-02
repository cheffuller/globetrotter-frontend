import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_URL, LOGIN_URL, REGISTER_URL, TRAVEL_PLAN_URL } from './consts/PageUrls';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import NavBarManagement from './components/nav/NavBarManagement';
import TravelPlanPage from './pages/travelplan/TravelPlanPage';
import UserTravelPlanPage from './pages/planmanagement/UserTravelPlanPage';
import RegisterPage from './pages/register/RegisterPage';

function App() {
    return (<>
        <BrowserRouter>
            {/* <TravelPlanProvider> */}
                <NavBarManagement />
                <Routes>
                    <Route path={REGISTER_URL} element={<RegisterPage />} />
                    <Route path={LOGIN_URL} element={<LoginPage />} />
                    <Route path={HOME_URL} element={<PrivateRoute reactNode={<HomePage />} />} />
                    <Route path={TRAVEL_PLAN_URL} element={<PrivateRoute reactNode={<TravelPlanPage />}/>}/>
                    <Route path={TRAVEL_PLAN_URL + '/management'} element={<PrivateRoute reactNode={<UserTravelPlanPage />} />} />
                </Routes>
        </BrowserRouter>
    </>);
}

export default App;
