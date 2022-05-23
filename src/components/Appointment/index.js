import React from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from 'hooks/useVisualMode';

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
  }

  function book(student, interviewer) {
    transition(SAVING);
    props.bookInterview(props.id, save(student, interviewer))
      .then(res => {
        transition(SHOW);
        return res;
      });
  }

  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(res => {
        transition(EMPTY);
        return res;
      });
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
    </article>
  );
}