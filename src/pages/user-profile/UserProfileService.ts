import { API_ROOT_URL } from "../../consts/ApiUrl";
import { axiosPrivate } from "../../common/axiosPrivate";

export async function updateProfileRequest(profile: {
    bio: string;
    displayName: string;
    isPrivate: boolean;
}) {
    await axiosPrivate.post(`${API_ROOT_URL}users/profile`, profile)
}