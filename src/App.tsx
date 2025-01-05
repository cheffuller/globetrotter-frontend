import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_URL, LOGIN_URL, REGISTER_URL, ROOT_URL, USER_PROFILE_FORM_URL, USER_PROFILE_VIEW_URL } from './consts/PageUrls';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import NavBarManagement from './components/nav/NavBarManagement';
import RegisterPage from './pages/register/RegisterPage';
import { UserProfileForm } from './pages/userprofile/edit/UserProfileForm';
import { UnauthenticatedRoute } from './components/routes/UnauthenticatedRoute';
import { UserProfileView } from './pages/userprofile/view/UserProfileView';

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
                    <Route path={USER_PROFILE_FORM_URL} element={<PrivateRoute element={<UserProfileForm />} />} />
                    <Route path={USER_PROFILE_VIEW_URL} element={<PrivateRoute element={<UserProfileView />} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
