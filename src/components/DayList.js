import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // DayList component which renders the list of days in the navbar with the available spots
  const days = props.days.map((day) => {
    // create an array of days
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}