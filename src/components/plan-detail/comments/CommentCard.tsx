import React from 'react';
import { Comment } from '../../../interfaces/Comment';
import { Card } from 'react-bootstrap';
import { timeSince } from '../../../common/TimeSinceDate';

type CommentCardProps = {
  comment: Comment;
  likeToggle: boolean;
  numberOfLikesOnComment: number;
  handleClick: React.MouseEventHandler<HTMLElement>;
  displayName: string;
};

const CommentCard = ({
  comment,
  likeToggle,
  numberOfLikesOnComment,
  handleClick,
  displayName,
}: CommentCardProps) => {
  return (
    <Card className='comment-card'>
      {comment.content}
      <div className='comment-card-foot'>
        {likeToggle ? (
          <i
            className='fa liked mt-1 comment-like'
            onClick={handleClick}
            style={{ color: '#D5896F' }}
          >
            &#xf08a; {numberOfLikesOnComment > 0 && numberOfLikesOnComment}
          </i>
        ) : (
          <i className='fa unliked mt-1 comment-like' onClick={handleClick}>
            &#xf08a; {numberOfLikesOnComment > 0 && numberOfLikesOnComment}
          </i>
        )}
        {displayName} - {timeSince(comment.commentedDate)}
      </div>
    </Card>
  );
};

export default CommentCard;
