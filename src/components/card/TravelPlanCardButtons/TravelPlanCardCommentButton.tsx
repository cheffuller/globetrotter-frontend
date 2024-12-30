import React from 'react';
import { Button } from 'react-bootstrap';

type TravelPlanCardCommentButtonProps = {
  numberOfComments: number;
}

const TravelPlanCardCommentButton = ({ numberOfComments }: TravelPlanCardCommentButtonProps ) => {
  return (
    <>
      <Button className='comment-button'>
        <i className='fa'>&#xf0e6;</i>
        <br />
        {numberOfComments}
      </Button>
    </>
  );
};

export default TravelPlanCardCommentButton;
