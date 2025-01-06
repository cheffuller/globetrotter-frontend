import { Navigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";
import { isAuthenticated } from "../../common/AuthService";

export function PrivateRoute(prop: { element: JSX.Element }): JSX.Element {
    const isLoggedIn = isAuthenticated();
    return isLoggedIn ? prop.element : <Navigate to={LOGIN_URL} />;
}