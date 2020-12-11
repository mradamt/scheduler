import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const ERROR = 'ERROR';

const Appointment = (props) => {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY)

  const save = function (name, interviewer) {
    if (!name || !interviewer) {
      transition(ERROR)
      return
    }
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(res => {
        transition(SHOW)
      })
      .catch(err => {
        console.log(err);
        transition(ERROR)
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      
      {mode === SHOW && <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => console.log('onEdit')}
        onDelete={() => console.log('onDelete')}
      />}
      {mode === EMPTY && <Empty
        onAdd={() => transition(CREATE)}
      />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back}
      />}
      {mode === SAVING && <Status
        message='Saving appointment'
      />}
      {mode === ERROR && <Error  
        message="Could not save appointment."
        onClose={back}
      />}

    </article>
  )
}

export default Appointment;