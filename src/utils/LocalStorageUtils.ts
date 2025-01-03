import { jwtDecode, JwtPayload } from "jwt-decode";
import { JWT_TOKEN } from "../consts/JwtConst";
import { UserProfile } from "../interfaces/UserAccount";

const SECONDS_TO_MILLISECONDS: number = 1000;

export function hasJwt(): boolean {
    const token: string | null = localStorage.getItem(JWT_TOKEN);
    if (token == null) {
        return false;
    }
    return true;
}

export function hasValidJwt(): boolean {
    const token: string | null = localStorage.getItem(JWT_TOKEN);
    if (token == null) {
        return false;
    }

    const expirationDate: number = (jwtDecode(token).exp as number) * SECONDS_TO_MILLISECONDS;

    if (Date.now() <= expirationDate) {
        localStorage.removeItem(JWT_TOKEN);
        return false;
    }

    return true;
}

export function removeJwt(): void {
    localStorage.removeItem(JWT_TOKEN);
}

export function getUserProfile(): UserProfile {
    const token: string = localStorage.getItem(JWT_TOKEN) as string;
    return jwtDecode<UserProfile>(token);
}