import React from "react";
import 'components/InterviewerListItem.scss';
import classNames from "classnames";

export default function InterviewerListItem(props) {
  // InterviewerListItem component which displays each available interviewer
  const itemClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        />
      {props.selected && props.name}
    </li>
  );
}