import React, { useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import TravelPlanCardLikeButtonManagement from './TravelPlanCardButtons/TravelPlanCardLikeButtonManagement';
import TravelPlanCardCommentButtonManagement from './TravelPlanCardButtons/TravelPlanCardCommentButtonManagement';
import TravelPlanCardUsernameManagement from './TravelPlanCardUsername/TravelPlanCardUsernameManagement';
import TravelPlanCardLocationManagement from './TravelPlanCardLocation/TravelPlanCardLocationManagement';
import TravelPlanCardLinkManagement from './TravelPlanCardLinkManagement';
import { isAuthenticated } from '../../common/AuthService';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';

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
  const [travelPlanState, setTravelPlanState] = useState<TravelPlanDetail>(travelPlan);
  const location = useLocation();
  const travelPlanManagement: boolean =
    location.pathname === '/travel-plan/management';

  return (
    <>
      <Col className='d-flex align-items-stretch mb-5'>
        <Card className='travel-card mx-auto'>
          <TravelPlanCardLinkManagement travelPlan={travelPlanState} index={index} />
          <Card.Body className='d-flex flex-column'>
            <TravelPlanCardLocationManagement travelPlan={travelPlanState} />
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
                    travelPlan={travelPlanState}
                    setTravelPlanState={setTravelPlanState}
                  />
                  <TravelPlanCardCommentButtonManagement
                    travelPlan={travelPlanState}
                    numberOfCommentsProps={numberOfCommentsProps}
                  />
                </>
              )}
              {travelPlanManagement && (
                <>
                  {!travelPlan.isPublished && <>Travel Plan saved as Draft</>}
                  <Button className='comment-button'>
                    <NavLink
                      to={`${TRAVEL_PLAN_URL}/edit`}
                      className='edit-link'
                      title='Edit Travel Plan'
                      state={{ travelPlanId: travelPlanState.id }}
                    >
                      <i className='fa edit-link mb-3'> &#xf044;</i>
                    </NavLink>
                    <br />
                  </Button>
                </>
              )}
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TravelPlanCard;
