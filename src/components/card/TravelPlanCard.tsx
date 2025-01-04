import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import TravelPlanCardLikeButtonManagement from './TravelPlanCardButtons/TravelPlanCardLikeButtonManagement';
import TravelPlanCardCommentButtonManagement from './TravelPlanCardButtons/TravelPlanCardCommentButtonManagement';
import TravelPlanCardUsernameManagement from './TravelPlanCardUsername/TravelPlanCardUsernameManagement';
import TravelPlanCardLocationManagement from './TravelPlanCardLocation/TravelPlanCardLocationManagement';

import { TravelPlan } from '../../interfaces/TravelPlan';
import TravelPlanCardLinkManagement from './TravelPlanCardLinkManagement';
import { axiosPrivate } from '../../common/axiosPrivate';
import { API_ROOT_URL } from '../../consts/ApiUrl';

export type TravelPlanCardProps = {
  travelPlan: TravelPlan;
  index: number;
};

const TravelPlanCard = ({ travelPlan, index }: TravelPlanCardProps) => {
  const [postId, setPostId] = useState<number>();
  
  useEffect(() => {
    const fetchPostId = async () => {
      try {
        const res = await axiosPrivate.get(`${API_ROOT_URL}posts/plans/${travelPlan.id}`)
        setPostId(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchPostId();
  }, [travelPlan])

  return (
    <>
      <Col className='d-flex align-items-stretch mb-5'>
        <Card className='travel-card mx-auto'>
        <TravelPlanCardLinkManagement travelPlan={travelPlan} index={index} />
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
                travelPlanId={travelPlan.id} postId={postId}
              />
              <TravelPlanCardCommentButtonManagement
                travelPlan={travelPlan} postId={postId}
              />
            </Card.Footer>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TravelPlanCard;
