import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { getUsername } from '../../../common/AuthService';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import { Comment } from '../../../interfaces/Comment';
import NewComment from './NewComment';

type NewCommentManagementProps = {
  postId: number | undefined;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const NewCommentManagement = ({
  postId,
  comments,
  setComments,
}: NewCommentManagementProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const username = getUsername();
  const [displayName, setDisplayName] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');

  useEffect(() => {
    const fetchUserDisplayName = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}users/${username}/display-name`
        );
        res.data ? setDisplayName(res.data) : setDisplayName(username!);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDisplayName();
  }, [username]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newComment = {
      postId: postId,
      commentedDate: new Date(),
      content: commentContent,
    };
    const postComment = async (newComment: any) => {
      try {
        const res = await axiosPrivate.post(
          `${API_ROOT_URL}comments`,
          newComment
        );
        const newComments = [...comments, res.data];
        setComments(newComments);
        setCommentContent('');
        inputRef.current?.blur();
      } catch (err) {
        console.log(err);
      }
    };
    postComment(newComment);
  };

  return (
    <NewComment
      commentContent={commentContent}
      setCommentContent={setCommentContent}
      displayName={displayName}
      handleSubmit={handleSubmit}
      inputRef={inputRef}
    />
  );
};

export default NewCommentManagement;
