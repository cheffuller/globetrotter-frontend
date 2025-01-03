import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ModerateAccessibility() {
  interface Comment {
    id: number;
    text: string;
  }

  const [comments, setComments] = useState<Comment[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    axios.get('/posts/{postId}/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the comments!', error);
      });
  }, []);

  const deleteComment = (id: number) => {
    axios.delete(`/comments/${id}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the comment!', error);
      });
  };

  const banUser = (id: number) => {
    axios.post(`/moderators/ban/${id}`)
      .then(() => {
        console.log(`User ${id} has been banned.`);
      })
      .catch(error => {
        console.error('There was an error banning the user!', error);
      });
  };

  const unbanUser = (id: number) => {
    axios.delete(`/moderators/ban/${id}`)
      .then(() => {
        console.log(`User ${id} has been unbanned.`);
      })
      .catch(error => {
        console.error('There was an error unbanning the user!', error);
      });
  };

  return (
    <div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {comment.text}
            <button onClick={() => deleteComment(comment.id)}>Delete</button>
            <button onClick={() => banUser(comment.id)}>Ban User</button>
            <button onClick={() => unbanUser(comment.id)}>Unban User</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModerateAccessibility;