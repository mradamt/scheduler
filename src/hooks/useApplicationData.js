import { useReducer, useEffect } from "react";
import axios from 'axios'

import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from 'reducers/application'


const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({type: SET_DAY, day});

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then(([apiDays, apiAppointments, apiInterviewers]) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: apiDays.data,
        appointments: apiAppointments.data,
        interviewers: apiInterviewers.data
      });
    })
  }, [])

  useEffect(() => {
    const webSocket = new WebSocket('ws://localhost:8001');

    // Confirm sucessful websocket connection
    // webSocket.onopen = event => {
    //   webSocket.send('ping')
    // }

    // Update interviews in local state if server updates
    webSocket.onmessage = event => {
      const {type, id, interview} = JSON.parse(event.data)

      if (type === "SET_INTERVIEW") {
        dispatch({
          type,
          id,
          interview
        })
      }
    }

    return () => webSocket.close();
  }, [])

  const bookInterview = (id, interview) => {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        dispatch({type: SET_INTERVIEW, id, interview})
      })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        dispatch({type: SET_INTERVIEW, id, interview: null})
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