import React from 'react'

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
type TravelPlanPageProps = {location: any, setLocation: any, onSubmitTravelPlan: any, onSubmitLocation: any}

function TravelPlanPage({location, setLocation, onSubmitTravelPlan, onSubmitLocation}: TravelPlanPageProps) {
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
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="start-date" className="form-label">Start Date</label>
        <input
          type="date"
          id="start-date"
          name="start-date"
          className="form-control"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="end-date" className="form-label">End Date</label>
        <input
          type="date"
          id="end-date"
          name="end-date"
          className="form-control"
          required
        />
      </div>
      <button type= "submit" className="btn btn-primary">Post</button>
      <button type="submit" className="btn btn-primary">Save Travel Plan</button>   
    </form>
   </div>
  )
}

export default TravelPlanPage