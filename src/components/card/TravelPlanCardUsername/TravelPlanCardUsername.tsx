import React from 'react'
import { Link } from 'react-router';
import { ROOT_URL, USER_PROFILE_VIEW_URL } from '../../../consts/PageUrls';

type TravelPlanCardUsernameProps = {
  username: string;
}

const TravelPlanCardUsername = ({ username }: TravelPlanCardUsernameProps) => {
  return (
    <>
    <Link className="profile-link ms-auto" to={`${ROOT_URL}${USER_PROFILE_VIEW_URL(username)}`}>{username}</Link>
    </>
  )
}

export default TravelPlanCardUsername