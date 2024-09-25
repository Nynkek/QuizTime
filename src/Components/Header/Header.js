import React, { useState, useContext } from "react";
import { ScoreContext } from "../../Context/ScoreProvider";
import { teams } from "../../Data/teams";

import "./header.css";

function Header() {
  const selectedTeam = useState(
    () => localStorage.getItem("selectedTeam") || ""
  );
  const { score } = useContext(ScoreContext); // Gebruik de context

  return (
    <>
      <header className="header">
        <div className="team-name">
          <h3>
            {selectedTeam} ({teams.indexOf(selectedTeam)})
          </h3>
          <p>vraag 1</p>
        </div>
        <div className="score">Score: {score}</div>
      </header>
    </>
  );
}

export default Header;
