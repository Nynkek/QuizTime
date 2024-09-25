import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import "./Pages.css";
import { envelops, teamOrder } from "../Data/envelopQuestions";
import { teams } from "../Data/teams";
import GroupPicture from "../Components/GroupPicture";
import Envelop from "../Components/Envelop";

export default function QuizEnvelop({ index, next }) {
  const [pictureTaken, setPictureTaken] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pictureTaken]);

  const handleButtonPress = () => {
    setPictureTaken(true);
  };

  const selectedTeamName = localStorage.getItem("selectedTeam");
  const teamIndex = teams.indexOf(selectedTeamName);

  const envelopIndex = teamOrder[teamIndex][index];
  const envelop = envelops[envelopIndex];

  return (
    <>
      <Header />

      <div className="content-page low-circle-bg">
        <div className="content">
          {!pictureTaken && (
            <GroupPicture
              opdracht={envelop.photoPrompt}
              didPressButton={handleButtonPress}
            />
          )}
          {pictureTaken && (
            <Envelop
              correctAnswers={envelop.answer_options}
              nextpage={next}
              envelopColor={envelop.color}
            />
          )}
        </div>
      </div>
    </>
  );
}
