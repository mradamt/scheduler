import React from "react";

import useApplicationData from 'hooks/useApplicationData';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import DayList from "./DayList";
import Appointment from './Appointment';

import "components/Application.scss";


const Application = (props) => {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData()
  
  const interviewers = getInterviewersForDay(state, state.day);


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
            interviewers={dailyInterviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        )})}
        {<Appointment key='last' time='5pm' />}
      </section>
    </main>
  );
}

export default Application;
