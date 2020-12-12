import { useReducer, useEffect } from "react";
import axios from 'axios'


const useApplicationData = () => {

  const SET_DAY = 'SET_DAY';
  const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
  const SET_INTERVIEW = 'SET_INTERVIEW';

  const reducer = (state, action) => {
    switch (action.type) {

      case SET_DAY:
        return {
          ...state,
          day: action.day
        }

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }

      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: {...action.interview}
        }
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        }
        return {
          ...state,
          appointments
        }
      }
      
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

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


  const bookInterview = (id, interview) => {
    // const days = updateSpots(id, appointments)
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        console.log('res', res);
        dispatch({type: SET_INTERVIEW, id, interview})
      })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        console.log(res)
        dispatch({type: SET_INTERVIEW, id, interview: null})
      })
  }

  const updateSpots = (appointmentId, appointments) => {
    let daysArrIndex;
    let spots;
    for (const dayObj of state.days) {
      if (dayObj.appointments.includes(appointmentId)) {
        daysArrIndex = dayObj.id - 1;
        spots = dayObj.appointments.filter(id => !appointments[id].interview).length;
        break;
      }
    }
    const dayObj = {
      ...state.days[daysArrIndex],
      spots: spots
    };
    const daysObj = {
      ...state.days,
      [daysArrIndex]: dayObj
    }
    return Object.values(daysObj)
  }

  return ({
    state,
    setDay,
    bookInterview,
    cancelInterview
  })

}

export default useApplicationData;