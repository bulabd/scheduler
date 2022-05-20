import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if (replace === true) {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
      setMode(newMode);
      return;
    }
    setHistory([...history, newMode]);
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, history.length - 1)]);
      setMode(history[history.length - 2]);
    }
  }

  return { mode, transition, back };
}