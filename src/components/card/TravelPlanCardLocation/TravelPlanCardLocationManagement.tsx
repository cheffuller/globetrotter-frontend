import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../common/axiosPrivate';

import TravelPlanCardLocation from './TravelPlanCardLocation';
import TravelPlanCardDateManagement from '../TravelPlanCardDate/TravelPlanCardDateManagement';
import { TravelPlanLocation } from '../../../interfaces/TravelPlanLocation';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';

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
          <TravelPlanCardDateManagement travelPlanLocation={travelPlanLocation} />
        </React.Fragment>
      ))}
    </>
  );
};

export default TravelPlanCardLocationManagement;
