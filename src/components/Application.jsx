import React, { useState, useEffect } from "react";
import axios from 'axios'

import DayList from "./DayList";
import Appointment from './Appointment';

import "components/Application.scss";


const appointments = [
  {
    id: 4,
    time: "9am",
    interview: {
      student: "Dasher McQuade",
      interviewer: {
        id: 4,
        name: "Mamoose Frindle",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "11am",
  },
  {
    id: 6,
    time: "11:30am",
    interview: {
      student: "Minus Langpow",
      interviewer: {
        id: 3,
        name: "Noah Baarndoor",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "4pm",
    interview: {
      student: "Bingbong Wazoo",
      interviewer: {
        id: 2,
        name: "Ida Bazout",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];



/****************************************************************************/

const Application = (props) => {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday")

  useEffect(() => {
    axios.get('/api/days').then(res => {
      setDays(res.data);
    })
  }, [])

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
            <DayList days={days} selectedDay={day} onChange={setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointment
            key={appointment.id}
            {...appointment}
          />
        ))}
        {<Appointment key='last' time='5pm' />}
      </section>
    </main>
  );
}

export default Application;
