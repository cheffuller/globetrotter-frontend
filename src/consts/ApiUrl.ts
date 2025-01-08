export const API_ROOT_URL = "http://localhost:8080/"
export const FOLLOWING_STATUS_API = (username: string) => `${API_ROOT_URL}users/${username}/follow-status`;
export const PROFILE_API = (username: string) => `${API_ROOT_URL}users/${username}/profile`;
export const UPDATE_PROFILE_API = `${API_ROOT_URL}users/profile`;
export const FOLLOW_USER_API = (username: string) => `${API_ROOT_URL}users/${username}/following`;
export const BAN_USER_API = (userId: number) => `${API_ROOT_URL}moderators/ban/${userId}`;


