import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelPlanCardLikeButton from './TravelPlanCardLikeButton';

describe('TravelPlanCardLikeButton Component', () => {
  it('renders the like button with the number of likes', () => {
    render(
      <TravelPlanCardLikeButton
        numberOfLikesOnPost={5}
        likeToggle={false}
        handleClick={jest.fn()}
      />
    );

    const likeButton = screen.getByRole('button');
    const unlikedIcon = screen.getByText('\uf08a');
    const likeCount = screen.getByText('5');

    expect(likeButton).toBeInTheDocument();
    expect(unlikedIcon).toHaveClass('fa unliked');
    expect(likeCount).toBeInTheDocument();
  });

  it('displays the liked icon when likeToggle is true', () => {
    render(
      <TravelPlanCardLikeButton
        numberOfLikesOnPost={5}
        likeToggle={true}
        handleClick={jest.fn()}
      />
    );

    const likeButton = screen.getByRole('button');
    const likedIcon = screen.getByText('\uf08a');

    expect(likeButton).toBeInTheDocument();
    expect(likedIcon).toHaveClass('fa liked');
    expect(likedIcon).toHaveStyle('color: #D5896F');
  });

  it('calls handleClick when the like button is clicked', () => {
    const handleClickMock = jest.fn();

    render(
      <TravelPlanCardLikeButton
        numberOfLikesOnPost={5}
        likeToggle={false}
        handleClick={handleClickMock}
      />
    );

    const unlikedIcon = screen.getByText('\uf08a');

    fireEvent.click(unlikedIcon);

    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

  it('displays a placeholder when there are no likes', () => {
    render(
      <TravelPlanCardLikeButton
        numberOfLikesOnPost={0}
        likeToggle={false}
        handleClick={jest.fn()}
      />
    );

    const likeButton = screen.getByRole('button');
    const unlikedIcon = screen.getByText('\uf08a');

    expect(likeButton).toBeInTheDocument();
    expect(unlikedIcon).toHaveClass('fa unliked');
    expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'button')).toBeInTheDocument();
  });
});