import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../common/axiosPrivate';
import TravelPlanCard from './TravelPlanCard';
import { TravelPlan } from '../../interfaces/TravelPlan'
import { API_ROOT_URL } from '../../consts/ApiUrl';


const TravelPlanCardManagement = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const numberOfPlans = 10;
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}plans/recent/${numberOfPlans}`);
        setTravelPlans(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPlans();
  }, []);

  return (
    <div className='container mt-5 row row-cols-lg-4 row-cols-md-3 m-auto'>
      {travelPlans.map((travelPlan, index) => (
        <TravelPlanCard key={travelPlan.id} travelPlan={travelPlan} index={index} />
      ))}
    </div>
  );
};

export default TravelPlanCardManagement;
