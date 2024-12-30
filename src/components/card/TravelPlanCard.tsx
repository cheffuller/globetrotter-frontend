import React from 'react';
import { Card, Col } from 'react-bootstrap';
import TravelPlanCardLikeButtonManagement from './TravelPlanCardButtons/TravelPlanCardLikeButtonManagement';
import TravelPlanCardCommentButtonManagement from './TravelPlanCardButtons/TravelPlanCardCommentButtonManagement';
import TravelPlanCardUsernameManagement from './TravelPlanCardUsername/TravelPlanCardUsernameManagement';
import TravelPlanCardLocationManagement from './TravelPlanCardLocation/TravelPlanCardLocationManagement';
import TravelPlanCardRandomImage from './TravelPlanCardRandomImage/TravelPlanCardRandomImage';

import { TravelPlan } from '../../interfaces/TravelPlanContext';

type TravelPlanCardProps = {
  travelPlan: TravelPlan;
  index: number;
};

const TravelPlanCard = ({ travelPlan, index }: TravelPlanCardProps) => {
  return (
    <>
      <Col className='d-flex align-items-stretch mb-5'>
        <Card className='travel-card mx-auto'>
          <TravelPlanCardRandomImage index={index} />
          <Card.Body className='d-flex flex-column'>
            <TravelPlanCardLocationManagement travelPlanId={travelPlan.id} />
            <Card.Subtitle>
              <TravelPlanCardUsernameManagement
                accountId={travelPlan.accountId}
              />
            </Card.Subtitle>
            <br />
            <Card.Footer className='travel-card-footer'>
              <TravelPlanCardLikeButtonManagement
                travelPlanId={travelPlan.id}
              />
              <TravelPlanCardCommentButtonManagement
                travelPlanId={travelPlan.id}
              />
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TravelPlanCard;
