import "./UserProfileForm.css";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { ResponseMessage } from "../../components/response-message/ResponseMessage";
import { getProfileRequest, updateProfileRequest } from "./UserProfileService";
import { removeJwt } from "../../utils/LocalStorageUtils";
import { UserProfile } from "../../interfaces/UserAccount";

export function UserProfileForm() {
    const [bio, setBio] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const { startWaitingForResponse, stopWaitingAfterFailure, stopWaitingAfterSuccess, getResponseMessage } = ResponseMessage();

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        const profile: UserProfile = await getProfileRequest();
        setBio(profile.bio);
        setDisplayName(profile.displayName);
        setIsPrivate(profile.isPrivate);
    }

    async function saveProfile(event: any) {
        event.preventDefault();

        const profile: UserProfile = {
            bio: bio,
            displayName: displayName,
            isPrivate: isPrivate
        }

        try {
            startWaitingForResponse("Waiting for response from the server");
            await updateProfileRequest(profile);
            stopWaitingAfterSuccess("User profile saved.");
        } catch (error: any) {
            switch (error.status) {
                case HttpStatusCode.Unauthorized:
                    stopWaitingAfterFailure("Invalid JWT token.");
                    removeJwt();
                    break;
                case HttpStatusCode.BadRequest:
                    stopWaitingAfterFailure("Invalid user profile details.");
                    break;
                default:
                    stopWaitingAfterFailure("Server is unavailable.");
            }
        }
    }

    return <>
        <form>
            <fieldset className="userProfileForm">
                <div>
                    <label htmlFor="displayName">Display Name</label>
                    <input
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="isPrivate">Private Profile</label>
                    <input
                        type="checkbox"
                        name="isPrivate"
                        checked={isPrivate}
                        onChange={e => setIsPrivate(e.target.checked)}
                    />
                </div>

                <label htmlFor="bio">Bio</label>
                <textarea
                    name="bio"
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                />

                {getResponseMessage()}

                <button onClick={saveProfile}>Save Profile</button>
            </fieldset>
        </form>
    </>;
}