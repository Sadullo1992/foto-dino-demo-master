import React from 'react'

const EventItem = ({
    event, 
    deleteEvent, 
    setUpdatingEvent,
    setAddEvent,
    setShowEventLocation,
    setEvent,
}) => {
    const {id, name, description, event_date } = event;
  return (
    <div className='eventItem mx-auto p-3'>
        <img
            alt='location'
            src='https://images-platform.99static.com//6lGOzEAYLsS0U1etk92iqtXunGw=/1145x1239:1844x1938/fit-in/500x500/99designs-contests-attachments/110/110086/attachment_110086393'></img>
        <div className='d-flex flex-column' style={{ width: "100%" }}>
            <h1>{id + ". " + name}</h1>
            <h2>{description}</h2>
            <div className='d-flex justify-content-between'>
            <h3>Date: {event_date}</h3>
            <div>
                <button
                    className='btn btn-outline-success ml-1'
                    onClick={() => {
                        setUpdatingEvent(event);
                        setAddEvent(true);
                    }}>
                    <i className='fa fa-edit'></i>
                </button>
                <button
                    className='btn btn-outline-danger mx-1'
                    onClick={() => deleteEvent(id)}>
                    <i className='fa fa-trash'></i>
                </button>
                <button
                    className='btn btn-sm btn-outline-primary'
                    onClick={() => {
                        setShowEventLocation(true);
                        setEvent(event);
                        }}>
                    Location
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default EventItem;