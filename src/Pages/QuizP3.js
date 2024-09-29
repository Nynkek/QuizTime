import React, { useEffect } from "react";
import Header from "../Components/Header/Header";
import "./Pages.css";
import ListReorder from "../Components/Quiz/ListReorder";

function QuizP3({ nextPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="content-page">
        <div className="content">
          <h1 className="page-title">Zet in de juiste volgorde</h1>
          <p>Sleep de namen naar de juiste volgorde</p>
          <ListReorder nextpage={nextPage} />
        </div>
      </div>
    </>
  );
}

export default QuizP3;
