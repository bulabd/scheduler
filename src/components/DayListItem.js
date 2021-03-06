import React from "react";

import 'components/DayListItem.scss';
import classNames from "classnames";

export default function DayListItem(props) {
  // DayListItem component which represents each day in the navbar
  let itemClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });

  const formatSpots = () => {
    // display the right message according to the amount of spots left
    let message;
    if (props.spots === 0) {
      message = 'no spots remaining';
    } else if (props.spots === 1) {
      message = '1 spot remaining';
    } else {
      message = `${props.spots} spots remaining`;
    }
    return message;
  };

  return (
    <li className={itemClass} onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}