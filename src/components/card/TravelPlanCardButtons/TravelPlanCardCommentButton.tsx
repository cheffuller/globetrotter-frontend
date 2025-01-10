import React from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PLAN_DETAIL_URL } from '../../../consts/PageUrls';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

type TravelPlanCardCommentButtonProps = {
  travelPlan: TravelPlanDetail;
  numberOfComments: number;
};

const TravelPlanCardCommentButton = ({
  travelPlan,
  numberOfComments,
}: TravelPlanCardCommentButtonProps) => {
  return (
    <>
      <Button className='comment-button'>
        <NavLink className='comment-button'
          to={`${PLAN_DETAIL_URL}`}
          state={{ travelPlan: travelPlan }}
        >
          <i className='fa'>&#xf0e6;</i>
        </NavLink>
        <br />
        {numberOfComments > 0 ? numberOfComments : <br />}
      </Button>
    </>
  );
};

export default TravelPlanCardCommentButton;
