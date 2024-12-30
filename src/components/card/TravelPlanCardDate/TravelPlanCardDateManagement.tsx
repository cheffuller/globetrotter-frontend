import React from 'react';

import { TravelPlanLocationProps } from '../TravelPlanCardLocation/TravelPlanCardLocationManagement';
import TravelPlanCardDate from './TravelPlanCardDate';

const TravelPlanCardDateManagement = ({
  travelPlanLocation,
}: TravelPlanLocationProps) => {
  const startDate = new Date(travelPlanLocation.startDate).toLocaleDateString(
    'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
  );

  const endDate = new Date(travelPlanLocation.endDate).toLocaleDateString(
    'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }
  );

  return (
    <>
      <TravelPlanCardDate startDate={startDate} endDate={endDate} />
    </>
  );
};

export default TravelPlanCardDateManagement;
