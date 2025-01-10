import React from 'react';
import { Button } from 'react-bootstrap';

type TravelPlanCardLikeButtonProps = {
  numberOfLikesOnPost: number;
  likeToggle: boolean;
  handleClick: any;
};

const TravelPlanCardLikeButton = ({
  numberOfLikesOnPost,
  likeToggle,
  handleClick
}: TravelPlanCardLikeButtonProps) => {
  
  return (
    <Button className='like-button'>
      {likeToggle ? (
        <i className='fa liked' onClick={handleClick} style={{ color: '#D5896F' }}>
          &#xf08a;
        </i>
      ) : (
        <i className='fa unliked' onClick={handleClick} >
          &#xf08a;
        </i>
      )}
      <br />
      {numberOfLikesOnPost > 0 ? numberOfLikesOnPost : <br />}
    </Button>
  );
};

export default TravelPlanCardLikeButton;
