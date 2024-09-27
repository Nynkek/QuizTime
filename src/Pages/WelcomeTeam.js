import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";
import { teams } from "../Data/teams";

function WelcomeTeam() {
  const [selectedTeamIndex] = useState(
    () => parseInt(localStorage.getItem("selectedTeamIndex"), 10) || 0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedTeam = teams[selectedTeamIndex];

  return (
    <>
      <div className="content-page">
        <h1 className="circle-bg page-title">Welkom Team {selectedTeam}!</h1>
        <div className="content">
          <ol>
            <li>Gebruik steeds dezelfde telefoon voor de quiz</li>
            <li>Beantwoord de vragen samen met je team</li>
            <li>
              Je score wordt bijgehouden, dus denk goed na over de antwoorden
            </li>
            <li>
              Je mag de volgende envelop pas openen als je het codewoord hebt
            </li>
            <li>
              De route is in totaal zo'n 2km lopen, het avontuur duurt ongeveer
              een uur.
            </li>

            <li>
              Bij vragen kun je Nynke een bericht sturen{" "}
              <a
                href="https://wa.me/+31648813006"
                target="_blank"
                rel="noreferrer"
              >
                06 48813006
              </a>
            </li>
          </ol>
        </div>
        <Link to="/startQuiz" className="link-next-page">
          <button type="button" className="btn-next-page">
            Start quiz &#8594;{" "}
          </button>
        </Link>
      </div>
    </>
  );
}

export default WelcomeTeam;
