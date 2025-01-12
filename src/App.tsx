import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import {
  HOME_URL,
  LOGIN_URL,
  ROOT_URL,
  USER_PROFILE_FORM_URL,
  USER_PROFILE_VIEW_URL,
  TRAVEL_PLAN_URL,
  PLAN_DETAIL_URL,
  FOLLOWING_URL,
  TRAVEL_PLAN_MANAGEMENT_URL,
  TRAVEL_PLAN_EDIT_URL,
} from './consts/PageUrls';
import { PrivateRoute } from './components/routes/PrivateRoute';
import { LoginPage } from './pages/login/LoginPage';
import { HomePage } from './pages/home/HomePage';
import NavBarManagement from './components/nav/NavBarManagement';
import TravelPlanPage from './pages/travelplan/TravelPlanPage';
import UserTravelPlanPage from './pages/planmanagement/UserTravelPlanPage';
import { UserProfileForm } from './pages/userprofile/edit/UserProfileForm';
import { UnauthenticatedRoute } from './components/routes/UnauthenticatedRoute';
import EditTravelPlanPage from './pages/travelplan/EditTravelPlanPage';
import TravelPlanDetail from './components/plan-detail/TravelPlanDetailManagement';
import { UserProfileView } from './pages/userprofile/view/UserProfileView';
import { AuthProvider } from './common/AuthContext';
import FollowingPage from './pages/following/FollowingPage';
import { TravelPlanProvider } from './components/travelplan/TravelPlanContext';


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <TravelPlanProvider>
            <NavBarManagement />
            <Routes>
              <Route path={ROOT_URL} element={<HomePage />} />
              <Route
                path={LOGIN_URL}
                element={<UnauthenticatedRoute element={<LoginPage />} />}
              />
              {/* Private Route Functionality now works, user must be logged in to visit pages below */}
              <Route
                path={HOME_URL}
                element={<HomePage />}
              />
              <Route
                path={USER_PROFILE_FORM_URL}
                element={<PrivateRoute element={<UserProfileForm />} />}
              />
              <Route
                path={USER_PROFILE_VIEW_URL()}
                element={<PrivateRoute element={<UserProfileView />} />}
              />
              <Route
                path={TRAVEL_PLAN_URL}
                element={<PrivateRoute element={<TravelPlanPage />} />}
              />
              <Route
                path={TRAVEL_PLAN_MANAGEMENT_URL}
                element={<PrivateRoute element={<UserTravelPlanPage />} />}
              />
              <Route
                path={TRAVEL_PLAN_EDIT_URL}
                element={<PrivateRoute element={<EditTravelPlanPage />} />}
              />
            <Route
              path={PLAN_DETAIL_URL}
              element={<PrivateRoute element={<TravelPlanDetail />} />}
            />
                        <Route
              path={FOLLOWING_URL}
              element={<PrivateRoute element={<FollowingPage />} />}
            />
          </Routes>
          </TravelPlanProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
