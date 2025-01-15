import { FOLLOW_USER_API, FOLLOWING_STATUS_API, PROFILE_API, UPDATE_PROFILE_API, BAN_USER_API } from "../../consts/ApiUrl";
import { axiosPrivate } from "../../common/axiosPrivate";
import { UserProfile } from "../../interfaces/UserAccount";
import { FollowingStatus } from "../../enums/FollowingStatus";
import { BannedUser } from "../../interfaces/BannedUser";

export async function updateProfileRequest(profile: UserProfile): Promise<void> {
    await axiosPrivate.post(UPDATE_PROFILE_API, profile);
}

export async function getProfileByUsernameRequest(username: string): Promise<UserProfile> {
    const response = await axiosPrivate.get(PROFILE_API(username));
    return response.data as UserProfile;
}

export async function getFollowingStatusRequest(username: string): Promise<FollowingStatus> {
    const response = await axiosPrivate.get(FOLLOWING_STATUS_API(username));
    return response.data as FollowingStatus;
}

export async function followOrUnfollowRequest(username: string, status: FollowingStatus): Promise<void> {
    switch(status) {
        case FollowingStatus.NotFollowing:
            await axiosPrivate.post(FOLLOW_USER_API(username));
            return;
        default:
            await axiosPrivate.delete(FOLLOW_USER_API(username));
    }
}

export async function banOrUnbanUserRequest(userId: number, ban: boolean): Promise<void> {
    const bannedUser: BannedUser = { Id: userId }; 

    if (ban) {
        await axiosPrivate.post(BAN_USER_API(userId)); 
    } else {
        await axiosPrivate.delete(BAN_USER_API(userId));
    }
}