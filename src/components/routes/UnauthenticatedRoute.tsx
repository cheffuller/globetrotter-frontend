import { Navigate } from "react-router-dom";
import { HOME_URL } from "../../consts/PageUrls";
import { isAuthenticated } from "../../common/AuthService";

export function UnauthenticatedRoute(prop: { element: JSX.Element }): JSX.Element {
    const isLoggedIn = isAuthenticated();
    return !isLoggedIn ? prop.element : <Navigate to={HOME_URL} />;
}