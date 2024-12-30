import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../../common/axiosPrivate';

import { UserAccount } from '../../../interfaces/UserAccount';
import { API_URL } from '../../../consts/ApiUrl';
import TravelPlanCardUsername from './TravelPlanCardUsername';

type TravelPlanCardUsernameManagementProps = {
  accountId: number;
};

export type UserAccountProps = {
  userAccount: UserAccount;
};

const TravelPlanCardUsernameManagement = ({
  accountId,
}: TravelPlanCardUsernameManagementProps) => {
  const [userAccount, setUserAccount] = useState<UserAccount>();

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const res = await axiosPrivate.get(`${API_URL}users/${accountId}`);
        setUserAccount(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserAccount();
  }, [accountId]);

  return (
    <>
      {userAccount && (
        <TravelPlanCardUsername username={userAccount.username} />
      )}
    </>
  );
};

export default TravelPlanCardUsernameManagement;
