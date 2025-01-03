import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_URL, LOGIN_URL, REGISTER_URL, ROOT_URL, USER_PROFILE_URL } from './consts/PageUrls';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import NavBarManagement from './components/nav/NavBarManagement';
import RegisterPage from './pages/register/RegisterPage';
import { UserProfile } from './pages/user-profile/UserProfile';
import { UnauthenticatedRoute } from './components/routes/UnauthenticatedRoute';

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
                    <Route path={USER_PROFILE_URL} element={<PrivateRoute element={<UserProfile />} />} />
                    <Route path="/helloworld" element={<>HELLO WORLD</>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
