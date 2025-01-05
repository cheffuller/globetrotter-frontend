import { useState, useEffect } from "react";
import { UserProfile } from "../../../interfaces/UserAccount";
import { getFollowingStatusRequest, getProfileByUsernameRequest } from "../UserProfileService";
import "./UserProfileView.css";
import { useParams } from "react-router-dom";
import { ResponseMessage } from "../../../components/response-message/ResponseMessage";
import { HttpStatusCode } from "axios";
import { getUsernameFromJwt, removeJwt } from "../../../utils/LocalStorageUtils";
import { FollowingStatus } from '../../../enums/FollowingStatus';

export function UserProfileView() {
    const { username } = useParams<string>();
    const [bio, setBio] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isFollowing, setIsFollowing] = useState<FollowingStatus>(FollowingStatus.NotFollowing);
    const [profileFetched, setProfileFetched] = useState<boolean>(false);
    const { startWaitingForResponse, stopWaitingAfterFailure, stopWaitingAfterSuccess, getResponseMessage } = ResponseMessage();

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

return <>
        {profileFetched ?
            <div className="userProfile">
                <h1>{displayName}</h1>
                <p>{bio}</p>
                {username != getUsernameFromJwt() ?
                    <button>{isFollowing}</button> :
                    <> </>}
                {getResponseMessage()}
            </div> :
            <></>}
    </>;
}