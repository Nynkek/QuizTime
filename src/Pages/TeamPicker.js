import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { teams } from "../Data/teams";
import "./Pages.css";

function TeamPicker() {
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(() =>
    parseInt(localStorage.getItem("selectedTeamIndex"), 10)
  );

  const handleTeamSelect = (teamIndex) => {
    setSelectedTeamIndex(teamIndex);
    localStorage.setItem("selectedTeamIndex", teamIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className=".content-page">
        <h1 className="circle-bg page-title">Kies je team:</h1>
        <div className="btn-container">
          {teams.map((team, index) => (
            <button
              key={index}
              onClick={() => handleTeamSelect(index)}
              className={selectedTeamIndex === index ? "selected" : ""}
            >
              Team {team}
            </button>
          ))}
        </div>
        <Link to="/welcome-team" className="link-next-page">
          <button
            type="button"
            className="btn-next-page"
            disabled={selectedTeamIndex === undefined}
          >
            Start &#8594;{" "}
          </button>
        </Link>
      </div>
    </>
  );
}

export default TeamPicker;
