import { Navigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "../../consts/PageUrls";
import { useAuth } from "../../common/AuthContext";

export function UnauthenticatedRoute(prop: { element: JSX.Element }): JSX.Element {
    const { isLoggedIn } = useAuth();
    return !isLoggedIn ? prop.element : <Navigate to={HOME_URL} />;
}