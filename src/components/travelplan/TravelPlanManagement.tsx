import React, { useState, useContext } from 'react'
import { TravelPlanContext } from '../../interfaces/TravelPlanContext'
import { API_URL } from '../../consts/ApiUrl'
import axios from 'axios'
import TravelPlanPage from '../../pages/travelplan/TravelPlanPage';

//the goal of this is to be able to connect the endpoint to create a travel plan 

function TravelPlanManagement() {
  const context = useContext(TravelPlanContext);
  if(!context) {
    throw new Error('You probably forgot to put <TravelPlanProvider>.');
  }
  const { travelPlan, submitTravelPlan } = context;

  const [location, setLocation] = useState({
    city: '',
    country: '',
    startDate: '',
    endDate: ''
  })
  
  const handleSubmitTravelPlan = async () => {
    try {
      //fetch the endpoint to create a travel plan
      const response = await axios.post(API_URL + '/plans', travelPlan);
      submitTravelPlan(response.data);
      alert('Travel plan created successfully');
    } catch (err) {
      console.log(err);
      alert('Failed to create travel plan');
    }
  };

  const handleSubmitLocation = async () => {
    if(!travelPlan) {
      alert('Please find the travel plan first');
      return;
    }

    try {
      await axios.post(API_URL + `/plans/${travelPlan?.id}/locations`, {
        ...location,
        travelPlanId: travelPlan?.id,
      });
    } catch (err) {
      console.log(err);
      alert('Failed to add location');
    }
  };

  return (
    <TravelPlanPage location={location} setLocation={setLocation} onSubmitTravelPlan={handleSubmitTravelPlan} onSubmitLocation={handleSubmitLocation}/>
  )
}

export default TravelPlanManagement