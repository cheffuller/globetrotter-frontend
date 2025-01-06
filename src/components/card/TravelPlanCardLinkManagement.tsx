import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import TravelPlanCardRandomImage from './TravelPlanCardRandomImage/TravelPlanCardRandomImage';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { TravelPlan } from '../../interfaces/TravelPlan';

type TravelPlanCardLinkManagementProps = {
  travelPlan: TravelPlan;
  index: number;
}

const TravelPlanCardLinkManagement = ({travelPlan, index}: TravelPlanCardLinkManagementProps) => {

    const location = useLocation();

    const HandleLink = () => {
      if (location.pathname == '/travel-plan/detail') {
        return (
          <TravelPlanCardRandomImage index={index} />
        )
      } else {
        return (
          <NavLink
          to={`${TRAVEL_PLAN_URL}/detail`}
          state={{ travelPlan: travelPlan }}
        >
          <TravelPlanCardRandomImage index={index} />
        </NavLink>
        )
      }
    }
    
  return (
    <HandleLink />
  )
}

export default TravelPlanCardLinkManagement