import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import {
  deleteTravelPlan,
  getTravelPlan,
  getTravelPlanLocations,
  updateTravelPlan,
  updateTravelPlanLocation,
} from '../../components/travelplan/TravelPlanService';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../errors/HttpErrors';
import { TRAVEL_PLAN_MANAGEMENT_URL, TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { getAccountId } from '../../common/AuthService';
import { useLocationManagement } from '../../components/travelplan/LocationManagement';
import { TravelPlanContext } from '../../components/travelplan/TravelPlanContext';
import FavoriteHandle from '../../components/travelplan/FavoriteHandle';
import { useAuth } from '../../common/AuthContext';

function EditTravelPlanPage() {
  const planContext = useContext(TravelPlanContext);
  if (!planContext) {
    throw new Error('Travel Plan Context is null');
  }
  const { travelPlan, setTravelPlan, clearTravelPlan } = planContext;
  const { logout } = useAuth();

  const {
    locations,
    addNewLocation,
    removeLocation,
    updateLocationField,
    setLocations,
    validateLocations,
  } = useLocationManagement();

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTravelPlan(); // Clear context when the component unmounts
    };
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!travelPlan?.id) return;
      try {
        const plan = await getTravelPlan(travelPlan.id);
        setTravelPlan(plan);

        const locations = await getTravelPlanLocations(travelPlan.id);

        const formattedLocations = locations.map((location) => ({
          ...location,
          startDate: location.startDate,
          endDate: location.endDate,
        }));

        setLocations(formattedLocations);
      } catch (error) {
        switch (error) {
          case NotFoundError:
            // their jwt token is invalid because we get the account id from the jwt token.
            // e.g. their account got banned
            alert('User not found. Please log in again.');
            logout(); // log them out and make them re-authenticate
            break;
          case Error:
            // server is unavailable.
            break;
        }
      }
    };

    fetchLocations();
  }, [travelPlan?.id]);

  async function publishPlan(event: any) {
    event.preventDefault();

    try {
      const accountID = getAccountId();
      if (accountID === null || accountID === undefined) {
        throw new NotFoundError('Account not found.');
      }

      if (!validateLocations()) {
        alert('Invalid location details.');
      }

      const updatedTravelPlan = await updateTravelPlan({
        id: travelPlan?.id,
        accountId: accountID,
        isFavorited: travelPlan?.isFavorited || false,
        isPublished: true,
      });

      const payload = locations.map((location) => {
        if ((location.id ?? -1) <= -1) {
          const { id, ...rest } = location; // this is to remove the id field from the location object
          return rest;
        }
        return location;
      });

      const updatedLocations = await updateTravelPlanLocation(
        updatedTravelPlan,
        payload
      );
      setLocations(updatedLocations);

      navigate(`${TRAVEL_PLAN_MANAGEMENT_URL}`);
    } catch (error: any) {
      switch (error) {
        case BadRequestError:
          alert('Invalid data. Please check your input.');
          break;
        case NotFoundError:
          alert('User not found. Please log in again.');
          logout(); // log them out and make them re-authenticate
          break;
        case ForbiddenError:
          alert('Login expired. Please log in again.');
          logout();
          break;
        case Error:
          // server is unavailable.
          break;
      }
    }
  }

  async function savePlan(event: any) {
    try {
      const accountID = getAccountId();
      if (accountID === null || accountID === undefined) {
        throw new NotFoundError('Account not found.');
      }

      if (!validateLocations()) {
        alert('Invalid location details.');
      }

      const updatedTravelPlan = await updateTravelPlan({
        id: travelPlan?.id,
        accountId: accountID,
        isFavorited: travelPlan?.isFavorited || false,
        isPublished: false,
      });

      const payload = locations.map((location) => {
        if ((location.id ?? -1) <= -1) {
          const { id, ...rest } = location; // this is to remove the id field from the location object
          return rest;
        }
        return location;
      });

      const updatedLocations = await updateTravelPlanLocation(
        updatedTravelPlan,
        payload
      );
      setLocations(updatedLocations);
      navigate(`${TRAVEL_PLAN_MANAGEMENT_URL}`);
    } catch (error: any) {
      switch (error) {
        case BadRequestError:
          // custom logic: tell the user they put in invalid data
          alert('Invalid data. Please check your input.');
          break;
        case NotFoundError:
          // their jwt token is invalid because we get the account id from the jwt token.
          // e.g. their account got banned
          // log them out and make them re-authenticate
          alert('User not found. Please log in again.');
          logout(); // log them out and make them re-authenticate
          break;
        case ForbiddenError:
          // their jwt token is invalid. their jwt expired
          // log them out and make them re-authenticate
          alert('Login expired. Please log in again.');
          logout();
          break;
        case Error:
          // server is unavailable.
          break;
      }
    }
  }

  async function deletePlan(event: any) {
    //might not need this parameter
    event.preventDefault();

    try {
      await deleteTravelPlan(travelPlan?.id!); // Replace with actual travelPlanId
      navigate(`${TRAVEL_PLAN_MANAGEMENT_URL}`);
    } catch (error: any) {
      switch (error) {
        case NotFoundError:
          // their jwt token is invalid because we get the account id from the jwt token.
          // e.g. their account got banned
          // log them out and make them re-authenticate
          alert('User not found. Please log in again.');
          logout(); // log them out and make them re-authenticate
          break;
        case Error:
        // server is unavailable.
      }
    }
  }

  return (
    <div className='travel-plan-background'>
      <div className='container mt-5 travel-plan-container'>
        <form className='travel-plan-form p-3 text-center'>
          <h2>Edit your Travel Plan</h2>
          {locations.map((location, index) => (
            <div key={location.id} className='location-section mb-3'>
              <h4>Location</h4>
              <div className='mb-3  w-75 m-auto'>
                <label htmlFor={`city-${location.id}`} className='form-label'>
                  City
                </label>
                <input
                  type='text'
                  id={`city-${location.id}`}
                  name={`city-${location.id}`}
                  className='form-control'
                  placeholder='Enter city'
                  value={location.city}
                  onChange={(e) =>
                    location.id !== undefined &&
                    updateLocationField(location.id, 'city', e.target.value)
                  }
                  required
                />
              </div>
              <div className='mb-3 w-75 m-auto'>
                <label
                  htmlFor={`country-${location.id}`}
                  className='form-label'
                >
                  Country
                </label>
                <input
                  type='text'
                  id={`country-${location.id}`}
                  name={`country-${location.id}`}
                  className='form-control'
                  placeholder='Enter country'
                  value={location.country}
                  onChange={(e) =>
                    location.id !== undefined &&
                    updateLocationField(location.id, 'country', e.target.value)
                  }
                  required
                />
              </div>
              <div className='mb-3 w-50 mx-auto'>
                <label
                  htmlFor={`start-date-${location.id}`}
                  className='form-label'
                >
                  Start Date
                </label>
                <input
                  type='date'
                  id={`start-date-${location.id}`}
                  name={`startDate-${location.id}`}
                  className='form-control'
                  value={
                    location.startDate
                      ? new Date(location.startDate).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    location.id !== undefined &&
                    updateLocationField(
                      location.id,
                      'startDate',
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <div className='mb-3 w-50 mx-auto'>
                <label
                  htmlFor={`end-date-${location.id}`}
                  className='form-label'
                >
                  End Date
                </label>
                <input
                  type='date'
                  id={`end-date-${location.id}`}
                  name={`endDate-${location.id}`}
                  className='form-control'
                  value={
                    location.endDate
                      ? new Date(location.endDate).toISOString().split('T')[0]
                      : ''
                  }
                  onChange={(e) =>
                    location.id !== undefined &&
                    updateLocationField(location.id, 'endDate', e.target.value)
                  }
                  required
                />
              </div>
              {index > 0 && (
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => removeLocation(location.id as number)}
                >
                  Remove Location
                </button>
              )}
            </div>
          ))}
          <div className='m-2'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={addNewLocation}
            >
              Add Location
            </button>
          </div>
          <div className='m-2'>
            <button
              type='button'
              className='btn btn-primary'
              onClick={(e) => savePlan(e)}
            >
              Save Draft
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={(e) => publishPlan(e)}
            >
              Publish
            </button>
          </div>
          <div className='mb-3'>
            <button
              type='button'
              className='btn btn-danger'
              onClick={(e) => deletePlan(e)}
            >
              Delete
            </button>
          </div>
          <FavoriteHandle
            isFavorited={travelPlan?.isFavorited || false}
            onToggleFavorite={(favored) => {
              if (travelPlan) {
                setTravelPlan({
                  ...travelPlan,
                  isFavorited: favored,
                });
              }
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default EditTravelPlanPage;
