export const API_ROOT_URL = "http://54.80.172.33:8080/"
export const FOLLOWING_STATUS_API = (username: string) => `${API_ROOT_URL}users/${username}/follow-status`;
export const PROFILE_API = (username: string) => `${API_ROOT_URL}users/${username}/profile`;
export const UPDATE_PROFILE_API = `${API_ROOT_URL}users/profile`;
export const FOLLOW_USER_API = (username: string) => `${API_ROOT_URL}users/${username}/following`;