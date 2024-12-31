import React, { useState, useContext } from 'react'
//the goal of this is to be able to connect the endpoint to create a travel plan 

function TravelPlanManagement() {
  // const context = useContext(TravelPlanContext);
  // if(!context) {
  //   throw new Error('You probably forgot to put <TravelPlanProvider>.');
  // }
  // const { travelPlan, submitTravelPlan } = context;

  // const handleSubmitTravelPlan = async (isPublished: boolean) => { //might need to change so that it takes in the handler
  //   try {
  //     //fetch the endpoint to create a travel plan
  //     const response = await axiosPrivate.post(API_URL + 'plans', travelPlan);
  //     console.log('Response:', response.data);
  //     const createdTravelPlan = response.data;
  //     submitTravelPlan(createdTravelPlan);

  //     await axiosPrivate.post(API_URL + `plans/${createdTravelPlan?.id}/locations`, {
  //       ...location,
  //       travelPlanId: createdTravelPlan?.id,
  //     });

  //     alert('Travel plan created successfully');
  //   } catch (err) {
  //     console.log(err);
  //     alert('Failed to create travel plan');
  //   }
  // };

  return (
    <>
    </>
    // <TravelPlanPage location={location} />
  )
}

//will use this for the api call maybe

export default TravelPlanManagement