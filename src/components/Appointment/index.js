import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  // display modes which change with user interaction and display components accordingly
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    // custom hook to update mode
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    // update the interview object with the new interview
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

  function book(student, interviewer) {
    // display saving animation after an interview is booked
    transition(SAVING, true);
    // book interview and update database
    props.bookInterview(props.id, save(student, interviewer))
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function deleteInterview() {
    // display deleting animation after an interview is booked
    transition(DELETING, true);
    // delete interview and update database 
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={(student, interviewer) => {book(student, interviewer)}} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={() => back()} onSave={(student, interviewer) => {book(student, interviewer)}} />}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === CONFIRM && <Confirm message={'Are you sure you would like to delete?'} onCancel={() => transition(SHOW)} onConfirm={() => deleteInterview()} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === ERROR_SAVE && <Error message={'Could not update appointment'} onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message={'Could not cancel appointment'} onClose={() => back()} />}
    </article>
  );
}