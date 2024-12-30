import React, { useState, useContext } from 'react'
import { TravelPlanContext } from '../../interfaces/TravelPlanContext'
import { API_URL } from '../../consts/ApiUrl'
import { axiosPrivate } from '../../common/axiosPrivate'
import TravelPlanPage from '../../pages/travelplan/TravelPlanPage';

//the goal of this is to be able to connect the endpoint to create a travel plan 

function TravelPlanManagement() {
    const context = useContext(TravelPlanContext);
    if (!context) {
        throw new Error('You probably forgot to put <TravelPlanProvider>.');
    }
    const { travelPlan, submitTravelPlan } = context;

    const [location, setLocation] = useState({
        city: '',
        country: '',
        startDate: '',
        endDate: ''
    })

    const handleSubmitTravelPlan = async (isPublished: boolean) => { //might need to change so that it takes in the handler
        try {
            console.log("FIRST AXIOS");
            console.log(travelPlan);
            //fetch the endpoint to create a travel plan
            const response = await axiosPrivate.post(API_URL + 'plans', travelPlan);
            const createdTravelPlan = response.data;
            submitTravelPlan(createdTravelPlan);

            console.log("SECOND AXIOS");

            console.log(createdTravelPlan);

            await axiosPrivate.post(API_URL + `plans/${createdTravelPlan?.id}/locations`, {
                ...location,
                travelPlanId: createdTravelPlan?.id,
            });

            alert('Travel plan created successfully');
        } catch (err) {
            console.log(err);
            alert('Failed to create travel plan');
        }
    };

    return (
        <TravelPlanPage travelPlan={travelPlan} location={location} setLocation={setLocation} onSubmitTravelPlan={handleSubmitTravelPlan} />
    )
}

export default TravelPlanManagement