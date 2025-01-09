import React, { useEffect, useState } from 'react'
import { addTravelPlanLocation, createNewTravelPlan, createPost } from '../../components/travelplan/TravelPlanService';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';
import { useNavigate } from 'react-router-dom';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { getAccountId } from '../../common/AuthService';
import { useLocationManagement } from '../../components/travelplan/LocationManagement';
import FavoriteHandle from '../../components/travelplan/FavoriteHandle';

function TravelPlanPage() {
    const navigate = useNavigate();
    const { locations, addNewLocation, removeLocation, updateLocationField, setLocations, validateLocations } = useLocationManagement();
    const [favorited, setFavorited] = useState(false);
     
    const handleFavoriteToggle = (favored: boolean) => {
        setFavorited(favored);
    };

    useEffect(() => {
        // Initialize with a default blank location if the locations array is empty
        if (locations.length === 0) {
          setLocations([
            {
              id: -1, // Temporary ID for new locations
              city: '',
              country: '',
              startDate: new Date(), // Today's date
              endDate: new Date(), // Today's date
              travelPlanId: 0, // Will be set when saved
            },
          ]);
        }
      }, [locations, setLocations]);

    const saveDraft = async (event: any) => {
        event.preventDefault();

        try {
            const accountID = getAccountId();
            if(accountID === null || accountID === undefined) {
                throw new NotFoundError("Account not found.");
            }
            
            if(!validateLocations()) {
                alert("Invalid travel plan details.");
            }
            const travelPlanId = await createNewTravelPlan({
                accountId: accountID, // Replace with actual accountId from JWT
                isFavorited: favorited,
                isPublished: false,
            });

            for (const location of locations) { //changed this so that we could loop thhrough multiple locations
                await addTravelPlanLocation({
                    city: location.city,
                    country: location.country,
                    startDate: location.startDate,
                    endDate: location.endDate,
                    travelPlanId,
                });
            }

            console.log("Travel Plan ID: ", travelPlanId);
            const travelPost = await createPost(travelPlanId);

            navigate(`${TRAVEL_PLAN_URL}/edit`, { state: { travelPlanId } });
        } catch (error : any) {
            switch (error) {
                case BadRequestError:
                    // custom logic: tell the user they put in invalid data
                    break;
                case NotFoundError:
                    // their jwt token is invalid because we get the account id from the jwt token.
                    // e.g. their account got banned
                    // log them out and make them re-authenticate
                    break;
                case ForbiddenError:
                    // their jwt token is invalid. their jwt expired
                    // log them out and make them re-authenticate
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
            if(accountID === null || accountID === undefined) {
                throw new NotFoundError("Account not found.");
            }

            if(!validateLocations()) {
                alert("Invalid travel plan details.");
            }

            const travelPlanId = await createNewTravelPlan({
                accountId: accountID, // Replace with actual accountId from JWT
                isFavorited: favorited,
                isPublished: true,
            });

            for (const location of locations) {
                await addTravelPlanLocation({
                    city: location.city,
                    country: location.country,
                    startDate: location.startDate, //make sure to look at if this affects post by make date null
                    endDate: location.endDate,
                    travelPlanId,
                });
            }

            const travelPost = await createPost(travelPlanId);

            navigate(`${TRAVEL_PLAN_URL}/management`);
        } catch (error: any) {
            switch (error) {
                case BadRequestError:
                    // custom logic: tell the user they put in invalid data
                    break;
                case NotFoundError:
                    // their jwt token is invalid because we get the account id from the jwt token.
                    // e.g. their account got banned
                    // log them out and make them re-authenticate
                    break;
                case ForbiddenError:
                    // their jwt token is invalid. their jwt expired
                    // log them out and make them re-authenticate
                    break;
                case Error:
                    // server is unavailable.
                    break;
            }
        }
    }
    

    return (
        <div className="container">
            <form className="travel-plan-form p-3">
                <h2>Create a Travel Plan</h2>
                {locations.map((location, index) => (
                    <div key={location.id} className="location-section mb-3">
                        <h4>Location {index + 1}</h4>
                        <div className="mb-3">
                            <label htmlFor={`city-${location.id}`} className="form-label">City</label>
                            <input
                                type="text"
                                id={`city-${location.id}`}
                                name={`city-${location.id}`}
                                className="form-control"
                                placeholder="Enter city"
                                value={location.city}
                                onChange={(e) => updateLocationField(location.id as number, 'city', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`country-${location.id}`} className="form-label">Country</label>
                            <input
                                type="text"
                                id={`country-${location.id}`}
                                name={`country-${location.id}`}
                                className="form-control"
                                placeholder="Enter country"
                                value={location.country}
                                onChange={(e) => updateLocationField(location.id  as number, 'country', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`start-date-${location.id as number}`} className="form-label">Start Date</label>
                            <input
                                type="date"
                                id={`start-date-${location.id}`}
                                name={`startDate-${location.id}`}
                                className="form-control"
                                value={location.startDate.toString()} //same thing here, check to make sure this sends correctly
                                onChange={(e) => updateLocationField(location.id  as number, 'startDate', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`end-date-${location.id}`} className="form-label">End Date</label>
                            <input
                                type="date"
                                id={`end-date-${location.id}`}
                                name={`endDate-${location.id}`}
                                className="form-control"
                                value={location.endDate.toString()}
                                onChange={(e) => updateLocationField(location.id  as number, 'endDate', e.target.value)}
                                required
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeLocation(location.id as number)}
                            >
                                Remove Location
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addNewLocation}
                >
                    Add Location
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={e => saveDraft(e)}
                >
                    Save Draft
                </button>
                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={e => publishPost(e)}
                >
                    Publish
                </button>
                <FavoriteHandle
                    isFavorited={favorited}
                    onToggleFavorite={handleFavoriteToggle}
                />
            </form>
        </div>
    );
}

export default TravelPlanPage