import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Cities from "./components/city/Cities";
import CityForm from "./components/city/CityForm";
import City from "./components/city/City";

import { Events, EventForm, Event } from "./components/event";

import "./App.css";
import LocationForm from "./components/location/LocationForm";
import UpdateLocation from "./components/location/UpdateLocation";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([{}]);
  const [city, setCity] = useState({});
  const [searchCity, setSearchCity] = useState({
    text: "",
    cities: [],
    searching: false,
  });
  const [addCity, setAddCity] = useState(false);
  const [sortType, setSortType] = useState("id");
  const [updatingCity, setUpdatingCity] = useState({});
  const [updateLocation, setUpdateLocation] = useState({});
  const [locations, setLocations] = useState([]);
  const [addLocation, setAddLocation] = useState(false);
  const [event, setEvent] = useState({});

  //Event useState
  const [showEvents, setShowEvents] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [events, setEvents] = useState([{}]);
  const [allLocations, setAllLocations] = useState([]);
  const [updatingEvent, setUpdatingEvent] = useState({});
  const [showEventLocation, setShowEventLocation] = useState(false);
  const [searchEvent, setSearchEvent] = useState({
    text: "",
    events: [],
    searching: false,
  });
  

  useEffect(() => {
    const getCities = async () => {
      const CitiesFromServer = await fetchCities();
      setCities(CitiesFromServer);
      setLoading(false);
    };
    getCities();
  }, []);

  

  //City methods

  const fetchCities = async () => {
    const res = await axios.get("https://testapi.photodino.de/cities/");
    const data = await res.data;
    return data;
  };

  const createCity = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post("https://testapi.photodino.de/cities/", formData, config)
      .then((res) => {
        const data = res.data;

        if (sortType === "id2") {
          setCities([data, ...cities]);
        } else {
          setCities([...cities, data]);
        }
      });
  };

  const updateCity = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .put(`https://testapi.photodino.de/cities/${id}/`, data, config)
      .then((res) => {
        const data = res.data;
        setCities(
          cities.map((city) =>
            city.id === id
              ? { ...city, name: data.name, code: data.code }
              : city
          )
        );
      });
  };

  const deleteCity = async (id) => {
    await axios.delete(`https://testapi.photodino.de/cities/${id}/`);
    setCities(cities.filter((city) => city.id !== id));
  };

  //location methods

  const fetchLocations = async (cityId) => {
    await axios
      .get("https://testapi.photodino.de/locations/", {
        params: { city_id: cityId },
      })
      .then((res) => {
        const data = res.data;
        setLocations(data);
        
      });
  };  

  const createLocation = async (formData) => {
    formData = { ...formData, city: city.id };
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post("https://testapi.photodino.de/locations/", formData, config)
      .then((res) => {
        const data = res.data;
        setLocations([data, ...locations]);
      });
  };

  const updatingLocation = async (data, id) => {
    data = { ...data, city: city.id };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .put(`https://testapi.photodino.de/locations/${id}/`, data, config)
      .then((res) => {
        const data = res.data;
        setLocations(
          locations.map((location) => (location.id === id ? data : location))
        );
      });
  };

  const deleteLocation = async (id) => {
    await axios.delete(`https://testapi.photodino.de/locations/${id}/`);
    setLocations(locations.filter((location) => location.id !== id));
  };

  
 // Get allEvent
  useEffect(() => {
    const getEvents = async () => {
      const EventsFromServer = await fetchEvents();
      setEvents(EventsFromServer);
    };
    getEvents();
  }, []);   

  // Event methods
  const fetchEvents = async () => {
    const res = await axios.get("https://testapi.photodino.de/events/");
    const data = await res.data;
    return data;
  };

  const createEvent = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .post("https://testapi.photodino.de/events/", formData, config)
      .then((res) => {
        const data = res.data;

        if (sortType === "id2") {
          setEvents([data, ...events]);
        } else {
          setEvents([...events, data]);
        }
      });
  };

  const updateEvent = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .put(`https://testapi.photodino.de/events/${id}/`, data, config)
      .then((res) => {
        const data = res.data;
        setEvents(
          events.map((event) =>
            event.id === id
              ? { ...event, 
                  location: data.location, 
                  event_date: data.event_date, 
                  status: data.status, 
                  name: data.name, 
                  description: data.description }
              : event
          )
        );
      });
  };

  const deleteEvent = async (id) => {
    await axios.delete(`https://testapi.photodino.de/events/${id}/`);
    setEvents(events.filter((event) => event.id !== id));
  };

// Get all locations for Event
  useEffect(() => {
    const getAllLocations = async () => {
      const AllLocationFromServer = await fetchAllLocations();
      setAllLocations(AllLocationFromServer);
    };
    getAllLocations();
  }, [addLocation, showEvents]);

  const fetchAllLocations = async () => {
    const res = await axios.get("https://testapi.photodino.de/locations/");
    const data = await res.data;
    return data;
  };

  
  return (
    <div className='App'>
      <Fragment>
        <Navbar
          setSortType={setSortType}
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          cities={cities}
          setAddCity={setAddCity}
          setCities={setCities}

          setShowEvents={setShowEvents}
          showEvents={showEvents}
          setAddEvent={setAddEvent}
          setEvents={setEvents}
          events={events}
          setSearchEvent={setSearchEvent}
          searchEvent={searchEvent}
        />
        {!showEvents ? (
          <Fragment>
          {addCity && (
            <CityForm
              createCity={createCity}
              updatingCity={updatingCity}
              setUpdatingCity={setUpdatingCity}
              updateCity={updateCity}
              setAddCity={setAddCity}
            />
          )}
          <div className='d-flex flex-column'>
            {addLocation && (
              <LocationForm
                createLocation={createLocation}
                setAddLocation={setAddLocation}
              />
            )}
            {updateLocation.id && (
              <UpdateLocation
                updateLocation={updateLocation}
                updatingLocation={updatingLocation}
                setUpdateLocation={setUpdateLocation}
              />
            )}
          </div>
          <div className='justify-content-center'>
            {loading ? (
              <img
                className='mx-auto'
                src='https://www.icegif.com/wp-content/uploads/loading-icegif-1.gif'
                alt='loading'
              ></img>
            ) : (
              !addLocation &&
              !updateLocation.id &&
              !addCity && (
                <Cities
                  cities={searchCity.searching ? searchCity.cities : cities}
                  deleteCity={deleteCity}
                  setUpdatingCity={setUpdatingCity}
                  fetchLocations={fetchLocations}
                  setCity={setCity}
                  setAddCity={setAddCity}
                  searchCity={searchCity}
                  setSearchCity={setSearchCity}
                />
              )
            )}
            {city.id && !addLocation && !updateLocation.id && (
              <City
                city={city}
                locations={locations}
                setCity={setCity}
                setLocations={setLocations}
                setUpdateLocation={setUpdateLocation}
                setAddLocation={setAddLocation}
                deleteLocation={deleteLocation}
              />
            )}
          </div>{" "}
        </Fragment>      
        ): (
          <Fragment>
            <div className="justify-content-center">
              {addEvent && 
                (<EventForm
                  createEvent={createEvent}
                  setAddEvent={setAddEvent}
                  allLocations={allLocations}
                  updatingEvent={updatingEvent}
                  setUpdatingEvent={setUpdatingEvent}
                  updateEvent={updateEvent}
                  />)
              }              
              {!addEvent && !showEventLocation && (
              <Events
                events={searchEvent.searching ? searchEvent.events : events}
                deleteEvent={deleteEvent}
                setUpdatingEvent={setUpdatingEvent}
                setAddEvent={setAddEvent}
                setShowEventLocation={setShowEventLocation}
                setEvent={setEvent}
                setSearchEvent={setSearchEvent}
                searchEvent={searchEvent}
                />)}
                {showEventLocation && (
                  <Event
                    event={event}
                    allLocations={allLocations}
                    setShowEventLocation={setShowEventLocation}
                    showEventLocation={showEventLocation}/>
                )}
            </div>            
          </Fragment>
        )}
          
      </Fragment>
    </div>
  );
};

export default App;
