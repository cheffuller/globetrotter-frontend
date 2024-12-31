import React, { useEffect, useState } from 'react'
import { addTravelPlanLocation, createNewTravelPlan } from '../../components/travelplan/TravelPlanService';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';
import { useNavigate } from 'react-router-dom';

//We need to include some of the following 
//form to create a travel plan
//fields: destination (city and country), start date, end date, the weather of the destination based on the start date and end date and the destination (use api), 
// (maybe what is known about the destination)
//should try and add a picture of the destination

//next thing is that after we finish the form
//we have the option to save the form so that we can view it from the profile page
//or the option to post it to the feed

//in our profile page(?) we should be able to favorite the travel plan
/* include spacing between the buttons */
function TravelPlanPage() {
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const navigate = useNavigate();

    async function saveDraft(event: any) {
        event.preventDefault();

        try {
            const travelPlanId = await createNewTravelPlan({
                accountId: -1, // GET FROM JWT
                isFavorited: false,
                isPublished: false
            })

            await addTravelPlanLocation({
                city: city,
                country: country,
                endDate: new Date(endDate),
                startDate: new Date(startDate),
                travelPlanId: travelPlanId
            })

            // redirect the user to a page to edit the travel page plan
            navigate("manage-plans/" + travelPlanId);
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

    async function publishPost(event: any) {
        event.preventDefault();

        try {
            const travelPlanId = await createNewTravelPlan({
                accountId: -1, // GET FROM JWT
                isFavorited: false,
                isPublished: false
            })

            await addTravelPlanLocation({
                city: city,
                country: country,
                endDate: new Date(endDate),
                startDate: new Date(startDate),
                travelPlanId: travelPlanId
            })

            // redirects them to the page of the published travel plan
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
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        placeholder="Enter city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        placeholder="Enter country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="start-date" className="form-label">Start Date</label>
                    <input
                        type="date"
                        id="start-date"
                        name="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="end-date" className="form-label">End Date</label>
                    <input
                        type="date"
                        id="end-date"
                        name="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={e => publishPost(e)}>Publish</button>
                <button type="button" className="btn btn-primary" onClick={e => saveDraft(e)}>Save Draft</button>
            </form>
        </div>
    )
}

export default TravelPlanPage