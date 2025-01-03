import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteTravelPlan, getTravelPlan, getTravelPlanLocations, updateTravelPlan, updateTravelPlanLocation } from '../../components/travelplan/EditTravelPlanService'
import { BadRequestError, ForbiddenError, NotFoundError } from '../../errors/HttpErrors';


function EditTravelPlanPage() {
    const [travelPlan, setTravelPlan] = useState({
        id: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        isFavorited: false,
        isPublished: false
    })

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => { //this will take the state from the navigated page and set it to the travelPlan state
        if(location.state) {
            setTravelPlan(location.state)
        }
    }, [location.state]);

    async function publishPlan(event: any) { //might not need this parameter
        event.preventDefault();

        try {
            const travelPlanId = await updateTravelPlan({
                accountId: -1, // GET FROM JWT
                isFavorited: travelPlan.isFavorited,
                isPublished: true,
            })

            await updateTravelPlanLocation({
                city: travelPlan.city,
                country: travelPlan.country,
                startDate: new Date(travelPlan.startDate),
                endDate: new Date(travelPlan.endDate),
                travelPlanId: travelPlanId
            })
            //redirect to the list
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
                accountId: -1, // GET FROM JWT
                isFavorited: travelPlan.isFavorited,
                isPublished: false,
            })

            await updateTravelPlanLocation({
                city: travelPlan.city,
                country: travelPlan.country,
                startDate: new Date(travelPlan.startDate),
                endDate: new Date(travelPlan.endDate),
                travelPlanId: travelPlanId
            })
            //redirect to the list
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
            const response = await deleteTravelPlan(parseInt(travelPlan.id));

            //redirect to the list
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

    async function useTravelPlan(id: number) {
        try {
            const travelPlan = await getTravelPlan(id);

            // const travelLocation =  await getTravelPlanLocations(travelPlan.id);
            // setTravelPlan({
            //     id: travelPlan.id,
            //     city: travelLocation.city,
            //     country: travelLocation.country,
            //     startDate: travelLocation.startDate,
            //     endDate: travelLocation.endDate,
            //     isFavorited: travelPlan.isFavorited,
            //     isPublished: travelPlan.isPublished
            // })
        } catch (error: any) {
            
        }
    }
  return (
    <div>EditTravelPlanPage</div>
  )
}

export default EditTravelPlanPage