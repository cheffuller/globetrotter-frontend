import React from 'react';
import { Card } from 'react-bootstrap';
import { TravelPlanLocation } from '../../../interfaces/TravelPlanLocation';

type TravelPlanCardLocationProps = {
  travelPlanLocation: TravelPlanLocation;
  multipleLocations: boolean;
}

const TravelPlanCardLocation = ({
  travelPlanLocation, multipleLocations,
}: TravelPlanCardLocationProps) => {
  return (
    <Card.Title>
      {travelPlanLocation.city}
      {','}
      <br />
      {travelPlanLocation.country}
      {multipleLocations && <i className='fa pages'>&nbsp; &#xf14d;</i>}
    </Card.Title>
  );
};

export default TravelPlanCardLocation;
