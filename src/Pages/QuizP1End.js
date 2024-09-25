import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import "./Pages.css";
import { villa_envelop } from "../Data/envelopQuestions";
import GroupPicture from "../Components/GroupPicture";
import Envelop from "../Components/Envelop";

function QuizP1End() {
  const nextpage = "/quiz2";
  const [pictureTaken, setPictureTaken] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pictureTaken]);

  const handleButtonPress = () => {
    setPictureTaken(true);
  };

  const opdracht =
    "Zoek de mooiste bladeren uit en laat die zien! Leg ze na de foto in een mooi patroon, zodat de volgende groep ze opvalt.";
  return (
    <>
      <Header />

      <div className="content-page low-circle-bg">
        <div className="content">
          {!pictureTaken && (
            <GroupPicture
              location={1}
              opdracht={opdracht}
              hide={handleButtonPress}
            />
          )}
          {pictureTaken && (
            <Envelop
              correctAnswers={villa_envelop}
              nextpage={nextpage}
              envelopColor="groen"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default QuizP1End;
