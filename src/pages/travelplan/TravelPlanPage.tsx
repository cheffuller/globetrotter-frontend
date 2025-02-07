import { useEffect, useState, useContext } from 'react';
import {
  addTravelPlanLocation,
  createNewTravelPlan,
  createPost,
} from '../../components/travelplan/TravelPlanService';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from '../../errors/HttpErrors';
import { useNavigate } from 'react-router';
import { TRAVEL_PLAN_EDIT_URL, TRAVEL_PLAN_MANAGEMENT_URL, TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { getAccountId } from '../../common/AuthService';
import { useLocationManagement } from '../../components/travelplan/LocationManagement';
import FavoriteHandle from '../../components/travelplan/FavoriteHandle';
import { TravelPlanContext } from '../../components/travelplan/TravelPlanContext';
import { useAuth } from '../../common/AuthContext';
import { convertToUTC } from '../../utils/DateUtils';

function TravelPlanPage() {
  const planContext = useContext(TravelPlanContext);
  if (!planContext) {
    throw new Error('Travel Plan Context is null');
  }
  const { setTravelPlan, clearTravelPlan } = planContext;
  const { logout } = useAuth();

  useEffect(() => {
    clearTravelPlan(); // Clear the context before creating a new travel plan
  }, []);

  const navigate = useNavigate();
  const {
    locations,
    addNewLocation,
    removeLocation,
    updateLocationField,
    setLocations,
    validateLocations,
  } = useLocationManagement();
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    // Initialize with a default blank location if the locations array is empty
    if (locations.length === 0) {
      setLocations([
        {
          id: -1, // Temporary ID for new locations
          city: '',
          country: '',
          startDate: new Date().toISOString().slice(0, 10),
          endDate: new Date().toISOString().slice(0, 10),
          travelPlanId: 0, // Will be set when saved
        },
      ]);
    }
  }, [locations, setLocations]);

  const saveDraft = async (event: any) => {
    event.preventDefault();

    try {
      const accountID = getAccountId();
      if (accountID === null || accountID === undefined) {
        throw new NotFoundError('Account not found.');
      }

      if (!validateLocations()) {
        alert('Invalid travel plan details.');
        throw new BadRequestError('Invalid dates for Travel Plan.');
      }
      const travelPlanId = await createNewTravelPlan({
        accountId: accountID,
        isFavorited: favorited,
        isPublished: false,
      });

      for (const location of locations) {
        await addTravelPlanLocation({
          city: location.city,
          country: location.country,
          startDate: convertToUTC(location.startDate),
          endDate: convertToUTC(location.endDate),
          travelPlanId,
        });
      }

      await createPost(travelPlanId);

      const travelPlan = {
        id: travelPlanId,
        accountId: accountID,
        isPublished: false,
        isFavorited: favorited,
      };
      setTravelPlan(travelPlan);

      navigate(`${TRAVEL_PLAN_EDIT_URL}`);
    } catch (error: any) {
      switch (error) {
        case BadRequestError:
          // custom logic: tell the user they put in invalid data
          alert('Invalid travel plan details.');
          break;
        case NotFoundError:
          // their jwt token is invalid because we get the account id from the jwt token.
          // e.g. their account got banned
          // log them out and make them re-authenticate
          alert('User not found. Please log in again.');
          logout();
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
  };

  async function publishPost(event: any) {
    event.preventDefault();

    try {
      const accountID = getAccountId();
      if (accountID === null || accountID === undefined) {
        throw new NotFoundError('Account not found.');
      }

      if (!validateLocations()) {
        alert('Invalid travel plan details.');
        throw new BadRequestError('Invalid dates for Travel Plan.');
      }

      const travelPlanId = await createNewTravelPlan({
        accountId: accountID,
        isFavorited: favorited,
        isPublished: true,
      });

      for (const location of locations) {
        await addTravelPlanLocation({
          city: location.city,
          country: location.country,
          startDate: convertToUTC(location.startDate),
          endDate: convertToUTC(location.endDate),
          travelPlanId,
        });
      }

      await createPost(travelPlanId);

      navigate(`${TRAVEL_PLAN_MANAGEMENT_URL}`);
    } catch (error: any) {
      switch (error) {
        case BadRequestError:
          // custom logic: tell the user they put in invalid data
          alert('Invalid travel plan details.');
          break;
        case NotFoundError:
          // their jwt token is invalid because we get the account id from the jwt token.
          // e.g. their account got banned
          // log them out and make them re-authenticate
          alert('User not found. Please log in again.');
          logout();
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

  return (
    <div className='travel-plan-background'>
      <div className='container mt-5 travel-plan-container'>
        <form className='travel-plan-form p-3 text-center'>
          <h2>Create a Travel Plan</h2>
          {locations.map((location, index) => (
            <div key={location.id} className='location-section mb-3'>
              <h4>Location</h4>
              <div className='mb-3 w-75 m-auto'>
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
                    updateLocationField(
                      location.id as number,
                      'city',
                      e.target.value
                    )
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
                    updateLocationField(
                      location.id as number,
                      'country',
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <div className='mb-3 w-50 mx-auto'>
                <label
                  htmlFor={`start-date-${location.id as number}`}
                  className='form-label'
                >
                  Start Date
                </label>
                <input
                  type='date'
                  id={`start-date-${location.id}`}
                  name={`startDate-${location.id}`}
                  className='form-control'
                  value={location.startDate.toString()} //same thing here, check to make sure this sends correctly
                  onChange={(e) =>
                    updateLocationField(
                      location.id as number,
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
                  value={location.endDate.toString()}
                  onChange={(e) =>
                    updateLocationField(
                      location.id as number,
                      'endDate',
                      e.target.value
                    )
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
              className='btn btn-primary m-1'
              onClick={(e) => saveDraft(e)}
            >
              Save Draft
            </button>
            <button
              type='button'
              className='btn btn-primary m-1'
              onClick={(e) => publishPost(e)}
            >
              Publish
            </button>
          </div>
          <div className='m-2'>
            <FavoriteHandle
              isFavorited={favorited}
              onToggleFavorite={(favored) => {
                setFavorited(favored);
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TravelPlanPage;
