import React, { useEffect, useState } from 'react';
import TravelPlanCard from '../card/TravelPlanCard';
import { useLocation } from 'react-router-dom';
import { axiosPrivate } from '../../common/axiosPrivate';
import { API_ROOT_URL } from '../../consts/ApiUrl';
import { Comment } from '../../interfaces/Comment';
import TravelPlanComments from './TravelPlanComments';

const TravelPlanDetailManagement = () => {
  const [postId, setPostId] = useState<number>();
  const [comments, setComments] = useState<Comment[]>([]);
  const location = useLocation();
  const travelPlan = location.state?.travelPlan;

  useEffect(() => {
    const fetchPostId = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}posts/plans/${travelPlan.id}`
        );
        setPostId(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostId();
  }, [travelPlan]);

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
      try {
        const res = await axiosPrivate.get(`${API_ROOT_URL}posts/${postId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    }}

    fetchComments();
  }, [postId]);
  
  return (
    <div className='container mt-5 row row-cols-sm-1 row-cols-md-3 row-cols-lg-4 mx-auto' >
      <div></div>
      {travelPlan && <TravelPlanCard travelPlan={travelPlan!} index={1} />}
      {comments && <TravelPlanComments comments={comments} />}
    </div>
  );
};

export default TravelPlanDetailManagement;
