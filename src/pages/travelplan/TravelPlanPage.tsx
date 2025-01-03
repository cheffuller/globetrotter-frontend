import React, { useEffect, useState } from 'react'
import { addTravelPlanLocation, createNewTravelPlan } from '../../components/travelplan/TravelPlanService';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';
import { useNavigate } from 'react-router-dom';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';

function TravelPlanPage() {
    
    const [locations, setLocations] = useState([{ city: '', country: '', startDate: '', endDate: '' }]); // Changed this to an array of objects
    const navigate = useNavigate();

    const updateLocationField = (index: number, field: string, value: string) => { //This function is used to update the location fields in the state array
        const updatedLocations = locations.map((location, i) => {
            if (i === index) {
                return { ...location, [field]: value };
            }
            return location;
        });
        setLocations(updatedLocations);
    };

    const addNewLocation = () => { //This function is used to add a new location to the state array
        setLocations([...locations, { city: '', country: '', startDate: '', endDate: '' }]);
    };

    const removeLocation = (index: number) => { //This function is used to remove a location from the state array
        const updatedLocations = [...locations.slice(0, index), ...locations.slice(index + 1)];
        setLocations(updatedLocations);
    };

    const saveDraft = async (event: any) => {
        event.preventDefault();

        try {
            const travelPlanId = await createNewTravelPlan({
                accountId: -1, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: false,
            });

            for (const location of locations) {
                await addTravelPlanLocation({
                    city: location.city,
                    country: location.country,
                    startDate: new Date(location.startDate),
                    endDate: new Date(location.endDate),
                    travelPlanId,
                });
            }

            navigate(`${TRAVEL_PLAN_URL}/management`);
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
            const travelPlanId = await createNewTravelPlan({
                accountId: -1, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: false,
            });

            for (const location of locations) {
                await addTravelPlanLocation({
                    city: location.city,
                    country: location.country,
                    startDate: new Date(location.startDate),
                    endDate: new Date(location.endDate),
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
                            value={new Date(location.startDate).toLocaleDateString('en-CA')}
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
                            value={new Date(location.endDate).toLocaleDateString('en-CA')}
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
                className="btn btn-secondary mb-3"
                onClick={addNewLocation}
            >
                Add Location
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={saveDraft}
            >
                Save Draft
            </button>
        </form>
    </div>
    );
}

export default TravelPlanPage