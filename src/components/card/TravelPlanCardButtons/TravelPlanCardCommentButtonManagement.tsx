import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import TravelPlanCardCommentButton from './TravelPlanCardCommentButton';

export type TravelPlanCardCommentButtonManagementProps = {
  travelPlanId: number;
};

const TravelPlanCardCommentButtonManagement = ({
  travelPlanId,
}: TravelPlanCardCommentButtonManagementProps) => {
  const [numberOfComments, setnumberOfComments] = useState<number>(0);

  useEffect(() => {
    const fetchCommentLikes = async () => {
      try {
        const res = await axiosPrivate.get(`${API_ROOT_URL}plans/${travelPlanId}/comments`);
        setnumberOfComments(res.data);
      } catch (err) {
        console.log(err)
      }
    }

    fetchCommentLikes();
  }, [travelPlanId]);

  return (
    <>
      <TravelPlanCardCommentButton numberOfComments={numberOfComments}/>
    </>
  );
};

export default TravelPlanCardCommentButtonManagement;
