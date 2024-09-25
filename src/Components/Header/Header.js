import React, { useState, useEffect, useContext } from "react";
import { ScoreContext } from "../../Context/ScoreProvider";

import "./header.css";

function Header() {
  const [selectedTeam, setSelectedTeam] = useState(
    () => localStorage.getItem("selectedTeam") || ""
  );
  const { score } = useContext(ScoreContext); // Gebruik de context

  return (
    <>
      <header className="header">
        <div className="team-name">
          <h3>{selectedTeam}</h3>
          <p>vraag 1</p>
        </div>
        <div className="score">Score: {score}</div>
      </header>
    </>
  );
}

export default Header;
