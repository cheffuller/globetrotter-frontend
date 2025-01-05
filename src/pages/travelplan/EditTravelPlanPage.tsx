import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteTravelPlan, getTravelPlan, getTravelPlanLocations, updateTravelPlan, updateTravelPlanLocation } from '../../components/travelplan/EditTravelPlanService'
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';
import { TRAVEL_PLAN_URL } from '../../consts/PageUrls';
import { TravelPlan } from '../../interfaces/TravelPlan';


function EditTravelPlanPage() {
    const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null); // Replace with actual travelPlan object
    const [locations, setLocations] = useState([{ city: '', country: '', startDate: '', endDate: '' }]); // Changed this to an array of objects
    const navigate = useNavigate();
    const location = useLocation();

    //old functions from TravelPlanPage.tsx
    const updateLocationField = (index: number, field: string, value: string) => { //This function is used to update the location fields in the locations, it helps determine which location is being written in 
        const updatedLocations = locations.map((locationIndex, i) => {
            if (i === index) {
                return { ...locationIndex, [field]: value };
            }
            return locationIndex;
        });
        setLocations(updatedLocations);
    };

    const addNewLocation = () => { 
        setLocations([...locations, { city: '', country: '', startDate: '', endDate: '' }]);
    };

    const removeLocation = (index: number) => { //This function is used to remove a location from the location object array
        const updatedLocations = [...locations.slice(0, index), ...locations.slice(index + 1)];
        setLocations(updatedLocations);
    };

    const travelPlanId = location.state?.travelPlanId;
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const plan = await getTravelPlan(travelPlanId);
                setTravelPlan(plan);
    
                const locations = await getTravelPlanLocations(travelPlanId);
    
                const formattedLocations = locations.map(location => ({
                    ...location,
                    startDate: location.startDate ? new Date(location.startDate).toISOString().split('T')[0] : "",
                    endDate: location.endDate ? new Date(location.endDate).toISOString().split('T')[0] : "",
                }));
                setLocations(formattedLocations);
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
            const travelPlanId = await updateTravelPlan({
                accountId: -1, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: true,
            });

            for (const locationIndex of locations) { //changed this so that we could loop thhrough multiple locations
                await updateTravelPlanLocation({
                    city: locationIndex.city,
                    country: locationIndex.country,
                    startDate: new Date(locationIndex.startDate),
                    endDate: new Date(locationIndex.endDate),
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

    async function savePlan(event: any) { //might not need this parameter
        try {
            const travelPlanId = await updateTravelPlan({
                accountId: -1, // Replace with actual accountId from JWT
                isFavorited: false,
                isPublished: false,
            });

            for (const locationIndex of locations) { //changed this so that we could loop thhrough multiple locations
                await updateTravelPlanLocation({
                    city: locationIndex.city,
                    country: locationIndex.country,
                    startDate: new Date(locationIndex.startDate),
                    endDate: new Date(locationIndex.endDate),
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

    async function deletePlan(event: any) { //might not need this parameter
        try {
            await deleteTravelPlan(location.state?.travelPlanId); // Replace with actual travelPlanId
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
                {locations.map((locationIndex, index) => (
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
                                value={locationIndex.city}
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
                                value={locationIndex.country}
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
                                value={new Date(locationIndex.startDate).toLocaleDateString('en-CA')}
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
                                value={new Date(locationIndex.endDate).toLocaleDateString('en-CA')}
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