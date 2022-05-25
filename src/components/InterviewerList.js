import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  // InterviewerList component which displays the available interviewers for a certain appointment
  const interviewers = props.interviewers.map((interviewer) => {
    // create an array of interviewers
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
}

// require the interviewers to be an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};