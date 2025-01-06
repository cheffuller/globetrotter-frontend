import React, { useEffect, useState } from 'react';
import TravelPlanCardDisplayName from './TravelPlanCardDisplayName';
import { fetchDisplayName } from '../../../common/DisplayName';

type TravelPlanCardDisplayNameManagementProps = {
  accountId: number;
};

const TravelPlanCardDisplayNameManagement = ({
  accountId,
}: TravelPlanCardDisplayNameManagementProps) => {
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const getDisplayName = async () => {
      setDisplayName(await fetchDisplayName(accountId));
    }
    getDisplayName();
  }, [accountId]);

  return (
    <>
      {displayName && <TravelPlanCardDisplayName displayName={displayName} />}
    </>
  );
};

export default TravelPlanCardDisplayNameManagement;
