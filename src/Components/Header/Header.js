import React, { useState, useEffect } from 'react';
import "./header.css";

function Header() {
    const [selectedTeam, setSelectedTeam] = useState("");
    const [score, setScore] = useState(parseInt(localStorage.getItem('quizScore'), 10));


    useEffect(() => {
        const savedTeam = localStorage.getItem("selectedTeam");
        if (savedTeam) {
            setSelectedTeam(savedTeam);
        }
        const savedScore = parseInt(localStorage.getItem('quizScore'), 10);
        if (savedScore) {
            setScore(savedScore);
        }

    }, [score]);



    return (
        <>
            <header className="header">
                <div className="team-name">
                    <h3>{selectedTeam}</h3>
                    <p>vraag 1</p>
                </div>
                <div className="score">
                    Score: {score}
                </div>
            </header>

        </>
    );
}

export default Header;