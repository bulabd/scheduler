import React from "react";

export default function Header(props) {
  // header component which displays the time of each appointment
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}