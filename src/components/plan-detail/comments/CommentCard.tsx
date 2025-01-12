import React from 'react';
import { Comment } from '../../../interfaces/Comment';
import { Card } from 'react-bootstrap';
import { timeSince } from '../../../common/TimeSinceDate';
import { Link } from 'react-router';
import { ROOT_URL, USER_PROFILE_VIEW_URL } from '../../../consts/PageUrls';
import { getUsername, isModerator } from '../../../common/AuthService';

type CommentCardProps = {
  comment: Comment;
  likeToggle: boolean;
  numberOfLikesOnComment: number;
  handleLikeClick: React.MouseEventHandler<HTMLElement>;
  setDeleteCommentToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCommentToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommentCard = ({
  comment,
  likeToggle,
  numberOfLikesOnComment,
  handleLikeClick,
  setDeleteCommentToggle,
  setEditCommentToggle,
}: CommentCardProps) => {
  const username = getUsername();

  return (
    <Card className='comment-card'>
      {comment.username === username ? (
        <div
          className='edit-comment'
          title='Edit Comment'
          onClick={() => setEditCommentToggle(true)}
        >
          {comment.content}
        </div>
      ) : (
        <div>{comment.content}</div>
      )}
      <div className='comment-card-foot'>
        {likeToggle ? (
          <i
            className='fa liked mt-1 comment-like'
            onClick={handleLikeClick}
            style={{ color: '#D5896F' }}
          >
            &#xf08a; {numberOfLikesOnComment > 0 && numberOfLikesOnComment}
          </i>
        ) : (
          <i className='fa unliked mt-1 comment-like' onClick={handleLikeClick}>
            &#xf08a; {numberOfLikesOnComment > 0 && numberOfLikesOnComment}
          </i>
        )}
        <Link
          className='profile-link ms-auto'
          to={`${ROOT_URL}${USER_PROFILE_VIEW_URL(comment.username)}`}
        >
          {comment.username}
        </Link>
        &nbsp;-&nbsp;{timeSince(comment.commentedDate)}
        {(comment.username === username || isModerator()) && (
          <span className='delete-comment' onClick={() => setDeleteCommentToggle(true)}>
            &nbsp;-&nbsp;<i className='fa comment-like'>&#xf1f8;</i>
          </span>
        )}
      </div>
    </Card>
  );
};

export default CommentCard;
