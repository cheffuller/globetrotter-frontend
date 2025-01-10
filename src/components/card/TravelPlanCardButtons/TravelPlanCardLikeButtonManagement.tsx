import React, { useEffect, useState } from 'react';
import TravelPlanCardLikeButton from './TravelPlanCardLikeButton';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';

export type TravelPlanCardLikeButtonManagementProps = {
  travelPlan: TravelPlanDetail;
  setTravelPlanState: React.Dispatch<React.SetStateAction<TravelPlanDetail>>;
};

const TravelPlanCardLikeButtonManagement = ({
  travelPlan,
  setTravelPlanState,
}: TravelPlanCardLikeButtonManagementProps) => {
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
        await axiosPrivate.post(
          `${API_ROOT_URL}posts/${travelPlan.post.id}/likes`
        );
        setTravelPlanState({
          ...travelPlan,
          post: {
            ...travelPlan.post,
            numberOfLikes: travelPlan.post.numberOfLikes + 1,
          },
        });
        setLikeToggle(true);
      } else {
        await axiosPrivate.delete(
          `${API_ROOT_URL}posts/${travelPlan.post.id}/likes`
        );
        setTravelPlanState({
          ...travelPlan,
          post: {
            ...travelPlan.post,
            numberOfLikes: travelPlan.post.numberOfLikes - 1,
          },
        });
        setLikeToggle(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TravelPlanCardLikeButton
        numberOfLikesOnPost={travelPlan.post.numberOfLikes}
        likeToggle={likeToggle}
        handleClick={handleClick}
      />
    </>
  );
};

export default TravelPlanCardLikeButtonManagement;
