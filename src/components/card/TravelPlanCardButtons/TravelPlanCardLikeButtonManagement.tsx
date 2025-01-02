import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import TravelPlanCardLikeButton from './TravelPlanCardLikeButton';

export type TravelPlanCardLikeButtonManagementProps = {
  travelPlanId: number;
};

const TravelPlanCardLikeButtonManagement = ({
  travelPlanId,
}: TravelPlanCardLikeButtonManagementProps) => {
  const [postLikes, setPostLikes] = useState<number>(0);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}plans/${travelPlanId}/likes`
        );
        setPostLikes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostLikes();
  }, [travelPlanId]);

  return (
    <>
      <TravelPlanCardLikeButton postLikes={postLikes} />
    </>
  );
};

export default TravelPlanCardLikeButtonManagement;
