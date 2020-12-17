// export const SET_DAY = 'SET_DAY';
export const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
export const SET_INTERVIEW = 'SET_INTERVIEW';

/*
 * Reducer function
 */
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
        interview: action.interview
      }
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      }
      const days = state.days.map(dayObj => {
        if (dayObj.appointments.includes(action.id)) {
          const freeSpotsArr = dayObj.appointments.filter(id => !appointments[id].interview);
          dayObj.spots = freeSpotsArr.length
          return dayObj
        }
        return dayObj
      })
      return {
        ...state,
        appointments,
        days
      }
    }

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;