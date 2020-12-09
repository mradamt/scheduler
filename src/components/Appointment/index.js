import React from 'react';
import Header from './Header';
import Show from './Show'
import Empty from './Empty'

import './styles.scss';

import { action } from "@storybook/addon-actions";


const Appointment = (props) => {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? 
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={action('onEdit')}
          onDelete={action('onDelete')}
        /> : 
        <Empty
          onAdd={action("onAdd")}
        />
      }
    </article>
  )
}

export default Appointment;