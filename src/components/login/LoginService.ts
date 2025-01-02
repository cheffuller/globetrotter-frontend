import axios, { HttpStatusCode } from "axios";
import { JWT_TOKEN } from "../../consts/JwtConst";
import { UnauthorizedError } from "../../errors/HttpErrors";
import { API_ROOT_URL } from "../../consts/ApiUrl";

export async function loginRequest(credentials: {
    username: string;
    password: string;
}) {
    const response = await axios.post(`${API_ROOT_URL}users/login`, credentials);
    switch (response.status) {
        case HttpStatusCode.Ok:
            break;
        case HttpStatusCode.Unauthorized:
            console.log("THROWING UNAUTHORIZED");
            throw new UnauthorizedError("Invalid credentials.")
        default:
            console.log("THROWING DEFUALT")
            throw new Error("Server unavailable.");
    }
    const token = response.data;
    localStorage.setItem(JWT_TOKEN, token);
}