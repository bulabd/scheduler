export function getAppointmentsForDay(state, day) {
  // return an array of appointments for a day
  if (!state.days.length) {
    return [];
  }

  // get the array of appointments' ids
  let appointmentsArray = state.days.filter(singleDay => singleDay.name === day) || [];
  if (appointmentsArray.length === 0) {
    return [];
  } else {
    appointmentsArray = appointmentsArray[0].appointments;
  }

  // use the array of appointments' ids to return an array of appointments with every detail for each
  let finalAppointmentsArray = [];
  for (let appointment of appointmentsArray) {
    if (appointment in state.appointments) {
      finalAppointmentsArray.push(state.appointments[appointment]);
    }
  }
  return finalAppointmentsArray;
}

export function getInterview(state, interview) {
  // receive the interview obj with the interviewer id and return the same object but with all the interviewer details
  if (!interview) {
    return null;
  }
  let newInterview = {...interview};
  // use interviewer id to fetch interviewer details
  newInterview.interviewer = state.interviewers[interview.interviewer];
  return newInterview;
}

export function getInterviewersForDay(state, day) {
  // return an array of interviewers available for a day
  if (!state.days.length) {
    return [];
  }
  // get the array of interviewers' ids
  let interviewersArray = state.days.filter(x => x.name === day) || [];
  if (interviewersArray.length === 0) {
    return [];
  } else {
    interviewersArray = interviewersArray[0].interviewers;
  }

  // use the array of interviewers' ids to return an array of interviewers with every detail for each
  let finalInterviewersArray = [];
  for (let interviewer of interviewersArray) {
    if (interviewer in state.interviewers) {
      finalInterviewersArray.push(state.interviewers[interviewer]);
    }
  }
  return finalInterviewersArray;
}
