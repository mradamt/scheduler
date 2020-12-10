const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.filter(obj => obj.name === day);
  if (!dayObj.length) return []
  const appointmentsForDay = dayObj[0].appointments.map(id => state.appointments[id])

  return appointmentsForDay;
}

const getInterview = (state, interview) => {
  if (!interview) return null;
  const id = interview.interviewer;
  const interviewVerbose = {
    ...interview,
    interviewer: state.interviewers[id]
    
  }
  return interviewVerbose;
}

export {
  getAppointmentsForDay,
  getInterview,
};