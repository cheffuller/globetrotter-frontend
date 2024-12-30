import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../consts/ApiUrl';
import TravelPlanCardLikeButton from './TravelPlanCardLikeButton';

export type TravelPlanCardLikeButtonManagementProps = {
  travelPlanId: number;
};

const TravelPlanCardLikeButtonManagement = ({
  travelPlanId,
}: TravelPlanCardLikeButtonManagementProps) => {
  const [postLikes, setPostLikes] = useState<number>();

  // TODO: create getPostIdByTravelPlanId endpoint and method in backend

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const res = await axios.get(`${API_URL}posts/${travelPlanId}/likes`);
        setPostLikes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostLikes();
  }, [travelPlanId]);

  return <>{postLikes && <TravelPlanCardLikeButton postLikes={postLikes} />}</>;
};

export default TravelPlanCardLikeButtonManagement;
