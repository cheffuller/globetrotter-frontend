import React from 'react';
import { Card } from 'react-bootstrap';

type TravelPlanCardDateProps = {
  startDate: string;
  endDate: string;
};

const TravelPlanCardDate = ({
  startDate,
  endDate,
}: TravelPlanCardDateProps) => {
  return (
    <Card.Text className='mb-1'>
      {startDate}
      {' -'}
      <br />
      {endDate}
    </Card.Text>
  );
};

export default TravelPlanCardDate;
