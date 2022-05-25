import React, { useState } from "react";

export default function useVisualMode(initial) {
  // useVisualMode custom hook to transit between modes
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    // if replace is true, replace the previous mode with current one so that if an error occurs while creating, updating or deleting an appointment, the user is brought back to viewing the interview
    if (replace === true) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
      setMode(newMode);
      return;
    }
    setHistory([...history, newMode]);
    setMode(newMode);
  }

  function back() {
    // prevent user to erase the modes history if it has a lenght of only 1
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, history.length - 1)]);
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}