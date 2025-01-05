import { API_ROOT_URL } from "../../consts/ApiUrl";
import { axiosPrivate } from "../../common/axiosPrivate";
import { UserProfile } from "../../interfaces/UserAccount";
import { FollowingStatus } from "../../enums/FollowingStatus";

export async function updateProfileRequest(profile: UserProfile): Promise<void> {
    await axiosPrivate.post(`${API_ROOT_URL}users/profile`, profile);
}

export async function getProfileByUsernameRequest(username: string): Promise<UserProfile> {
    const response = await axiosPrivate.get(`${API_ROOT_URL}users/${username}/profile`);
    return response.data as UserProfile;
}

export async function getFollowingStatusRequest(username: string): Promise<FollowingStatus> {
    const response = await axiosPrivate.get(`${API_ROOT_URL}users/${username}/follow-status`);
    return response.data as FollowingStatus;
}

export async function followOrUnfollowRequest(username: string, status: FollowingStatus): Promise<void> {
    switch(status) {
        case FollowingStatus.NotFollowing:
            await axiosPrivate.post(`${API_ROOT_URL}users/${username}/following`);
            return;
        default:
            await axiosPrivate.delete(`${API_ROOT_URL}users/${username}/following`);
    }
}