import React, { useState, useContext } from "react";
import { ScoreContext } from "../../Context/ScoreProvider";
import { teams } from "../../Data/teams";

import "./header.css";

function Header() {
  const [selectedTeamIndex] = useState(
    () => parseInt(localStorage.getItem("selectedTeamIndex"), 10) || 0
  );
  const { score } = useContext(ScoreContext); // Gebruik de context

  const selectedTeam = teams[selectedTeamIndex];
  return (
    <>
      <header className="header">
        <div className="team-name">
          <h3>
            Team <br />
            {selectedTeam}
          </h3>
          {/* <p>vraag 1</p> */}
        </div>
        <div className="score">
          Score:
          <br /> {score}
        </div>
      </header>
    </>
  );
}

export default Header;
