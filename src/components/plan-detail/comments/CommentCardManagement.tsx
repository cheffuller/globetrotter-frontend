import React, { useEffect, useState } from 'react';
import { Comment } from '../../../interfaces/Comment';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import CommentCard from './CommentCard';
import EditCommentManagement from './EditCommentManagement';

type CommentCardManagementProps = {
  comment: Comment;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const CommentCardManagement = ({ comment, comments, setComments }: CommentCardManagementProps) => {
  const [likeToggle, setLikeToggle] = useState<boolean>(false);
  const [numberOfLikesOnComment, setNumberOfLikesOnComment] =
    useState<number>(0);
  const [editCommentToggle, setEditCommentToggle] = useState<boolean>(false);

  useEffect(() => {
    const fetchNumberOfLikesOnComment = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}comments/${comment.id}/likes`
        );
        setNumberOfLikesOnComment(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNumberOfLikesOnComment();
  }, [comment.id]);

  useEffect(() => {
    const fetchLikeToggle = async () => {
      if (comment.id) {
        try {
          const res = await axiosPrivate.get(
            `${API_ROOT_URL}comments/${comment.id}/liked`
          );
          setLikeToggle(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchLikeToggle();
  }, [comment.id]);

  const handleClick = async () => {
    try {
      if (!likeToggle) {
        await axiosPrivate.post(`${API_ROOT_URL}comments/${comment.id}/likes`);
        setNumberOfLikesOnComment(numberOfLikesOnComment + 1);
        setLikeToggle(true);
      } else {
        await axiosPrivate.delete(
          `${API_ROOT_URL}comments/${comment.id}/likes`
        );
        setNumberOfLikesOnComment(numberOfLikesOnComment - 1);
        setLikeToggle(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!editCommentToggle ? (
        <CommentCard
          comment={comment}
          likeToggle={likeToggle}
          numberOfLikesOnComment={numberOfLikesOnComment}
          handleClick={handleClick}
          setEditCommentToggle={setEditCommentToggle}
        />
      ) : (
        <EditCommentManagement 
          comment={comment}
          comments={comments}
          setComments={setComments}
          setEditCommentToggle={setEditCommentToggle}
        />
      )}
    </>
  );
};

export default CommentCardManagement;
