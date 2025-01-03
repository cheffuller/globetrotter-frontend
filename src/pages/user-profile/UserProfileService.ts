import { API_ROOT_URL } from "../../consts/ApiUrl";
import { axiosPrivate } from "../../common/axiosPrivate";
import { UserProfile } from "../../interfaces/UserAccount";
import { getUserProfile } from "../../utils/LocalStorageUtils";

export async function updateProfileRequest(profile: UserProfile): Promise<void> {
    await axiosPrivate.post(`${API_ROOT_URL}users/profile`, profile);
}

export async function getProfileRequest(): Promise<UserProfile> {
    const userId: number = getUserProfile().accountId as number;
    const response = await axiosPrivate.get(`${API_ROOT_URL}users/${userId}/profile`);
    return response.data as UserProfile;
}