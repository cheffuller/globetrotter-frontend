import React from 'react';
import { Comment } from '../../../interfaces/Comment';
import CommentCardManagement from './CommentCardManagement';
import NewCommentManagement from './NewCommentManagement';

type TravelPlanCommentsProps = {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  postId: number | undefined;
};

const TravelPlanComments = ({
  comments,
  setComments,
  postId,
}: TravelPlanCommentsProps) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <CommentCardManagement key={index} comment={comment} />
      ))}
      <NewCommentManagement
        postId={postId}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default TravelPlanComments;
