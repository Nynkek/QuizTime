import React from "react";

function GroupPicture({ opdracht, didPressButton }) {
  return (
    <>
      <h1 className="page-title">Groepsfoto!</h1>
      <div className="quiz-container">
        <p>Maak een groepsfoto met de locatie op de achtergrond.</p>
        <h2>
          <strong>Extra punten:</strong>
        </h2>
        <p>{opdracht}</p>
        <h2>Stuur de foto naar Nynke</h2>
        <p>
          Dit kan het beste met een andere mobiel, naar:{" "}
          <a href="https://wa.me/+31648813006">06 48813006</a>.
        </p>
      </div>
      <button type="button" className="btn-next-page" onClick={didPressButton}>
        Mijn team heeft een foto gestuurd naar Nynke &#8594;
      </button>
    </>
  );
}

export default GroupPicture;
