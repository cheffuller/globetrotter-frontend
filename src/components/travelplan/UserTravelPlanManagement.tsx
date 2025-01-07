import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../common/axiosPrivate';
import TravelPlanCard from '../card/TravelPlanCard';
import { TravelPlan } from '../../interfaces/TravelPlan'
import { API_ROOT_URL } from '../../consts/ApiUrl';
import { getJwtToken } from '../../common/AuthService';
import { getAccountId } from '../../common/AuthService';
import UserTravelPlan from './UserTravelPlan';


//as a user i should be able to manage my travel plans
//in here i can either go to this page manually or be redirected here after creating a travel plan draft
//in this page i should be able to see all my travel plans

function UserTravelPlanManagement() {
    const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);

    //find the account id of the user using jwt token
    const accountId = getAccountId();

    useEffect(() => {
      const fetchPlans = async () => {
        try {
          const res = await axiosPrivate.get(
            `${API_ROOT_URL}users/${accountId}/plans`);
          setTravelPlans(res.data);
        } catch (err) {
          console.log(err);
        }
      }
  
      fetchPlans();
    }, []);
  
    return (
      <div className='container mt-5 row row-cols-lg-4 row-cols-md-3 m-auto'>
        {travelPlans && travelPlans.map((travelPlan, index) => (
          <UserTravelPlan key={travelPlan.id} travelPlanId={travelPlan.id!} index={index} />
        ))}
      </div>
    );
}

export default UserTravelPlanManagement;