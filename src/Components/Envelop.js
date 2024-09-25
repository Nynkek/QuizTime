import React, { useState } from "react";

function Envelop({
  correctAnswers,
  nextpage,
  envelopColor,
  answeredCorrectly,
}) {
  const [inputValue, setInputValue] = useState(""); // State om de inputwaarde bij te houden
  const [errors, setErrors] = useState(""); // Errors string om foutmelding te tonen
  const [isAtLocation, setIsAtLocation] = useState(false);

  const checkAnswers = () => {
    const lowerCaseValue = inputValue.toLowerCase().trim(); // Input normaliseren
    if (correctAnswers.includes(lowerCaseValue)) {
      answeredCorrectly();
    } else {
      setErrors("Dit antwoord is fout, probeer opnieuw!"); // Toon foutmelding
    }
  };

  // function LocationClue() {
  //   return (

  //   );
  // }

  // function LocationAnswer() {
  //   return (

  //   );
  // }

  return (
    <>
      {!isAtLocation ? (
        <>
          <h1 className="page-title">Envelop</h1>
          <div className="quiz-container">
            <p className="code-box">
              Je mag de volgende envelop openen! Met de naam:
            </p>
            <code className="digit">{envelopColor}</code>
            <p className="code-box">
              Kom pas weer terug bij deze app als je de volgende code hebt
              ontdekt.
            </p>
          </div>{" "}
          <button
            type="button"
            className="btn-next-page"
            onClick={() => {
              setIsAtLocation(true);
            }}
          >
            We zijn er!
          </button>
        </>
      ) : (
        <>
          <div className="quiz-container">
            <h2>Puzzles van de envelop opgelost?</h2>
            <p className="code-box">Vul je gevonden code in om door te gaan</p>
            <div className="input-widget">
              <input
                max="9999"
                className="input"
                placeholder="0000"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value); // Update de waarde bij input verandering
                  setErrors(""); // Verwijder foutmelding bij verandering
                }}
              />
              <div className="digit-background">
                <div className="digit"></div>
                <div className="digit"></div>
                <div className="digit"></div>
                <div className="digit"></div>
              </div>
            </div>
          </div>
          {errors && (
            <p className="error">{errors}</p> // Toon foutmelding als het antwoord fout is
          )}

          <button
            type="button"
            className="btn-next-page"
            disabled={!inputValue.trim()} // Disable knop als input leeg is
            onClick={checkAnswers}
          >
            Indienen &#8594;
          </button>
        </>
      )}
    </>
  );
}

export default Envelop;
