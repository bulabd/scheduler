import React from "react";

export default function Empty(props) {
  // empty component (button) which displays if no appointment is taken at a specific time
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}