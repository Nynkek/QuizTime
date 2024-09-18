import React, { useState, useEffect } from 'react';
import "./header.css";

function Header() {
    const [selectedTeam, setSelectedTeam] = useState("");

    useEffect(() => {
        const savedTeam = localStorage.getItem("selectedTeam");
        if (savedTeam) {
            setSelectedTeam(savedTeam);
        }
    }, []);

    return (
        <>
            <header className="header">
                <div className="team-name">
                    <h3>{selectedTeam}</h3>
                    <p>vraag 1</p>
                </div>
                <div className="score">
                    45 punten
                </div>
            </header>

        </>
    );
}

export default Header;