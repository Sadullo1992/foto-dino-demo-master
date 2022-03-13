import React from 'react';

import EventItem from './EventItem';

const Events = ({
    events, 
    deleteEvent, 
    setUpdatingEvent, 
    setAddEvent,
    setShowEventLocation,
    setEvent,
    setSearchEvent,
    searchEvent
}) => {
  return (
    <div className="events d-flex flex-column py-5 m-5">
        <div className="d-flex flex-row justify-content-between px-5">
            <h1>Events</h1>
            {searchEvent.searching && (
            <button className='btn btn-danger' style={{ height: "40px" }}>
                    <i
                    className='fa fa-times'
                    onClick={() => {
                        setSearchEvent({
                        ...searchEvent,
                        searching: false,
                        text: "",
                        events: [],
                        });
                    }}
                    ></i>
                </button>
                )}          
            </div>
            {searchEvent.searching && searchEvent.events.length === 0 ? (
            <p className='text-center'>Not record found</p>
            ) : (
                events.map((event) => (
                    <EventItem
                        key={event.id}
                        event={event}
                        deleteEvent={deleteEvent}
                        setUpdatingEvent={setUpdatingEvent}
                        setAddEvent={setAddEvent}
                        setShowEventLocation={setShowEventLocation}
                        setEvent={setEvent}
                        />
                ))
            )}    
    </div>
  )
}

export default Events;