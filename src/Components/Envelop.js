import React, { useState } from "react";

function Envelop({ envelop, answeredCorrectly }) {
  const [inputValue, setInputValue] = useState(""); // State om de inputwaarde bij te houden
  const [errors, setErrors] = useState(""); // Errors string om foutmelding te tonen
  const [isAtLocation, setIsAtLocation] = useState(false);

  const checkAnswers = () => {
    const lowerCaseValue = inputValue.toLowerCase().trim(); // Input normaliseren
    if (envelop.answer_options.includes(lowerCaseValue)) {
      answeredCorrectly();
    } else {
      setErrors("Dit antwoord is fout, probeer opnieuw!"); // Toon foutmelding
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    checkAnswers();
  }

  return (
    <>
      {!isAtLocation ? (
        <>
          <h1 className="page-title">Envelop</h1>
          <div className="quiz-container">
            <p className="code-box">Je mag de envelop openen! Met de naam:</p>
            <code className="digit">{envelop.color}</code>
            <p className="code-box">
              Kom pas weer terug bij deze app als jullie bij de volgende locatie
              zijn.
            </p>
          </div>
          <button
            type="button"
            className="btn-next-page"
            onClick={() => {
              setIsAtLocation(true);
            }}
          >
            We zijn er &#8594;
          </button>
        </>
      ) : (
        <>
          <h1 className="page-title">Vraag voor locatie {envelop.location}</h1>

          <div className="quiz-container">
            <h2>{envelop.question}</h2>
            <p className="code-box">Antwoord:</p>
            <form onSubmit={handleSubmit}>
              <input
                max="9999"
                className="invoerveld"
                placeholder="????"
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
                enterKeyHint="send"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value); // Update de waarde bij input verandering
                  setErrors(""); // Verwijder foutmelding bij verandering
                }}
              />
            </form>
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
