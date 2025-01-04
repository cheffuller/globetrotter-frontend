import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';

type TravelPlanCardLikeButtonProps = {
  postId: number | undefined;
  postLikes: number;
  setPostLikes: any;
};

const TravelPlanCardLikeButton = ({
  postId,
  postLikes,
  setPostLikes,
}: TravelPlanCardLikeButtonProps) => {
  const [likeToggle, setLikeToggle] = useState<boolean>(false);

  useEffect(() => {
    const fetchLikeToggle = async () => {
      if (postId) {
        try {
          const res = await axiosPrivate.get(
            `${API_ROOT_URL}posts/${postId}/liked`
          );
          setLikeToggle(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchLikeToggle();
  }, [postId]);

  const handleClick = async () => {
    try {
      if (!likeToggle) {
        await axiosPrivate.post(`${API_ROOT_URL}posts/${postId}/likes`);
        setPostLikes(postLikes + 1);
        setLikeToggle(true);
      } else {
        await axiosPrivate.delete(`${API_ROOT_URL}posts/${postId}/likes`);
        setPostLikes(postLikes - 1);
        setLikeToggle(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button className='like-button'>
      {likeToggle ? (
        <i className='fa liked' onClick={handleClick} style={{ color: '#70A288' }}>
          &#xf087;
        </i>
      ) : (
        <i className='fa unliked' onClick={handleClick} >
          &#xf087;
        </i>
      )}
      <br />
      {postLikes}
    </Button>
  );
};

export default TravelPlanCardLikeButton;
