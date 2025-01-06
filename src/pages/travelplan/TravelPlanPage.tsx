import React, { useEffect, useState } from 'react'
import { addTravelPlanLocation, createNewTravelPlan } from '../../components/travelplan/TravelPlanService';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';
import { useNavigate } from 'react-router-dom';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { getAccountId } from '../../common/AuthService';
import { TravelPlanLocation } from '../../interfaces/TravelPlanLocation';
import { toUTCDate } from '../../components/travelplan/Handlers';

function TravelPlanPage() {
    const navigate = useNavigate();
    const [locations, setLocations] = useState<TravelPlanLocation[]>([]); // Changed this to an array of objects

    const updateLocationField = (id: number, field: keyof TravelPlanLocation, value: string | Date) => { //This function is used to update the location fields in the locations, it helps determine which location is being written in 
        const updatedLocations = locations.map(location => {
            if (location.id === id) {
                return { ...location, [field]: value };
            }
            return location;
        });
        setLocations(updatedLocations);
    };

    const addNewLocation = () => { 
        setLocations([...locations, {id: 0, city: '', country: '', startDate: new Date(), endDate: new Date(), travelPlanId: 0 }]);
    };

    const removeLocation = (id: number) => { 
        setLocations(locations.filter(location => location.id !== id));
    };

    const saveDraft = async (event: any) => {
        event.preventDefault();

        try {
            const accountID = getAccountId();
            if(accountID === null || accountID === undefined) {
                throw new NotFoundError("Account not found.");
            }
            const travelPlanId = await createNewTravelPlan({
                accountId: accountID, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: false,
            });

            for (const location of locations) { //changed this so that we could loop thhrough multiple locations
                await addTravelPlanLocation({
                    city: location.city,
                    country: location.country,
                    startDate: toUTCDate(location.startDate.toString()),
                    endDate: toUTCDate(location.endDate.toString()),
                    travelPlanId,
                });
            }

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
            const travelPlanId = await createNewTravelPlan({
                accountId: accountID, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: true,
            });

            for (const location of locations) {
                await addTravelPlanLocation({
                    city: location.city,
                    country: location.country,
                    startDate: toUTCDate(location.startDate.toString()),
                    endDate: toUTCDate(location.endDate.toString()),
                    travelPlanId,
                });
            }

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
                    <div key={index} className="location-section mb-3">
                        <h4>Location {index + 1}</h4>
                        <div className="mb-3">
                            <label htmlFor={`city-${index}`} className="form-label">City</label>
                            <input
                                type="text"
                                id={`city-${index}`}
                                name={`city-${index}`}
                                className="form-control"
                                placeholder="Enter city"
                                value={location.city}
                                onChange={(e) => updateLocationField(index, 'city', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`country-${index}`} className="form-label">Country</label>
                            <input
                                type="text"
                                id={`country-${index}`}
                                name={`country-${index}`}
                                className="form-control"
                                placeholder="Enter country"
                                value={location.country}
                                onChange={(e) => updateLocationField(index, 'country', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`start-date-${index}`} className="form-label">Start Date</label>
                            <input
                                type="date"
                                id={`start-date-${index}`}
                                name={`startDate-${index}`}
                                className="form-control"
                                value={location.startDate ? location.startDate.toString() : ''}
                                onChange={(e) => updateLocationField(index, 'startDate', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`end-date-${index}`} className="form-label">End Date</label>
                            <input
                                type="date"
                                id={`end-date-${index}`}
                                name={`endDate-${index}`}
                                className="form-control"
                                value={location.endDate ? location.endDate.toString() : ''}
                                onChange={(e) => updateLocationField(index, 'endDate', e.target.value)}
                                required
                            />
                        </div>
                        {index > 0 && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => removeLocation(index)}
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
            </form>
        </div>
    );
}

export default TravelPlanPage