import { Navigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";
import { useAuth } from "../../common/AuthContext";

export function PrivateRoute(prop: { element: JSX.Element }): JSX.Element {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? prop.element : <Navigate to={LOGIN_URL} />;
}