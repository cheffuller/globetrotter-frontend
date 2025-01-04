import React from 'react'
import { Comment } from '../../interfaces/Comment'
import CommentCard from './CommentCard';

type TravelPlanCommentsProps = {
    comments: Comment[];
}

const TravelPlanComments = ({ comments }: TravelPlanCommentsProps) => {

  return (
    <div>
        {comments.map((comment, index) => (
            <CommentCard key={index} comment={comment} />
        ))}
    </div>
  )
}

export default TravelPlanComments