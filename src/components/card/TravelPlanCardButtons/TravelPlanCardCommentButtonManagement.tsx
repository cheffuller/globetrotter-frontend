import React, { useEffect, useState } from 'react';
import TravelPlanCardCommentButton from './TravelPlanCardCommentButton';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

type TravelPlanCardCommentButtonManagementProps = {
  travelPlan: TravelPlanDetail;
  numberOfCommentsProps?: number;
};

const TravelPlanCardCommentButtonManagement = ({
  travelPlan,
  numberOfCommentsProps,
}: TravelPlanCardCommentButtonManagementProps) => {
  const [numberOfComments, setNumberOfComments] = useState<number>(0);

  useEffect(() => {
    if (numberOfCommentsProps) {
      setNumberOfComments(numberOfCommentsProps);
    } else {
      setNumberOfComments(travelPlan.post.comments.length)
    }
  }, [numberOfCommentsProps, travelPlan]);

  return (
    <>
      <TravelPlanCardCommentButton
        travelPlan={travelPlan}
        numberOfComments={numberOfComments}
      />
    </>
  );
};

export default TravelPlanCardCommentButtonManagement;
