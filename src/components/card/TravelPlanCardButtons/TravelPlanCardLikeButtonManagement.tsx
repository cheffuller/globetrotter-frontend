import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import TravelPlanCardLikeButton from './TravelPlanCardLikeButton';

export type TravelPlanCardLikeButtonManagementProps = {
  travelPlanId: number | undefined;
  postId: number | undefined;
};

const TravelPlanCardLikeButtonManagement = ({
  travelPlanId, postId
}: TravelPlanCardLikeButtonManagementProps) => {
  const [numberOfLikesOnPost, setNumberOfLikesOnPost] = useState<number>(0);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}plans/${travelPlanId}/likes`
        );
        setNumberOfLikesOnPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostLikes();
  }, [travelPlanId]);

  return (
    <>
      <TravelPlanCardLikeButton postId={postId} numberOfLikesOnPost={numberOfLikesOnPost} setNumberOfLikesOnPost={setNumberOfLikesOnPost}/>
    </>
  );
};

export default TravelPlanCardLikeButtonManagement;
