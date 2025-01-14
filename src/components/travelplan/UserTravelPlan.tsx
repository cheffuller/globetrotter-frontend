import React, { useEffect, useState } from 'react';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';
import { axiosPrivate } from '../../common/axiosPrivate';
import { API_ROOT_URL } from '../../consts/ApiUrl';
import TravelPlanCard from '../card/TravelPlanCard';

type UserTravelPlanProps = {
  travelPlanId: number;
  index: number;
};

const UserTravelPlan = ({ travelPlanId, index }: UserTravelPlanProps) => {
  const [travelPlan, setTravelPlan] = useState<TravelPlanDetail>();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}plans/${travelPlanId}`
        );
        setTravelPlan(res.data);
        console.log('TravelPlanDetail returned from backend');
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlans();
  }, []);

  return (
    <>
      {travelPlan && <TravelPlanCard travelPlan={travelPlan} index={index} />}
    </>
  );
};

export default UserTravelPlan;
