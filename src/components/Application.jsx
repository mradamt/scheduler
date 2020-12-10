import React, { useState, useEffect } from "react";
import axios from 'axios'

import DayList from "./DayList";
import Appointment from './Appointment';
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';

import "components/Application.scss";


const Application = (props) => {
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

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList 
              days={state.days}
              selectedDay={state.day}
              onChange={setDay} 
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => {
          const interview = getInterview(state, appointment.interview)
          return (<Appointment
            key={appointment.id}
            {...appointment}
            interview={interview}
          />
        )})}
        {<Appointment key='last' time='5pm' />}
      </section>
    </main>
  );
}

export default Application;