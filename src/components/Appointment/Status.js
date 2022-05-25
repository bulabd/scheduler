import React from "react";

export default function Status(props) {
  // status component which renders when an appointment is created, updated, deleted and displays a message accordingly
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}