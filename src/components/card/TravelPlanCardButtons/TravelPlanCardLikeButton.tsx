import React from 'react';
import { Button } from 'react-bootstrap';

type TravelPlanCardLikeButtonProps = {
  postLikes: number;
}

const TravelPlanCardLikeButton = ({ postLikes }: TravelPlanCardLikeButtonProps) => {
  return (
    <Button className='like-button'>
       <i className='fa'>&#xf087;</i>
       <br />
       {postLikes}
    </Button>
  );
};

export default TravelPlanCardLikeButton;
