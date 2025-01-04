import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import TravelPlanCardCommentButton from './TravelPlanCardCommentButton';
import { TravelPlan } from '../../../interfaces/TravelPlan';

type TravelPlanCardCommentButtonManagementProps = {
  travelPlan: TravelPlan | undefined;
  postId: number | undefined;
};

const TravelPlanCardCommentButtonManagement = ({
  travelPlan,
  postId,
}: TravelPlanCardCommentButtonManagementProps) => {
  const [numberOfComments, setnumberOfComments] = useState<number>(0);

  useEffect(() => {
    const fetchNumberOfComments = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}posts/${postId}/comments`
        );
        setnumberOfComments(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    if (postId) {
      fetchNumberOfComments();
    }
  }, [postId]);

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
