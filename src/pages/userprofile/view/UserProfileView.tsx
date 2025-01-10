// import "./UserProfileView.css";
import { useState, useEffect } from 'react';
import { UserProfile } from '../../../interfaces/UserAccount';
import {
  followOrUnfollowRequest,
  getFollowingStatusRequest,
  getProfileByUsernameRequest,
} from '../UserProfileService';
import { useParams } from 'react-router-dom';
import { ResponseMessage } from '../../../components/response-message/ResponseMessage';
import { HttpStatusCode } from 'axios';
import { getUsernameFromJwt } from '../../../utils/LocalStorageUtils';
import { FollowingStatus } from '../../../enums/FollowingStatus';

export function UserProfileView() {
  const { username } = useParams<string>();
  const [bio, setBio] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<FollowingStatus>(
    FollowingStatus.NotFollowing
  );
  const [profileFetched, setProfileFetched] = useState<boolean>(false);
  const {
    startWaitingForResponse,
    stopWaitingAfterFailure,
    stopWaitingAfterSuccess,
    getResponseMessage,
  } = ResponseMessage();

  useEffect(() => {
    loadProfile();
  }, [username]);

  async function loadProfile() {
    try {
      setProfileFetched(false);
      startWaitingForResponse('Waiting for response from the server');
      const profile: UserProfile = await getProfileByUsernameRequest(
        username as string
      );
      const status: FollowingStatus = await getFollowingStatusRequest(
        username as string
      );
      stopWaitingAfterSuccess('');
      setBio(profile.bio);
      setDisplayName(profile.displayName);
      setIsPrivate(profile.isPrivate);
      setIsFollowing(status);
      setProfileFetched(true);
    } catch (error: any) {
      switch (error.status) {
        case HttpStatusCode.NotFound:
          stopWaitingAfterFailure('User not found.');
          break;
        default:
          stopWaitingAfterFailure('Server is unavailable.');
      }
    }
  }

  async function followOrUnfollowUser(event: any) {
    event.preventDefault();
    startWaitingForResponse('');

    try {
      await followOrUnfollowRequest(username as string, isFollowing);
      const status: FollowingStatus = await getFollowingStatusRequest(
        username as string
      );
      setIsFollowing(status);
    } catch (error: any) {
      stopWaitingAfterFailure('Server is unavailable.');
    }
  }

  return (
      <div className='profile-background'>
        <div className="container mt-5 profile-container">
            <div className='text-center'>
          {profileFetched ? (
            <div className='userProfile'>
              <h2>{displayName}</h2>
              <p className='mt-5'>{bio}</p>
              {username != getUsernameFromJwt() && (
                <button onClick={followOrUnfollowUser}>{isFollowing}</button>
              )}
            </div>
          ) : (
            <>
              <div className='userProfile'>{getResponseMessage()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
