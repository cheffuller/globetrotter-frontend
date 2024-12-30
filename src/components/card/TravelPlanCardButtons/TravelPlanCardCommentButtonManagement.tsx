import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from '../../../consts/ApiUrl';
import TravelPlanCardCommentButton from './TravelPlanCardCommentButton';

export type TravelPlanCardCommentButtonManagementProps = {
  travelPlanId: number;
};

const TravelPlanCardCommentButtonManagement = ({
  travelPlanId,
}: TravelPlanCardCommentButtonManagementProps) => {
  const [numberOfComments, setnumberOfComments] = useState<number>();

  // TODO: create getNumberOfCommentsOnPostById endpoint and method in backend

  useEffect(() => {
    setnumberOfComments(1);
    // const fetchCommentLikes = () => {
    //   try {
    //     const res = await axios.get(`${API_URL}`);
    //     setComment
    //   }
    // }
  }, []);

  return (
    <>
      {numberOfComments && <TravelPlanCardCommentButton numberOfComments={numberOfComments}/>}
    </>
  );
};

export default TravelPlanCardCommentButtonManagement;
