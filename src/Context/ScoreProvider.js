import React, { createContext, useState, useEffect } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [score, setScore] = useState(() => {
        const savedScore = parseInt(localStorage.getItem('quizScore'), 10);
        return savedScore || 0;
    });

    useEffect(() => {
        localStorage.setItem('quizScore', score);
    }, [score]);

    return (
        <ScoreContext.Provider value={{ score, setScore }}>
            {children}
        </ScoreContext.Provider>
    );
};
