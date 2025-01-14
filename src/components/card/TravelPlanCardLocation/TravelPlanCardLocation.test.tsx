import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TravelPlanCardLocation from './TravelPlanCardLocation';
import { TravelPlanLocation } from '../../../interfaces/TravelPlanLocation';

describe('TravelPlanCardLocation Component', () => {
  const multipleLocations = false;

  it('renders the city and country correctly', () => {
    const { container } = render(
      <TravelPlanCardLocation
        travelPlanLocation={{
          city: 'Rio de Janeiro',
          country: 'Brazil',
          endDate: new Date(),
          startDate: new Date(),
          travelPlanId: 1,
        }}
        multipleLocations={multipleLocations}
      />
    );

    const element = container.querySelector('.card-title');
    expect(element).toHaveTextContent('Rio de Janeiro,');
    expect(element).toHaveTextContent('Brazil');
  });

  it('renders only the city when country is missing', () => {
    const { container } = render(
      <TravelPlanCardLocation
        travelPlanLocation={{
          city: 'Rio de Janeiro',
          country: '',
          endDate: new Date(),
          startDate: new Date(),
          travelPlanId: 1,
        }}
        multipleLocations={multipleLocations}
      />
    );

    const element = container.querySelector('.card-title');
    expect(element).toHaveTextContent('Rio de Janeiro,');
  });

  it('renders only the country when city is missing', () => {
    const { container } = render(
      <TravelPlanCardLocation
        travelPlanLocation={{
          city: '',
          country: 'Brazil',
          endDate: new Date(),
          startDate: new Date(),
          travelPlanId: 1,
        }}
        multipleLocations={multipleLocations}
      />
    );

    const element = container.querySelector('.card-title');
    expect(element).toHaveTextContent(',');
    expect(element).toHaveTextContent('Brazil');
  });
});
