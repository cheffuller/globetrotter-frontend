import axios from "axios";
import { JWT_TOKEN } from "../../consts/JwtConst";
import { API_ROOT_URL } from "../../consts/ApiUrl";

export async function loginRequest(credentials: {
    username: string;
    password: string;
}) {
    const response = await axios.post(`${API_ROOT_URL}users/login`, credentials);
    const token = response.data;
    localStorage.setItem(JWT_TOKEN, token);
}