import "./UserProfileView.css";
import { useState, useEffect } from "react";
import { UserProfile } from "../../../interfaces/UserAccount";
import { followOrUnfollowRequest, getFollowingStatusRequest, getProfileByUsernameRequest, banOrUnbanUserRequest } from "../UserProfileService";
import { useParams } from "react-router-dom";
import { ResponseMessage } from "../../../components/response-message/ResponseMessage";
import { HttpStatusCode } from "axios";
import { getUsernameFromJwt } from "../../../utils/LocalStorageUtils";
import { FollowingStatus } from "../../../enums/FollowingStatus";
import { isModerator } from "../../../common/AuthService";
import { BannedUser } from "../../../interfaces/BannedUser";

export function UserProfileView() {
    const { username } = useParams<string>();
    const [bio, setBio] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<FollowingStatus>(FollowingStatus.NotFollowing);
    const [isBanned, setIsBanned] = useState<boolean>(false);
    const [profileFetched, setProfileFetched] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null); // Store userId
    const { startWaitingForResponse, stopWaitingAfterFailure, stopWaitingAfterSuccess, getResponseMessage } = ResponseMessage();

    const isMod = isModerator();

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            startWaitingForResponse("Waiting for response from the server");
            const profile: UserProfile = await getProfileByUsernameRequest(username as string);
            const status: FollowingStatus = await getFollowingStatusRequest(username as string);
            stopWaitingAfterSuccess("");
            setBio(profile.bio);
            setDisplayName(profile.displayName);
            setIsPrivate(profile.isPrivate);
            setIsFollowing(status);
            setUserId(profile.accountId ?? null); // Set userId from the profile data
            setProfileFetched(true);
        } catch (error: any) {
            switch (error.status) {
                case HttpStatusCode.NotFound:
                    stopWaitingAfterFailure("User not found.");
                    break;
                default:
                    stopWaitingAfterFailure("Server is unavailable.");
            }
        }
    }

    async function followOrUnfollowUser(event: any) {
        event.preventDefault();
        startWaitingForResponse("");

        try {
            await followOrUnfollowRequest(username as string, isFollowing);
            const status: FollowingStatus = await getFollowingStatusRequest(username as string);
            setIsFollowing(status);
        } catch (error: any) {
            stopWaitingAfterFailure("Server is unavailable.");
        }
    }

    async function banOrUnbanUser() {
        if (userId === null) {
            stopWaitingAfterFailure("User ID is not available.");
            return;
        }

        const bannedUser: BannedUser = { Id: userId }; // Create the BannedUser object

        startWaitingForResponse("Updating user status...");
        try {
            await banOrUnbanUserRequest(bannedUser.Id, !isBanned);
            setIsBanned(!isBanned); 
            stopWaitingAfterSuccess(isBanned ? "User unbanned successfully." : "User banned successfully.");
        } catch (error: any) {
            stopWaitingAfterFailure("Failed to update user status.");
            console.error("Error:", error); 
        }
    }

    return <>
        <div className="userProfileViewContainer">
            {profileFetched ? (
                <div className="userProfile">
                    <h1>{displayName}</h1>
                    <p>{bio}</p>
                    {username != getUsernameFromJwt() ? (
                        <button onClick={followOrUnfollowUser}>{isFollowing}</button>
                    ) : (
                        <> </>
                    )}
                    {isMod && (
                        <button onClick={banOrUnbanUser}>
                            {isBanned ? "Unban User" : "Ban User"}
                        </button>
                    )}
                    {getResponseMessage()}
                </div>
            ) : (
                <></>
            )}
        </div>
    </>;
}

