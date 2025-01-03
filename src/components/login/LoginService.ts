import axios from "axios";
import { API_ROOT_URL } from "../../consts/ApiUrl";

export async function loginRequest(credentials: {
    username: string;
    password: string;
}) {
    const response = await axios.post(`${API_ROOT_URL}users/login`, credentials);
    const token = response.data;
    return token;
}