import React, { useState } from 'react';
import axios from 'axios';
import { API_ROOT_URL } from '../../consts/ApiUrl';

const ModerateAccessibility = () => {
  const [userId, setUserId] = useState<number>(0);
  const [commentId, setCommentId] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [planId, setPlanId] = useState<number>(0);

  const handleBanUser = async () => {
    try {
      await axios.post(`${API_ROOT_URL}moderators/ban/${userId}`);
      setMessage(`User with ID has been banned.`);
    } catch (error) {
      setMessage(`Failed to ban user with ID.`);
    }
  };

  const handleUnbanUser = async () => {
    try {
      await axios.delete(`${API_ROOT_URL}moderators/ban/${userId}`);
      setMessage(`User with ID has been unbanned.`);
    } catch (error) {
      setMessage(`Failed to unban user with ID.`);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`${API_ROOT_URL}moderators/comments/${commentId}`);
      setMessage(`Comment with ID has been deleted.`);
    } catch (error) {
      setMessage(`Failed to delete comment with ID.`);
    }

    const handleDeletePlan = async () => {
        try{
            await axios.delete(`${API_ROOT_URL}plans/${planId}`);
            setMessage(`Plan has been deleted.`);
        } catch (error) {
            setMessage(`Failed to delete plan.`);

    }
  }
};

  return (
    <div>
      <button onClick={handleBanUser}>Ban User</button>
      <button onClick={handleUnbanUser}>Unban User</button>
      <br />
      <button onClick={handleDeleteComment}>Delete Comment</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ModerateAccessibility;