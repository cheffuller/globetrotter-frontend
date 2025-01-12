import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router';
import TravelPlanCardCommentButton from './TravelPlanCardCommentButton';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

describe('TravelPlanCardCommentButton Component', () => {
  const mockTravelPlan: TravelPlanDetail = {
    id: 1,
    accountId: 1,
    isFavorited: false,
    isPublished: true,
    post: {
      id: 1,
      timestamp: new Date("2025-01-01T06:00:00.000+00:00"),
      travelPlanId: 1,
      username: "john_doe",
      numberOfLikes: 1,
      comments: [],
      locations: [
        {
          id: 1,
          city: "Rio de Janeiro",
          country: "Brazil",
          endDate: new Date("2022-05-25"),
          startDate: new Date("2022-05-18"),
          travelPlanId: 1
        }
      ]
    }
  };

  it('renders the comment button with the number of comments', () => {
    render(
      <Router>
        <TravelPlanCardCommentButton travelPlan={mockTravelPlan} numberOfComments={5} />
      </Router>
    );

    const commentButton = screen.getByRole('button');
    const commentNavLink = screen.getByRole('link');
    const commentCount = screen.getByText('5');

    expect(commentButton).toBeInTheDocument();
    expect(commentNavLink).toHaveAttribute('href', '/detail');
    expect(commentCount).toBeInTheDocument();
  });

  it('displays a placeholder when there are no comments', () => {
    render(
      <Router>
        <TravelPlanCardCommentButton travelPlan={mockTravelPlan} numberOfComments={0} />
      </Router>
    );

    const commentButton = screen.getByRole('button');
    const commentNavLink = screen.getByRole('link');

    expect(commentButton).toBeInTheDocument();
    expect(commentNavLink).toHaveAttribute('href', '/detail');
    expect(screen.getByText((content, element) => element?.tagName.toLowerCase() === 'button')).toBeInTheDocument();
  });
});