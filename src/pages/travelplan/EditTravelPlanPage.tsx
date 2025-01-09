import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPost, deleteTravelPlan, deleteTravelPlanLocations, getTravelPlan, getTravelPlanLocations, updateTravelPlan, updateTravelPlanLocation } from '../../components/travelplan/TravelPlanService'
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { TravelPlan } from '../../interfaces/TravelPlan';
import { addTravelPlanLocation } from '../../components/travelplan/TravelPlanService';
import { getAccountId } from '../../common/AuthService';
import { toUTCDate } from '../../components/travelplan/Handlers';
import { useLocationManagement } from '../../components/travelplan/LocationManagement';

function EditTravelPlanPage() {
    const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
    const { locations, addNewLocation, removeLocation, updateLocationField, setLocations, removedLocations, clearRemovedLocations, validateLocations } = useLocationManagement();

    const navigate = useNavigate();
    const loc = useLocation();

    const travelPlanId = loc.state?.travelPlanId;
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const plan = await getTravelPlan(travelPlanId);
                setTravelPlan(plan);

                const locations = await getTravelPlanLocations(travelPlanId);
                console.log(locations);

                const formattedLocations = locations.map(location => ({
                    ...location,
                    startDate: location.startDate,
                    endDate: location.endDate,
                }));
                setLocations(formattedLocations);
                console.log(locations);
            } catch (error) {
                switch (error) {
                    case NotFoundError:
                        // their jwt token is invalid because we get the account id from the jwt token.
                        // e.g. their account got banned
                        // log them out and make them re-authenticate
                        break;
                    case Error:
                        // server is unavailable.
                        break;
                }
            }
        };

        fetchLocations();
    }, [travelPlanId]);

    async function publishPlan(event: any) { //might not need this parameter
        event.preventDefault();

        try {
            const accountID = getAccountId();
            if (accountID === null || accountID === undefined) {
                throw new NotFoundError("Account not found.");
            }

            validateLocations();
            const travelPlanId = await updateTravelPlan({
                id: travelPlan?.id, // Replace with actual travelPlanId
                accountId: accountID, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: true,
            });

            for (const location of removedLocations) {
                await deleteTravelPlanLocations(travelPlanId, location); //go to service class and create this function
            }

            for (const location of locations) { //changed this so that we could loop thhrough multiple locations
                if (location.id === 0) {
                    await addTravelPlanLocation({
                        city: location.city,
                        country: location.country,
                        startDate: toUTCDate(location.startDate.toISOString()),
                        endDate: toUTCDate(location.endDate.toISOString()),
                        travelPlanId,
                    });
                } else {
                    await updateTravelPlanLocation({
                        id: location.id,
                        city: location.city,
                        country: location.country,
                        startDate: toUTCDate(location.startDate.toISOString()),
                        endDate: toUTCDate(location.endDate.toISOString()),
                        travelPlanId,
                    });
                }
            }

            const travelPost = await createPost(travelPlanId);

            clearRemovedLocations();
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

    async function savePlan(event: any) { //might not need this parameter
        try {
            const accountID = getAccountId();
            if (accountID === null || accountID === undefined) {
                throw new NotFoundError("Account not found.");
            }

            validateLocations();
            const travelPlanId = await updateTravelPlan({
                id: travelPlan?.id,
                accountId: accountID, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: false,
            });

            for (const location of removedLocations) {
                await deleteTravelPlanLocations(travelPlanId, location); //go to service class and create this function
            }

            for (const locationIndex of locations) { //changed this so that we could loop thhrough multiple locations
                if (locationIndex.id === 0) {
                    await addTravelPlanLocation({
                        city: locationIndex.city,
                        country: locationIndex.country,
                        startDate: toUTCDate(locationIndex.startDate.toISOString()),
                        endDate: toUTCDate(locationIndex.endDate.toISOString()),
                        travelPlanId,
                    });
                } else {
                    await updateTravelPlanLocation({
                        id: locationIndex.id,
                        city: locationIndex.city,
                        country: locationIndex.country,
                        startDate: new Date(locationIndex.startDate),
                        endDate: new Date(locationIndex.endDate),
                        travelPlanId,
                    });
                }
            }

            clearRemovedLocations();
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

    async function deletePlan(event: any) { //might not need this parameter
        try {
            await deleteTravelPlan(loc.state?.travelPlanId); // Replace with actual travelPlanId
            navigate(`${TRAVEL_PLAN_URL}/management`);
        } catch (error: any) {
            switch (error) {
                case NotFoundError:
                    // their jwt token is invalid because we get the account id from the jwt token.
                    // e.g. their account got banned
                    // log them out and make them re-authenticate
                    break;
                case Error:
                // server is unavailable.
            }
        }
    }

    return (
        <div className="container">
            <form className="travel-plan-form p-3">
                <h2>Edit your Travel Plan</h2>
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
                                onChange={(e) => location.id !== undefined && updateLocationField(location.id, 'city', e.target.value)}
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
                                onChange={(e) => location.id !== undefined && updateLocationField(location.id, 'country', e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`start-date-${location.id}`} className="form-label">Start Date</label>
                            <input
                                type="date"
                                id={`start-date-${location.id}`}
                                name={`startDate-${location.id}`}
                                className="form-control"
                                value={location.startDate ? new Date(location.startDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => location.id !== undefined && updateLocationField(location.id, 'startDate', e.target.value)}
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
                                value={location.endDate ? new Date(location.endDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => location.id !== undefined && updateLocationField(location.id, 'endDate', e.target.value)}
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
                    onClick={e => savePlan(e)}
                >
                    Save Draft
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={e => publishPlan(e)}
                >
                    Publish
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={e => deletePlan(e)}
                >
                    Delete
                </button>
            </form>
        </div>
    )
}

export default EditTravelPlanPage