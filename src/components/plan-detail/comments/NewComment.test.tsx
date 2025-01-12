import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewComment from './NewComment';

describe('NewComment Component', () => {
  const mockSetCommentContent = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault());
  const mockInputRef = React.createRef<HTMLInputElement>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field correctly', () => {
    render(
      <NewComment
        commentContent=""
        setCommentContent={mockSetCommentContent}
        username="testuser"
        handleSubmit={mockHandleSubmit}
        inputRef={mockInputRef}
      />
    );

    expect(screen.getByPlaceholderText('add a comment...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('add a comment...')).toHaveValue('');
  });

  it('updates comment content on change', () => {
    render(
      <NewComment
        commentContent=""
        setCommentContent={mockSetCommentContent}
        username="testuser"
        handleSubmit={mockHandleSubmit}
        inputRef={mockInputRef}
      />
    );

    const input = screen.getByPlaceholderText('add a comment...');
    fireEvent.change(input, { target: { value: 'New comment' } });

    expect(mockSetCommentContent).toHaveBeenCalledWith('New comment');
  });

  it('renders username when comment content is present', () => {
    render(
      <NewComment
        commentContent="New comment"
        setCommentContent={mockSetCommentContent}
        username="testuser"
        handleSubmit={mockHandleSubmit}
        inputRef={mockInputRef}
      />
    );

    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('does not render username when comment content is empty', () => {
    render(
      <NewComment
        commentContent=""
        setCommentContent={mockSetCommentContent}
        username="testuser"
        handleSubmit={mockHandleSubmit}
        inputRef={mockInputRef}
      />
    );

    expect(screen.queryByText('testuser')).not.toBeInTheDocument();
  });

  it('calls handleSubmit on form submission', () => {
    render(
      <NewComment
        commentContent="New comment"
        setCommentContent={mockSetCommentContent}
        username="testuser"
        handleSubmit={mockHandleSubmit}
        inputRef={mockInputRef}
      />
    );

    const form = screen.getByTestId('comment-form');
    fireEvent.submit(form);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});