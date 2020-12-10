const getAppointmentsForDay = (state, day) => {
  const dayObj = state.days.filter(obj => obj.name === day);

  if (!dayObj.length) return []
    
  const appointmentsForDay = dayObj[0].appointments.map(id => state.appointments[id])

  return appointmentsForDay;
}

const getInterview = (state, interview) => {
}

export {
  getAppointmentsForDay,
  getInterview,
};