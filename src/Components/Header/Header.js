import React, { useState, useContext } from "react";
import { ScoreContext } from "../../Context/ScoreProvider";
import { teams } from "../../Data/teams";

import "./header.css";

function Header() {
  const [selectedTeamIndex] = useState(
    () => localStorage.getItem("selectedTeamIndex") || 0
  );
  const { score } = useContext(ScoreContext); // Gebruik de context

  const selectedTeam = teams[selectedTeamIndex];
  return (
    <>
      <header className="header">
        <div className="team-name">
          <h3>Team {selectedTeam}</h3>
          {/* <p>vraag 1</p> */}
        </div>
        <div className="score">Score: {score}</div>
      </header>
    </>
  );
}

export default Header;
