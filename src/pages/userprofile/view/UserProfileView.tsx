// import "./UserProfileView.css";
import { useState, useEffect } from 'react';
import { UserProfile } from '../../../interfaces/UserAccount';
import {
  banOrUnbanUserRequest,
  followOrUnfollowRequest,
  getFollowingStatusRequest,
  getProfileByUsernameRequest,
} from '../UserProfileService';
import { useParams } from 'react-router';
import { ResponseMessage } from '../../../components/response-message/ResponseMessage';
import { HttpStatusCode } from 'axios';
import { getUsernameFromJwt } from '../../../utils/LocalStorageUtils';
import { FollowingStatus } from '../../../enums/FollowingStatus';
import { Button } from 'react-bootstrap';
import { isModerator } from '../../../common/AuthService';
import { BannedUser } from '../../../interfaces/BannedUser';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';

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
  const [isBanned, setIsBanned] = useState<boolean>(false);
  const [userId, setUserId] = useState<number | null>(null); // Store userId
  const isMod = isModerator();

  useEffect(() => {
    loadProfile();
  }, [username]);

  useEffect(() => {
    banCheck();
  }, [userId]);

  const banCheck = async () => {
    if (isMod && userId) {
      try {
        const res = await axiosPrivate.get(`${API_ROOT_URL}moderators/${userId}/banned`);
        setIsBanned(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      setUserId(profile.accountId ?? null); // Set userId from the profile data
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

  async function banOrUnbanUser() {
    if (userId === null) {
      stopWaitingAfterFailure('User ID is not available.');
      return;
    }

    const bannedUser: BannedUser = { Id: userId }; // Create the BannedUser object

    startWaitingForResponse('Updating user status...');
    try {
      await banOrUnbanUserRequest(bannedUser.Id, !isBanned);
      setIsBanned(!isBanned);
      stopWaitingAfterSuccess(
        isBanned ? 'User unbanned successfully.' : 'User banned successfully.'
      );
    } catch (error: any) {
      stopWaitingAfterFailure('Failed to update user status.');
      console.error('Error:', error);
    }
  }

  return (
    <div className='profile-background'>
      <div className='container mt-5 profile-container'>
        <div className='text-center'>
          {profileFetched ? (
            <div className='userProfile'>
              <h2 className='mt-2'>{displayName}</h2>
              <p className='mt-5'>{bio}</p>
              {username != getUsernameFromJwt() && !isMod && (
                <Button onClick={followOrUnfollowUser}>{isFollowing}</Button>
              )}
              {isMod && (
                <Button onClick={banOrUnbanUser}>
                  {isBanned ? 'Unban User' : 'Ban User'}
                </Button>
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
