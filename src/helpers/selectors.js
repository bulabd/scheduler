export function getAppointmentsForDay(state, day) {
  if (!state.days.length) {
    return [];
  }
  let appointmentsArray = state.days.filter(x => x.name === day) || [];
  if (appointmentsArray.length === 0) {
    return [];
  } else {
    appointmentsArray = appointmentsArray[0].appointments;
  }

  let finalAppointmentsArray = [];
  for (let appointment of appointmentsArray) {
    if (appointment in state.appointments) {
      finalAppointmentsArray.push(state.appointments[appointment]);
    }
  }
  return finalAppointmentsArray;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let newObj = {...interview};
  newObj.interviewer = state.interviewers[interview.interviewer];
  return newObj;
}

export function getInterviewersForDay(state, day) {
  if (!state.days.length) {
    return [];
  }
  let interviewersArray = state.days.filter(x => x.name === day) || [];
  if (interviewersArray.length === 0) {
    return [];
  } else {
    interviewersArray = interviewersArray[0].interviewers;
  }

  let finalInterviewersArray = [];
  for (let interviewer of interviewersArray) {
    if (interviewer in state.interviewers) {
      finalInterviewersArray.push(state.interviewers[interviewer]);
    }
  }
  return finalInterviewersArray;
}



// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 2]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [1, 2]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//      "name": "Sylvia Palmer",
//      "avatar": "https://i.imgur.com/LpaY82x.png"
//    },
//    "2": {
//      id: 2,
//      name: "Tori Malcolm",
//      avatar: "https://i.imgur.com/Nmx0Qxo.png"
//    }
//  }
// };