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
type TravelPlanPageProps = {travelPlan: any, location: any, setLocation: (location: any) => void, 
  onSubmitTravelPlan: (isPublished: boolean) => void}

function TravelPlanPage({travelPlan, location, setLocation, onSubmitTravelPlan}: TravelPlanPageProps) {
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setLocation((prev: any) => ({...prev, [name]: value}))
    console.log('Current location state:', location);
    console.log('Field Name:', name, 'Value:', value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form className="travel-plan-form p-3" onSubmit={handleFormSubmit}>
      <h2>Create a Travel Plan</h2>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">City</label>
        <input
          type="text"
          id="city"
          name="city"
          className="form-control"
          placeholder="Enter city"
          value={location.city}
          onChange={handleLocationChange}
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
          value={location.country}
          onChange={handleLocationChange}
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
          value={location.startDate}
          onChange={handleLocationChange}
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
          value={location.endDate}
          onChange={handleLocationChange}
          required
        />
      </div>
      <button type= "button" className="btn btn-primary" onClick={ () => onSubmitTravelPlan(true)}>Post</button>
      <button type= "button" className="btn btn-primary" onClick={ () => onSubmitTravelPlan(false)}>Save</button>   
    </form>
   </div>
  )
}

export default TravelPlanPage