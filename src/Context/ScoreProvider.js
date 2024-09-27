import React, { createContext, useState, useEffect } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(() => {
    const savedScore = parseInt(localStorage.getItem("quizScore"), 10);
    return savedScore || 0;
  });
  const [wrongAmount, setWrongAmount] = useState(() => {
    const savedWrongAmount = parseInt(localStorage.getItem("wrongAmount"), 10);
    return savedWrongAmount || 0;
  });

  useEffect(() => {
    localStorage.setItem("quizScore", score);
    localStorage.setItem("wrongAmount", wrongAmount);
  }, [score, wrongAmount]);

  return (
    <ScoreContext.Provider
      value={{ score, setScore, wrongAmount, setWrongAmount }}
    >
      {children}
    </ScoreContext.Provider>
  );
};
