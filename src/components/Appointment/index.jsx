import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
// import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

import { action } from "@storybook/addon-actions";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = (props) => {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(interview);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      
      {mode === SHOW && <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={action('onEdit')}
        onDelete={action('onDelete')}
      />}
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}

    </article>
  )
}

export default Appointment;