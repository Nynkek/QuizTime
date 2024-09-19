import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './TeamPicker.css';
import './Pages.css';

function TeamPicker() {
    const teams = ["Team A", "Team B", "Team C", "Team D", "Team E"];
    const [selectedTeam, setSelectedTeam] = useState("");

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

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className='.content-page'>
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


                </div>
                <Link to="/welcome-team" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Start &#8594; </button>
                </Link>

            </div>

        </>
    );
}



export default TeamPicker;