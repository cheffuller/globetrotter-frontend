import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

type TravelPlanCardLikeButtonProps = {
  travelPlan: TravelPlanDetail;
  numberOfLikesOnPost: number;
  setNumberOfLikesOnPost: any;
};

const TravelPlanCardLikeButton = ({
  travelPlan,
  numberOfLikesOnPost,
  setNumberOfLikesOnPost,
}: TravelPlanCardLikeButtonProps) => {
  const [likeToggle, setLikeToggle] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikeToggle = async () => {
      if (travelPlan.post.id) {
        try {
          const res = await axiosPrivate.get(
            `${API_ROOT_URL}posts/${travelPlan.post.id}/liked`
          );
          setLikeToggle(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchLikeToggle();
  }, [travelPlan.post.id]);

  const handleClick = async () => {
    try {
      if (!likeToggle) {
        await axiosPrivate.post(`${API_ROOT_URL}posts/${travelPlan.post.id}/likes`);
        setNumberOfLikesOnPost(numberOfLikesOnPost + 1);
        setLikeToggle(true);
      } else {
        await axiosPrivate.delete(`${API_ROOT_URL}posts/${travelPlan.post.id}/likes`);
        setNumberOfLikesOnPost(numberOfLikesOnPost - 1);
        setLikeToggle(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
