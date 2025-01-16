import React from 'react';

import TravelPlanCardLocation from './TravelPlanCardLocation';
import TravelPlanCardDateManagement from '../TravelPlanCardDate/TravelPlanCardDateManagement';
import { TravelPlanLocation } from '../../../interfaces/TravelPlanLocation';
import { TravelPlanDetail } from '../../../interfaces/TravelPlanDetail';
import { useLocation } from 'react-router';

type TravelPlanCardLocationManagementProps = {
  travelPlan: TravelPlanDetail;
};

export type TravelPlanLocationProps = {
  travelPlanLocation: TravelPlanLocation;
};

const TravelPlanCardLocationManagement = ({
  travelPlan,
}: TravelPlanCardLocationManagementProps) => {
  const location = useLocation();
  const multipleLocations: boolean = (travelPlan.post.locations.length > 1 ? true : false);

  return (
    <>
      {(location.pathname === '/home' || location.pathname === '/') ? (
        <>
          <TravelPlanCardLocation
            travelPlanLocation={travelPlan.post.locations[0]}
            multipleLocations={multipleLocations}
          />
          <TravelPlanCardDateManagement
            travelPlanLocation={travelPlan.post.locations[0]}
          />
        </>
      ) : (
        <>
          {' '}
          {travelPlan.post.locations.map((travelPlanLocation) => (
            <React.Fragment key={travelPlanLocation.id}>
              <TravelPlanCardLocation travelPlanLocation={travelPlanLocation} multipleLocations={false} />
              <TravelPlanCardDateManagement
                travelPlanLocation={travelPlanLocation}
              />
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

export default TravelPlanCardLocationManagement;
