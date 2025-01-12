import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelPlanCardDate from './TravelPlanCardDate';

describe('TravelPlanCardDate Component', () => {
  it('renders the start and end dates correctly', () => {
    const { container } = render(
      <TravelPlanCardDate startDate="2022-05-18" endDate="2022-05-25" />
    );

    const element = container.querySelector('.card-text');
    expect(element).toHaveTextContent('2022-05-18 -2022-05-25');
  });

  it('renders a line break between start and end dates', () => {
    const { container } = render(
      <TravelPlanCardDate startDate="2022-05-18" endDate="2022-05-25" />
    );

    const element = container.querySelector('.card-text');
    const lineBreak = element?.querySelector('br');

    expect(element).toHaveTextContent('2022-05-18 -2022-05-25');
    expect(lineBreak).toBeInTheDocument();
  });
});