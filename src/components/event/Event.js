import React, {useState, useEffect} from "react";

const Event = ({
  event,
  allLocations,
  setShowEventLocation
}) => {
  const [eventLocation, setEventLocation] = useState({});
  
  useEffect(() => {
      const location = allLocations.find(location => location.id === event.location);
      setEventLocation(location);
  },[allLocations, event]); 
  
  return (
    <div className='back'>
      <div className='city event d-flex flex-column my-5'>
        <button 
            className='btn btn-sm btn-danger'
            onClick={() => {
                setShowEventLocation(false);
                setEventLocation({})
            }}
            >
          <i className='fa fa-times'></i>
        </button>
        <h1>{event.name}</h1>
        <h2>{event.description}</h2>
        <h3>Date: {event.event_date}</h3>
        <div className='location-item justify-content-between align-items-end'>
        <div className='d-flex flex-column' style={{ width: "100%" }}>

            <h4>{eventLocation.name}</h4>
            <h5>{"Rent: $" + eventLocation.rent}</h5>
            <h6>{"Address: " + eventLocation.street_name}</h6>
            <h6>{"Email: " + eventLocation.email}</h6>
            <h6>{"Phone: " + eventLocation.phone}</h6>
            <h6>{"Postal Code: " + eventLocation.postal_code}</h6>    
            {eventLocation.status === "Available" && (
            <h6>
                <i className='fa fa-circle' style={{ color: "green" }}></i>{" "}
                Available
            </h6>
            )}

            {eventLocation.status === "Unavailable" && (
            <h6>
                <i className='fa fa-circle' style={{ color: "red" }}></i>{" "}
                Unavailable
            </h6>
            )}

            {eventLocation.status === "Active" && (
            <h6>
                <i className='fa fa-circle' style={{ color: "yellow" }}></i> Active
            </h6>
            )}
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default Event;
