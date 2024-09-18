import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './TeamPicker.css';
import './Pages.css';

function TeamPicker() {
    const teams = ["Team A", "Team B", "Team C", "Team D", "Team E"];
    const [selectedTeam, setSelectedTeam] = useState("");

    // Functie om het geselecteerde team op te slaan in de localStorage
    const handleTeamSelect = (team) => {
        setSelectedTeam(team);
        localStorage.setItem("selectedTeam", team);
    };

    useEffect(() => {
        const savedTeam = localStorage.getItem("selectedTeam");
        if (savedTeam) {
            setSelectedTeam(savedTeam);
        }
    }, []);

    return (
        <>
            <h1 className='circle-bg'>Kies je team:</h1>
            <div className="btn-container">
                {teams.map((team, index) => (
                    <button
                        key={index}
                        onClick={() => handleTeamSelect(team)}
                        className={selectedTeam === team ? "selected" : ""}
                    >
                        {team}
                    </button>
                ))}

                <Link to="/welcome-team">
                    <button type='button' className='btn-next-page'>Start &#8594; </button>
                </Link>
            </div>



        </>
    );
}



export default TeamPicker;