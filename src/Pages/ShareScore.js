import React, { useRef, useState, useContext } from "react";
import html2canvas from "html2canvas";
import "./Pages.css";
import { Link } from "react-router-dom";
import { ScoreContext } from "../Context/ScoreProvider";
import {
  questions_drag_and_drop,
  questions_multiple_choice,
  questions_reorder,
  questions_two_options,
} from "../Data/questions";
import { teams } from "../Data/teams";
import { frieseWoord } from "../Data/frieseWoord";
import FrisianWord from "../Components/FrisianWord";

function ShareScore() {
  const [selectedTeamIndex] = useState(
    () => localStorage.getItem("selectedTeamIndex") || 0
  );
  const { score, wrongAmount } = useContext(ScoreContext); // Gebruik de context
  const printRef = useRef();

  const selectedTeam = teams[selectedTeamIndex];

  // Functie om ondersteuning voor bestandsshares te checken
  const canShareFiles = () => {
    const mockFile = new File(["test"], "test.txt", { type: "text/plain" });
    return navigator.canShare && navigator.canShare({ files: [mockFile] });
  };
  const questionCount = countQuestions();

  // Functie om afbeelding te delen
  const handleShareImage = async () => {
    const element = printRef.current;

    // Maak een screenshot van het element met html2canvas
    const canvas = await html2canvas(element, { backgroundColor: null });

    // Converteer canvas naar blob
    canvas.toBlob(async (blob) => {
      const file = new File([blob], "score.png", { type: "image/png" });

      // Check of het apparaat bestandsshares ondersteunt
      if (navigator.canShare && canShareFiles()) {
        try {
          await navigator.share({
            title: "Quiz Score",
            text: `We hebben de quiz afgerond, ${score} is de score van Team ${selectedTeam}`,
            files: [file], // Deel de afbeelding
          });
          console.log("Succesvol gedeeld!");
        } catch (error) {
          console.error("Er ging iets mis tijdens het delen:", error);
        }
      } else {
        // Fallback als delen van bestanden niet wordt ondersteund
        alert(
          "Delen wordt niet ondersteund op dit apparaat. Probeer een screenshot te maken."
        );
      }
    }, "image/png");
  };
  const checkWrongAnswers = () => {
    var calculatedErrors = (questionCount.total * 10 - score) / 5;
    var actualErrors = wrongAmount;
    if (calculatedErrors === actualErrors) {
      return actualErrors + " fout";
    } else
      return (
        actualErrors +
        " aantal fouten, maar het lijkt alsof je hebt valsgespeeld..."
      );
  };

  const friezeWoorden = frieseWoord;

  return (
    <div className="content-page circle-bg">
      <h1 className="title-screen">Deel je score!</h1>

      {/* Gedeelte dat als afbeelding wordt gegenereerd */}

      <div ref={printRef} className="score-container quiz-container">
        <h2 className="scorecard-header div1">Score-kaart: {selectedTeam}</h2>
        <div className="div2">Totaal goed:</div>
        <div className="div3">{questionCount.total} vragen</div>
        <div className="div4">Totaal fouten: </div>
        <div className="div5">{checkWrongAnswers()}</div>
        <div className="div6">Totale Score:</div>
        <div className="div7">{score} punten</div>
        <div className="div8">
          <FrisianWord />
        </div>
      </div>

      {/* Share-knop */}
      <button
        type="button"
        className="btn-next-page"
        onClick={handleShareImage}
      >
        Deel Score
      </button>

      <div className=" quiz-container">
        <h1>Score gedeeld?</h1>
        <p>
          Dan mag je de laatste envelop openen! Hopelijk vind je Geheim van de
          Sluiswachter, Doetje van der Sluis!
        </p>
      </div>

      <p>
        Lukt het delen via deze knop niet? Stuur dan een screenshot van je score
        naar Nynke:
        <a href="https://wa.me/+31648813006" target="_blank" rel="noreferrer">
          06 48813006
        </a>
      </p>

      <Link to="/" className="">
        <button type="button">doe quiz opnieuw &#8594; </button>
      </Link>
    </div>
  );
}

export default ShareScore;

export const countQuestions = () => {
  const totalQuestions = {
    twoOptions: questions_two_options.length,
    multipleChoice: questions_multiple_choice.length,
    reorder: questions_reorder.length,
    dragAndDrop: questions_drag_and_drop.length,
  };

  const total =
    totalQuestions.twoOptions +
    totalQuestions.multipleChoice +
    totalQuestions.reorder +
    totalQuestions.dragAndDrop;

  return {
    totalQuestions,
    total,
  };
};
