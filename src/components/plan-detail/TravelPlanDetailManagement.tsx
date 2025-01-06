import React, { useEffect, useState } from 'react';
import TravelPlanCard from '../card/TravelPlanCard';
import { useLocation } from 'react-router-dom';
import { Comment } from '../../interfaces/Comment';
import TravelPlanComments from './comments/TravelPlanComments';

const TravelPlanDetailManagement = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const location = useLocation();
  const travelPlan = location.state?.travelPlan;

  useEffect(() => {
    setComments(travelPlan.post.comments)
  }, [travelPlan])
  
  return (
    <div className='container mt-5 row justify-content-center mx-auto' >
      <div className='col-12 col-sm-5 col-md-4 col-lg-3'>
      {travelPlan && <TravelPlanCard travelPlan={travelPlan!} index={1} numberOfCommentsProps={comments.length} />}
      </div>
      <div className='col-7'>
      {comments && <TravelPlanComments comments={comments} setComments={setComments} travelPlan={travelPlan} />}
      </div>
    </div>
  );
};

export default TravelPlanDetailManagement;
