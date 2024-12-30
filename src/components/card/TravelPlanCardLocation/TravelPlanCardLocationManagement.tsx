import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TravelPlanCardLocation from './TravelPlanCardLocation';
import TravelPlanCardDateManagement from '../TravelPlanCardDate/TravelPlanCardDateManagement';
import { TravelPlanLocation } from '../../../interfaces/TravelPlanLocation';
import { API_URL } from '../../../consts/ApiUrl';

type TravelPlanCardLocationManagementProps = {
  travelPlanId: number;
};

export type TravelPlanLocationProps = {
  travelPlanLocation: TravelPlanLocation;
};

const TravelPlanCardLocationManagement = ({
  travelPlanId,
}: TravelPlanCardLocationManagementProps) => {
  const [travelPlanLocations, setTravelPlanLocations] = useState<
    TravelPlanLocation[]
  >([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await axios.get(
          `${API_URL}plans/${travelPlanId}/locations`
        );
        setTravelPlanLocations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLocation();
  }, [travelPlanId]);

  return (
    <>
      {travelPlanLocations.map((travelPlanLocation) => (
        <React.Fragment key={travelPlanLocation.id}>
          <TravelPlanCardLocation travelPlanLocation={travelPlanLocation} />
          <TravelPlanCardDateManagement travelPlanLocation={travelPlanLocation} />
        </React.Fragment>
      ))}
    </>
  );
};

export default TravelPlanCardLocationManagement;
