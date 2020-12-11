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

const getInterviewersForDay = (state, day) => {
  const dayObj = state.days.filter(obj => obj.name === day);
  if (!dayObj.length) return []
  const interviewers = dayObj[0].interviewers.map(id => state.interviewers[id])
  return interviewers;
}

export {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
};