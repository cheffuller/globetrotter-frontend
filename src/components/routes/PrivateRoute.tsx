import { Navigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";
import { useAuth } from "../../common/AuthContext";

export function PrivateRoute(prop: { reactNode: JSX.Element }): JSX.Element {
    const { isLoggedIn } = useAuth();
    console.log("Is logged in: " + isLoggedIn);
    return isLoggedIn ? prop.reactNode : <Navigate to={LOGIN_URL} />;
}