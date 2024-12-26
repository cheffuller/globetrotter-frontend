import { Navigate } from "react-router-dom";
import { LOGIN_URL } from "../../consts/PageUrls";

export function PrivateRoute(prop: { reactNode: React.ReactNode }): React.ReactNode {
    // Switch 'true' with a 'isLoggedIn()' function later
    return true ? prop.reactNode : <Navigate to={LOGIN_URL} />;
}