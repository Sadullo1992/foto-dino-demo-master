import React, {useState, useEffect} from 'react';
import { Fragment } from 'react/cjs/react.development';

const EventForm = ({
  createEvent, 
  setAddEvent, 
  allLocations,
  updatingEvent,
  setUpdatingEvent,
  updateEvent,

}) => {
  const [location, setEventLocation] = useState(null);
  const [event_date, setEventDate] = useState("");
  const [status, setEventStatus] = useState(null);
  const [name, setEventName] = useState("");
  const [description, setEventDescription] = useState("");

  useEffect(() => {
    // setEventLocation(updatingEvent.location ? updatingEvent.location : null);
    setEventDate(updatingEvent.event_date ? updatingEvent.event_date : "");
    // setEventStatus(updatingEvent.status ? updatingEvent.status : null);
    setEventName(updatingEvent.name ? updatingEvent.name : "");
    setEventDescription(updatingEvent.description ? updatingEvent.description : "");
  },[updatingEvent]);

  const onSubmit = (e) => {
    e.preventDefault();
        
    if(!location) {
      alert("Please add a Location");
      return;
    } 
    if(!event_date) {
      alert("Please add a Event date");
      return;
    } 
    if(!event_date.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)) {
      alert("Please, Enter the date as in the pattern: yyyy-mm-dd");
      return;
    }
    if(!status) {
      alert("Please add a Status");
      return;
    } 
    if(!name) {
      alert("Please add a Name");
      return;
    } 
    if(!description) {
      alert("Please add a Description");
      return;
    } 
    
    if(updatingEvent.id !== undefined) {
      updateEvent({location, event_date, status, name, description}, updatingEvent.id);
    } else {
      console.log("null");
      createEvent({location, event_date, status, name, description});
    }    

    
    setUpdatingEvent({});
    setAddEvent(false);

    // setEventLocation(null);
    setEventDate("");
    // setEventStatus(null);
    setEventName("");
    setEventDescription("");
  }

  const onClearEvent = () => {
    setUpdatingEvent({});
  }   
  

    return (
        <form className='event-form mx-auto my-5' onSubmit={onSubmit}>
          <div className='d-flex flex-row justify-content-between'>
            <h2>Event Form</h2>
            <button 
              className='btn btn-danger'
              onClick={() => {
                setAddEvent(false);
                setUpdatingEvent({});
                }}>
              <i className='fa fa-times'></i>
            </button>
          </div>
          {
            allLocations ? (
              <Fragment>
                 <div className='mb-3 d-flex flex-column'>
              <label htmlFor='Eventlocation' className='form-label'>
                Locations
              </label>
              <select 
                className='form-select' 
                id='Eventlocation'
                defaultValue={' '}
                onChange={(e) => setEventLocation(e.target.value)}>
                  <option disabled value=' '> </option>
                  {
                    allLocations.map((location) => (
                    <option 
                      key={location.id}
                      className='dropdown-item' 
                      value={location.id}>
                        {location.name}
                    </option>))
                  }                
                </select>
            </div>
            <div className='mb-3 d-flex flex-column'>
              <label htmlFor='Eventdate' className='form-label'>
                Event date
              </label>
              <input
                type='text'
                className='form-control'
                id='Eventdate'
                placeholder='yyyy-mm-dd'
                value={event_date}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>  
            <div className='mb-3 d-flex flex-column'>
              <label htmlFor='Eventstatus' className='form-label'>
                Status
              </label>
              <select 
                className='form-select' 
                id='Eventstatus' 
                defaultValue={' '}
                onChange={(e) => setEventStatus(e.target.value)}>
                  <option disabled value=' '> </option>
                  <option className='dropdown-item' value='Scheduled'>
                    Scheduled
                  </option>
                  <option className='dropdown-item' value='Cancelled'>
                    Cancelled
                  </option>
                  <option className='dropdown-item' value='Available'>
                    Available
                  </option>
                  <option className='dropdown-item' value='Complete'>
                    Complete
                  </option>
                </select>
            </div>  

            <div className='mb-3 d-flex flex-column'>
              <label htmlFor='Eventname' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                id='Eventname'
                placeholder='Name'
                value={name}
                onChange={(e) => setEventName(e.target.value)}/>
            </div>   
            <div className='mb-3 d-flex flex-column'>
              <label htmlFor='Eventdescription' className='form-label'>
                Description
              </label>
              <input
                type='text'
                className='form-control'
                id='Eventdescription'
                placeholder='Some description here...'
                value={description}
                onChange={(e) => setEventDescription(e.target.value)}/>
            </div> 
          
            {updatingEvent.id ? (
              <button type='submit' className='btn btn-outline-primary'>
                Update
              </button>
            ) : (
              <button type='submit' className='btn btn-outline-primary'>
                Submit
              </button>
            )}
            <button
              type='reset'
              className='btn btn-outline-warning mx-2'
              onClick={onClearEvent}
            >
              Clear
            </button>
                </Fragment>) : (<h5 className='m-3'>There is no location, Please inter location from the Cities section</h5>)
          }
         
        </form>
      );
}

export default EventForm;