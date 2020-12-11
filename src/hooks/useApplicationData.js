import { useState, useEffect } from "react";
import axios from 'axios'


const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(([apiDays, apiAppointments, apiInterviewers]) => {
      setState(prev => ({
        ...prev,
        days: apiDays.data,
        appointments: apiAppointments.data,
        interviewers: apiInterviewers.data
      }));
    })
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        console.log('res', res);
        setState({
          ...state,
          appointments
        })
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        console.log(res)
        setState({
          ...state,
          appointments
          })
      })
  }

  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview
  })

}

export default useApplicationData;