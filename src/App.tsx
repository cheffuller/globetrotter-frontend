import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_URL, LOGIN_URL } from './consts/PageUrls';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';

function App() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path={LOGIN_URL} element={<LoginPage />} />
                <Route path={HOME_URL} element={<PrivateRoute reactNode={<HomePage />} />} />
            </Routes>
        </BrowserRouter>
    </>);
}

export default App;
