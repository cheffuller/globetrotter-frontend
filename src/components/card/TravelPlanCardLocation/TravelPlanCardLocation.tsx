import React from 'react';
import { Card } from 'react-bootstrap';
import { TravelPlanLocationProps } from './TravelPlanCardLocationManagement';

const TravelPlanCardLocation = ({
  travelPlanLocation,
}: TravelPlanLocationProps) => {
  return (
    <Card.Title>
      {travelPlanLocation.city}
      {','}
      <br />
      {travelPlanLocation.country}
    </Card.Title>
  );
};

export default TravelPlanCardLocation;
