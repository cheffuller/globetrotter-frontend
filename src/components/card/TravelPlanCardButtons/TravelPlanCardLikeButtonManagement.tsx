import React, { useEffect, useState } from 'react';

import TravelPlanCardLikeButton from './TravelPlanCardLikeButton';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

export type TravelPlanCardLikeButtonManagementProps = {
  travelPlan: TravelPlanDetail;
};

const TravelPlanCardLikeButtonManagement = ({
  travelPlan
}: TravelPlanCardLikeButtonManagementProps) => {
  const [numberOfLikesOnPost, setNumberOfLikesOnPost] = useState<number>(0);

  useEffect(() => {
    setNumberOfLikesOnPost(travelPlan.post.numberOfLikes);
  }, [travelPlan.post.numberOfLikes]);

  return (
    <>
      <TravelPlanCardLikeButton travelPlan={travelPlan} numberOfLikesOnPost={numberOfLikesOnPost} setNumberOfLikesOnPost={setNumberOfLikesOnPost}/>
    </>
  );
};

export default TravelPlanCardLikeButtonManagement;
