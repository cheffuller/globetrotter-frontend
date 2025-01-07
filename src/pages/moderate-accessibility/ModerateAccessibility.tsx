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
      setMessage(`User with ID ${userId} has been banned.`);
    } catch (error) {
      setMessage(`Failed to ban user with ID ${userId}.`);
    }
  };

  const handleUnbanUser = async () => {
    try {
      await axios.delete(`${API_ROOT_URL}moderators/ban/${userId}`);
      setMessage(`User with ID ${userId} has been unbanned.`);
    } catch (error) {
      setMessage(`Failed to unban user with ID ${userId}.`);
    }
  };

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`${API_ROOT_URL}moderators/comments/${commentId}`);
      setMessage(`Comment with ID ${commentId} has been deleted.`);
    } catch (error) {
      setMessage(`Failed to delete comment with ID ${commentId}.`);
    }
  };

  const handleDeletePlan = async () => {
    try {
      await axios.delete(`${API_ROOT_URL}plans/${planId}`);
      setMessage(`Plan with ID ${planId} has been deleted.`);
    } catch (error) {
      setMessage(`Failed to delete plan with ID ${planId}.`);
    }
  };

  return (
    <div>
      <h2>Moderator Actions</h2>
      <div>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
        <button onClick={handleBanUser}>Ban User</button>
        <button onClick={handleUnbanUser}>Unban User</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Comment ID"
          value={commentId}
          onChange={(e) => setCommentId(Number(e.target.value))}
        />
        <button onClick={handleDeleteComment}>Delete Comment</button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Plan ID"
          value={planId}
          onChange={(e) => setPlanId(Number(e.target.value))}
        />
        <button onClick={handleDeletePlan}>Delete Plan</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ModerateAccessibility;