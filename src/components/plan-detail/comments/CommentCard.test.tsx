import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CommentCard from './CommentCard';
import { Comment } from '../../../interfaces/Comment';
import { timeSince } from '../../../common/TimeSinceDate';
import { getUsername, isModerator } from '../../../common/AuthService';
import { BrowserRouter as Router } from 'react-router';

// Mock dependencies
jest.mock('../../../common/TimeSinceDate', () => ({
  timeSince: jest.fn(),
}));
jest.mock('../../../common/AuthService', () => ({
  getUsername: jest.fn(),
  isModerator: jest.fn(),
}));

describe('CommentCard Component', () => {
  const mockComment: Comment = {
    id: 1,
    postId:1,
    userId:2 ,
    username: 'testuser',
    content: 'This is a test comment',
    commentedDate: new Date(),
  };

  const mockSetDeleteCommentToggle = jest.fn();
  const mockSetEditCommentToggle = jest.fn();
  const mockHandleLikeClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders comment content correctly', () => {
    (getUsername as jest.Mock).mockReturnValue('otheruser');
    (timeSince as jest.Mock).mockReturnValue('2 hours ago');

    render(
      <Router>
        <CommentCard
          comment={mockComment}
          likeToggle={false}
          numberOfLikesOnComment={0}
          handleLikeClick={mockHandleLikeClick}
          setDeleteCommentToggle={mockSetDeleteCommentToggle}
          setEditCommentToggle={mockSetEditCommentToggle}
        />
      </Router>
    );

    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
  });

  it('renders edit and delete options for the comment owner', () => {
    (getUsername as jest.Mock).mockReturnValue('testuser');
    (timeSince as jest.Mock).mockReturnValue('2 hours ago');

    render(
      <Router>
        <CommentCard
          comment={mockComment}
          likeToggle={false}
          numberOfLikesOnComment={0}
          handleLikeClick={mockHandleLikeClick}
          setDeleteCommentToggle={mockSetDeleteCommentToggle}
          setEditCommentToggle={mockSetEditCommentToggle}
        />
      </Router>
    );

    expect(screen.getByTitle('Edit Comment')).toBeInTheDocument();
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Edit Comment'));
    expect(mockSetEditCommentToggle).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText((content, element) => element?.className === 'delete-comment'));
    expect(mockSetDeleteCommentToggle).toHaveBeenCalledWith(true);
  });

  it('renders delete option for moderators', () => {
    (getUsername as jest.Mock).mockReturnValue('otheruser');
    (isModerator as jest.Mock).mockReturnValue(true);
    (timeSince as jest.Mock).mockReturnValue('2 hours ago');

    render(
      <Router>
        <CommentCard
          comment={mockComment}
          likeToggle={false}
          numberOfLikesOnComment={0}
          handleLikeClick={mockHandleLikeClick}
          setDeleteCommentToggle={mockSetDeleteCommentToggle}
          setEditCommentToggle={mockSetEditCommentToggle}
        />
      </Router>
    );

    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();

    fireEvent.click(screen.getByText((content, element) => element?.className === 'delete-comment'));
    expect(mockSetDeleteCommentToggle).toHaveBeenCalledWith(true);
  });

  it('handles like click correctly', () => {
    (getUsername as jest.Mock).mockReturnValue('otheruser');
    (timeSince as jest.Mock).mockReturnValue('2 hours ago');

    render(
      <Router>
        <CommentCard
          comment={mockComment}
          likeToggle={false}
          numberOfLikesOnComment={5}
          handleLikeClick={mockHandleLikeClick}
          setDeleteCommentToggle={mockSetDeleteCommentToggle}
          setEditCommentToggle={mockSetEditCommentToggle}
        />
      </Router>
    );

    // Simulate like click
    fireEvent.click(screen.getByText(' 5'));
    expect(mockHandleLikeClick).toHaveBeenCalled();
  });
});