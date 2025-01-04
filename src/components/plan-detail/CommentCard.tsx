import React, { useEffect, useState } from 'react';
import { Comment } from '../../interfaces/Comment';
import { Card } from 'react-bootstrap';
import { axiosPrivate } from '../../common/axiosPrivate';
import { API_ROOT_URL } from '../../consts/ApiUrl';

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  const [displayName, setDisplayName] = useState<string>();

  console.log(comment);

  useEffect(() => {
    const fetchUserDisplayName = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}users/${comment.userId}/profile`
        );
        setDisplayName(res.data.displayName);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDisplayName();
  }, [comment]);

  return (
    <Card className='m-2 p-3'>
      {comment.content}
      <Card.Footer className='comment-card-foot'>-{displayName}</Card.Footer>
    </Card>
  );
};

export default CommentCard;
