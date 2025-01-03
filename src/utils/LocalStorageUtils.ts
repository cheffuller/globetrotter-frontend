import { JWT_TOKEN } from "../consts/JwtConst";

export function hasJwt(): boolean {
    const token: string | null = localStorage.getItem(JWT_TOKEN);
    console.log("TOKEN: " + token);
    if (token == null) {
        return false;
    }
    return true;
}