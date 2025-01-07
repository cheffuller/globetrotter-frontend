import React, { useEffect, useState } from 'react';
import TravelPlanCardUsername from './TravelPlanCardUsername';

type TravelPlanCardUsernameManagementProps = {
  username: string;
};

const TravelPlanCardUsernameManagement = ({
  username,
}: TravelPlanCardUsernameManagementProps) => {

  return (
    <>
      {username && <TravelPlanCardUsername username={username} />}
    </>
  );
};

export default TravelPlanCardUsernameManagement;
