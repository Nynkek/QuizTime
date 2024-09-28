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
        <p className="opdracht">{opdracht}</p>

        <h3>Stuur de foto naar Nynke</h3>
        <p>
          Dit kan het beste met een andere mobiel, naar:{" "}
          <a href="https://wa.me/+31648813006">06 48813006</a>.
        </p>
      </div>
      <button type="button" className="btn-next-page" onClick={didPressButton}>
        Foto is gestuurd &#8594;
      </button>
      <div className="quiz-container">
        <h4>Punten voor groepsfoto?</h4>
        <p>
          Nynke berekent op het einde de punten van alle groepsfoto's en telt
          die bij je score op. Ze houdt rekenening met: staat de locatie erop,
          is de opdracht erin verwerkt, staan veel groepsgenoten erop en is het
          creatief?
        </p>
      </div>
    </>
  );
}

export default GroupPicture;
