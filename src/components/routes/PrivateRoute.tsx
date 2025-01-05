import { Navigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";
import { JWT_TOKEN } from "../../consts/JwtConst";

export function PrivateRoute(prop: { element: JSX.Element }): JSX.Element {
    const token = localStorage.getItem(JWT_TOKEN);
    const isLoggedIn = token != null;
    return isLoggedIn ? prop.element : <Navigate to={LOGIN_URL} />;
}