import React, { useEffect, useState } from 'react';
import { axiosPrivate } from '../../common/axiosPrivate';
import TravelPlanCard from './TravelPlanCard';
import { API_ROOT_URL } from '../../consts/ApiUrl';
import { JWT_TOKEN } from '../../consts/JwtConst';
import { TravelPlanDetail } from '../../interfaces/TravelPlanDetail';
import { isModerator } from '../../common/AuthService';
import { Button } from 'react-bootstrap';
import DeleteTravelPlanModal from './DeleteTravelPlanModal';

const TravelPlanCardManagement = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlanDetail[]>([]);
  const [deleteTravelPlanToggle, setDeleteTravelPlanToggle] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const numberOfPlans = 12;
        const res = await axiosPrivate.get(
          `${API_ROOT_URL}plans/recent/${numberOfPlans}`
        );
        setTravelPlans(res.data);
      } catch (err) {
        localStorage.removeItem(JWT_TOKEN);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className='container mt-5 row row-cols-lg-4 row-cols-md-3 m-auto'>
      {travelPlans.map((travelPlan, index) => (
        <div key={travelPlan.id} className='text-center my-3'>
          <TravelPlanCard travelPlan={travelPlan} index={index} />{' '}
          {isModerator() && (
            <>
              <DeleteTravelPlanModal
                deleteTravelPlanToggle={deleteTravelPlanToggle}
                setDeleteTravelPlanToggle={setDeleteTravelPlanToggle}
                travelPlanId={travelPlan.id!}
                travelPlans={travelPlans}
                setTravelPlans={setTravelPlans}
              />
              <Button
                className='comment-button edit-link'
                onClick={() => setDeleteTravelPlanToggle(true)}
              >
                <i className='fa edit-link mb-3'>&#xf1f8;</i>
                <br />
              </Button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TravelPlanCardManagement;
