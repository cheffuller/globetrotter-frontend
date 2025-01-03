import axios from "axios";
import { API_ROOT_URL } from "../../consts/ApiUrl";
import { AccountRole } from "../../enums/AccountRole";

export async function loginRequest(credentials: {
    accountRole: AccountRole;
    username: string;
    password: string;
}) {
    const response = credentials.accountRole === AccountRole.User?
        await axios.post(`${API_ROOT_URL}users/login`, credentials) : 
        await axios.post(`${API_ROOT_URL}moderators/login`, credentials);
    const token = response.data;
    return token;
}