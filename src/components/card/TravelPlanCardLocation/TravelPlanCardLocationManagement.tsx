import React from 'react';

import TravelPlanCardLocation from './TravelPlanCardLocation';
import TravelPlanCardDateManagement from '../TravelPlanCardDate/TravelPlanCardDateManagement';
import { TravelPlanLocation } from '../../../interfaces/TravelPlanLocation';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';
import GetWeather from '../../APIComponents/GetWeather';

type TravelPlanCardLocationManagementProps = {
  travelPlan: TravelPlanDetail;
};

export type TravelPlanLocationProps = {
  travelPlanLocation: TravelPlanLocation;
};

const TravelPlanCardLocationManagement = ({
  travelPlan,
}: TravelPlanCardLocationManagementProps) => {

  return (
    <>
      {travelPlan.post.locations.map((travelPlanLocation) => (
        <React.Fragment key={travelPlanLocation.id}>
          <TravelPlanCardLocation travelPlanLocation={travelPlanLocation} />
          <GetWeather travelPlan={travelPlan} />
          <TravelPlanCardDateManagement travelPlanLocation={travelPlanLocation} />
        </React.Fragment>
      ))}
    </>
  );
};

export default TravelPlanCardLocationManagement;
