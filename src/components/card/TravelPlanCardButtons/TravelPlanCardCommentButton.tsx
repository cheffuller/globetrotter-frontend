import React from 'react';
import { Button } from 'react-bootstrap';
import { TravelPlan } from '../../../interfaces/TravelPlan';
import { NavLink } from 'react-router-dom';
import { TRAVEL_PLAN_URL } from '../../../consts/PageUrls';

type TravelPlanCardCommentButtonProps = {
  travelPlan: TravelPlan | undefined;
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
          to={`${TRAVEL_PLAN_URL}/detail`}
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
