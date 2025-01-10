import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { axiosPrivate } from '../../../common/axiosPrivate';
import { API_ROOT_URL } from '../../../consts/ApiUrl';
import { Comment } from '../../../interfaces/Comment';

type DeleteCommentModalProps = {
  deleteCommentToggle: boolean;
  setDeleteCommentToggle: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: number;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
};

const DeleteCommentModal = ({
  deleteCommentToggle,
  setDeleteCommentToggle,
  commentId,
  comments,
  setComments,
}: DeleteCommentModalProps) => {
  const handleClose = () => setDeleteCommentToggle(false);

  const handleConfirm = () => {
    const deleteComment = async (commentId: number) => {
      try {
        const res = await axiosPrivate.delete(
          `${API_ROOT_URL}comments/${commentId}`
        );
        const newComments = comments.filter((comment) => comment.id != commentId);
        setComments(newComments);
      } catch (err) {
        console.log(err);
      }
    };
    deleteComment(commentId);
    handleClose();
  };

  return (
    <>
      <Modal show={deleteCommentToggle} onHide={handleClose}>
        <Modal.Body className='delete-text text-center'>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary btn-primary' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='delete-button' onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCommentModal;
