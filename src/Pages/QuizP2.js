import React, { useEffect } from "react";
import Header from "../Components/Header/Header";
import "./Pages.css";
import MultipleChoice from "../Components/Quiz/MultipleChoice";

function QuizP2({ nextPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="content-page">
        <div className="content">
          <h1 className="page-title">Meerdere opties mogelijk</h1>
          <p>Selecteer de juiste mensen (meervoud!)</p>

          <MultipleChoice nextpage={nextPage} />
        </div>
      </div>
    </>
  );
}

export default QuizP2;
