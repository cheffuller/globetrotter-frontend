import React, { FormEventHandler } from 'react';
import { Card, Form } from 'react-bootstrap';

type NewCommentProps = {
  commentContent: string;
  setCommentContent: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const NewComment = ({
  commentContent,
  setCommentContent,
  username,
  handleSubmit,
  inputRef,
}: NewCommentProps) => {
  return (
    <Card className='comment-card'>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          id='comment-new'
          className='comment-text-input'
          type='text'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder='add a comment...'
          ref={inputRef}
        />
      </Form>
      {commentContent && (
        <div className='comment-card-foot'><div></div>{username}</div>
      )}
    </Card>
  );
};

export default NewComment;
