import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // useApplicationData custom hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateSpots(newStateAppointments) {
    // maps through the days and return the days array with the updated spots using the new appointments
    return state.days.map((day) => {
      let counter = 0;
      for (let appointment of day.appointments) {
        // if the interview is null, increment the counter which is the amount of spots left
        if (!newStateAppointments[appointment].interview) {
          counter++;
        }
      }
      return {...day, spots: counter};
    });
  }

  function bookInterview(id, interview) {
    // books an interview by updating an appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    // update the appointments obj using the new appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // update the spots using the updateSpots function and the new appointments obj
    let updatedDays = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
          // update the state with the new appointments obj and days array
          setState({...state, appointments, days: updatedDays});
          return res;
        }
      );
  }

  function cancelInterview(id) {
    // cancels an interview by updating an appointment
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    // update the appointments obj using the new appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // update the spots using the updateSpots function and the new appointments obj
    let updatedDays = updateSpots(appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({...state, appointments, days: updatedDays});
        return res;
      });
  }

  // function used to setDay when the user selects another day
  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);
  
  return { state, setState, setDay, bookInterview, cancelInterview };
}