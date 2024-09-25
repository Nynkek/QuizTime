import React, { useState, useEffect, useContext } from "react";
import { ScoreContext } from "../../Context/ScoreProvider";

import "./header.css";

function Header() {
  const [selectedTeam, setSelectedTeam] = useState("");
  const { score } = useContext(ScoreContext); // Gebruik de context

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
          {/* <p>vraag 1</p> */}
        </div>
        <div className="score">
          <p>Score:</p> <p>{score}</p>
        </div>
      </header>
    </>
  );
}

export default Header;
