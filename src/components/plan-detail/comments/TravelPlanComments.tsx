import React from 'react';
import { Comment } from '../../../interfaces/Comment';
import CommentCardManagement from './CommentCardManagement';
import NewCommentManagement from './NewCommentManagement';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

type TravelPlanCommentsProps = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  travelPlan: TravelPlanDetail;
};

const TravelPlanComments = ({
  comments,
  setComments,
  travelPlan,
}: TravelPlanCommentsProps) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <CommentCardManagement key={index} comment={comment} comments={comments}
        setComments={setComments}/>
      ))}
      <NewCommentManagement
        postId={travelPlan.post.id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default TravelPlanComments;
