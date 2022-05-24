import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateSpots(newStateAppointments) {
    return state.days.map((day) => {
      let counter = 0;
      for (let appointment of day.appointments) {
        if (!newStateAppointments[appointment].interview) {
          counter++;
        }
      }
      return {...day, spots: counter};
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let updatedDays = updateSpots(appointments);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(res => {
          setState({...state, appointments, days: updatedDays});
          return res;
        }
      );
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    let updatedDays = updateSpots(appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        setState({...state, appointments, days: updatedDays});
        return res;
      });
  }

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