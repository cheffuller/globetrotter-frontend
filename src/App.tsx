import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_URL, LOGIN_URL, REGISTER_URL, ROOT_URL, TRAVEL_PLAN_URL } from './consts/PageUrls';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import NavBarManagement from './components/nav/NavBarManagement';
import TravelPlanPage from './pages/travelplan/TravelPlanPage';
import UserTravelPlanPage from './pages/planmanagement/UserTravelPlanPage';
import RegisterPage from './pages/register/RegisterPage';
import { UnauthenticatedRoute } from './components/routes/UnauthenticatedRoute';
import EditTravelPlanPage from './pages/travelplan/EditTravelPlanPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBarManagement />
                <Routes>
                    <Route path={ROOT_URL} element={<HomePage />} />
                    <Route path={REGISTER_URL} element={<UnauthenticatedRoute element={<RegisterPage />} />} />
                    <Route path={LOGIN_URL} element={<UnauthenticatedRoute element={<LoginPage />} />} />
                    {/* Private Route Functionality now works, user must be logged in to visit pages below */}
                    <Route
                        path={HOME_URL}
                        element={<PrivateRoute element={<HomePage />} />}
                    />
                    <Route path={TRAVEL_PLAN_URL} element={<PrivateRoute element={<TravelPlanPage />}/>}/>
                    <Route path={TRAVEL_PLAN_URL + '/management'} element={<PrivateRoute element={<UserTravelPlanPage />} />} />
                    <Route path={TRAVEL_PLAN_URL + '/edit'} element={<PrivateRoute element={<EditTravelPlanPage />} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
