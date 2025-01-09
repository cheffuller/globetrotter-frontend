import React, { useContext } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TravelPlanCardLikeButtonManagement from './TravelPlanCardButtons/TravelPlanCardLikeButtonManagement';
import TravelPlanCardCommentButtonManagement from './TravelPlanCardButtons/TravelPlanCardCommentButtonManagement';
import TravelPlanCardUsernameManagement from './TravelPlanCardUsername/TravelPlanCardUsernameManagement';
import TravelPlanCardLocationManagement from './TravelPlanCardLocation/TravelPlanCardLocationManagement';
import TravelPlanCardLinkManagement from './TravelPlanCardLinkManagement';
import { isAuthenticated } from '../../common/AuthService';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';
import TravelPlanContext from '../travelplan/TravelPlanContext';
import { clear } from 'console';
import { normalize } from 'path';

export type TravelPlanCardProps = {
  travelPlan: TravelPlanDetail;
  index: number;
  numberOfCommentsProps?: number;
};

const TravelPlanCard = ({
  travelPlan,
  index,
  numberOfCommentsProps,
}: TravelPlanCardProps) => {
  const planContext = useContext(TravelPlanContext);
  if(!planContext) {
      throw new Error("Travel Plan Context is null");
  }
  const { setTravelPlan, clearTravelPlan } = planContext;
  const handleEditClick = () => {
    clearTravelPlan(); // Clear the travel plan in the context
    const normalizedTravelPlan = {
      id: travelPlan.id,
      accountId: travelPlan.accountId,
      isFavorited: travelPlan.isFavorited,
      isPublished: travelPlan.isPublished,
    };
    setTravelPlan(normalizedTravelPlan); // Set the travel plan in the context
  };
  return (
    <>
      <Col className='d-flex align-items-stretch mb-5'>
        <Card className='travel-card mx-auto'>
          <TravelPlanCardLinkManagement travelPlan={travelPlan} index={index} />
          <Card.Body className='d-flex flex-column'>
            <TravelPlanCardLocationManagement travelPlan={travelPlan} />
            <Card.Subtitle>
              <TravelPlanCardUsernameManagement
                username={travelPlan.post.username}
              />
            </Card.Subtitle>
            <br />
            <Card.Footer className='travel-card-footer'>
              {travelPlan.isPublished && isAuthenticated() && (
                <>
                  <TravelPlanCardLikeButtonManagement
                    travelPlan={travelPlan}
                  />
                  <TravelPlanCardCommentButtonManagement
                    travelPlan={travelPlan}
                    numberOfCommentsProps={numberOfCommentsProps}
                  />
                </>
              )}
              {!travelPlan.isPublished && (
                  <Link
                    to={`${TRAVEL_PLAN_URL}/edit`}
                    className='edit-link'
                    onClick={handleEditClick}
                    // state={{ travelPlanId: travelPlan.id }}
                  >
                    Edit/Publish<br/>Travel Plan
                  </Link>
              )}
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TravelPlanCard;
