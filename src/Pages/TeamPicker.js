import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { teams } from "../Data/teams";
import "./Pages.css";

function TeamPicker() {
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(() =>
    localStorage.getItem("selectedTeamIndex")
  );

  const handleTeamSelect = (teamIndex) => {
    setSelectedTeamIndex(teamIndex);
    localStorage.setItem("selectedTeamIndex", teamIndex);
  };

  console.log(selectedTeamIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="content-page">
        <div className="content">
          <h1 className="circle-bg page-title">Kies je team:</h1>
          <div className="btn-container">
            {teams.map((team, index) => (
              <button
                key={index}
                onClick={() => handleTeamSelect(index)}
                className={
                  parseInt(selectedTeamIndex, 10) === index ? "selected" : ""
                }
              >
                Team {team}
              </button>
            ))}
          </div>
          <Link to="/welcome-team" className="link-next-page">
            <button
              type="button"
              className="btn-next-page"
              disabled={selectedTeamIndex === null}
            >
              Start &#8594;{" "}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default TeamPicker;
