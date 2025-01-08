import React, { FormEvent, useRef, useState } from 'react';
import { Comment } from '../../../interfaces/Comment';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import NewComment from './NewComment';
import { getUsername } from '../../../common/AuthService';

type EditCommentManagementProps = {
  comment: Comment;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setEditCommentToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCommentManagement = ({
  comment,
  comments,
  setComments,
  setEditCommentToggle,
}: EditCommentManagementProps) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const editUsername = getUsername();
  const [editCommentContent, setEditCommentContent] = useState<string>(comment.content);

  const editHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const patchComment = async (newContent: string) => {
      const newComment = {content: newContent};
      try {
        const res = await axiosPrivate.patch(
          `${API_ROOT_URL}comments/${comment.id}`,
          newComment
        );
        const newComments = comments.map((newComment) => {
          return newComment.id === comment.id
            ? { ...newComment, content: newContent }
            : newComment;
        });
        setComments(newComments);
        setEditCommentToggle(false);
      } catch (err) {
        console.log(err);
      }
    };
    patchComment(editCommentContent);
  };

  return (
    <NewComment
      commentContent={editCommentContent}
      setCommentContent={setEditCommentContent}
      username={editUsername!}
      handleSubmit={editHandleSubmit}
      inputRef={editInputRef}
    />
  );
};

export default EditCommentManagement;
