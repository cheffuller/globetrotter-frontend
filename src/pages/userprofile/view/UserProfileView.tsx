import { useState, useEffect } from "react";
import { UserProfile } from "../../../interfaces/UserAccount";
import { getProfileByUsernameRequest } from "../UserProfileService";
import "./UserProfileView.css";
import { useParams } from "react-router-dom";

export function UserProfileView() {
    const { username } = useParams<string>();
    const [bio, setBio] = useState<string>("");
    const [displayName, setDisplayName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        const profile: UserProfile = await getProfileByUsernameRequest(username as string);
        setBio(profile.bio);
        setDisplayName(profile.displayName);
        setIsPrivate(profile.isPrivate);
    }

    return <>
        <div className="userProfile">
            <h1>{displayName}</h1>
            <p>{bio}</p>
        </div>
    </>;
}