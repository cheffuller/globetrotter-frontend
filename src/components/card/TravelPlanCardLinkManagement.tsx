import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import TravelPlanCardRandomImage from './TravelPlanCardRandomImage/TravelPlanCardRandomImage';
import { PLAN_DETAIL_URL } from '../../consts/PageUrls';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';

type TravelPlanCardLinkManagementProps = {
  travelPlan: TravelPlanDetail;
  index: number;
}

const TravelPlanCardLinkManagement = ({travelPlan, index}: TravelPlanCardLinkManagementProps) => {

    const location = useLocation();

    const HandleLink = () => {
      if (location.pathname == `${PLAN_DETAIL_URL}`) {
        return (
          <TravelPlanCardRandomImage index={index} />
        )
      } else {
        return (
          <NavLink
          to={`${PLAN_DETAIL_URL}`}
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