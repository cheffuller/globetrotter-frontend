// import "./UserProfileForm.css";
import { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import { ResponseMessage } from '../../../components/response-message/ResponseMessage';
import {
  getUsernameFromJwt,
  removeJwt,
} from '../../../utils/LocalStorageUtils';
import { UserProfile } from '../../../interfaces/UserAccount';
import {
  getProfileByUsernameRequest,
  updateProfileRequest,
} from '../UserProfileService';
import { Button, Form } from 'react-bootstrap';

export function UserProfileForm() {
  const [bio, setBio] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const {
    startWaitingForResponse,
    stopWaitingAfterFailure,
    stopWaitingAfterSuccess,
    getResponseMessage,
  } = ResponseMessage();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const profile: UserProfile = await getProfileByUsernameRequest(
      getUsernameFromJwt()
    );
    setBio(profile.bio);
    setDisplayName(profile.displayName);
    setIsPrivate(profile.isPrivate);
  }

  async function saveProfile(event: any) {
    event.preventDefault();

    const profile: UserProfile = {
      bio: bio,
      displayName: displayName,
      isPrivate: isPrivate,
    };

    try {
        console.log(profile);
      startWaitingForResponse('Waiting for response from the server');
      await updateProfileRequest(profile);
      stopWaitingAfterSuccess('User profile saved.');
    } catch (error: any) {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          stopWaitingAfterFailure('Invalid JWT token.');
          removeJwt();
          break;
        case HttpStatusCode.BadRequest:
          stopWaitingAfterFailure('Invalid user profile details.');
          break;
        default:
          stopWaitingAfterFailure('Server is unavailable.');
      }
    }
  }

  return (
    <div className='profile-background'>
      <div className='container mt-5 profile-container text-center'>
        <h2>User Profile</h2>
        <Form className='mt-3'>
          <Form.Group className='text-center'>
            <Form.Label htmlFor='displayName'>Display Name</Form.Label>
            <Form.Control
              type='text'
              name='displayName'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <Form.Label htmlFor='bio' className='mt-3'>Bio</Form.Label>
            <Form.Control
              as='textarea'
              name='bio'
              value={bio}
              rows={6}
              onChange={(e) => setBio(e.target.value)}
            />

            <Form.Label htmlFor='isPrivate' className='mt-3'>Private Profile</Form.Label>
            <Form.Check
              type='checkbox'
              name='isPrivate'
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />

            {getResponseMessage()}

            <Button onClick={saveProfile}>Save Profile</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
