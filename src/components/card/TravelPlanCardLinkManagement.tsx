import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router';
import TravelPlanCardRandomImage from './TravelPlanCardRandomImage/TravelPlanCardRandomImage';
import { PLAN_DETAIL_URL } from '../../consts/PageUrls';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';
import { TravelPlanContext } from '../travelplan/TravelPlanContext';

type TravelPlanCardLinkManagementProps = {
  travelPlan: TravelPlanDetail;
  index: number;
}

const TravelPlanCardLinkManagement = ({travelPlan, index}: TravelPlanCardLinkManagementProps) => {

    const location = useLocation();
    const planContext = useContext(TravelPlanContext);
    if(!planContext) {
        throw new Error("Travel Plan Context is null");
    }
    const { setTravelPlan } = planContext;

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
          onClick={() => setTravelPlan({ id: travelPlan.id,
            accountId: travelPlan.accountId,
            isFavorited: travelPlan.isFavorited,
            isPublished: travelPlan.isPublished })}
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