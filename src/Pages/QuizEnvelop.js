import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import "./Pages.css";
import { envelops, teamOrder } from "../Data/envelopQuestions";
import GroupPicture from "../Components/GroupPicture";
import Envelop from "../Components/Envelop";

export default function QuizEnvelop({ index, next }) {
  const [isPictureTime, setIsPictureTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPictureTime]);

  const answeredCorrectly = () => {
    setIsPictureTime(true);
  };

  const handlePictureSent = () => {
    navigate(next);
  };

  const selectedTeamIndex = localStorage.getItem("selectedTeamIndex");

  const envelopIndex = teamOrder[selectedTeamIndex][index];
  const envelop = envelops[envelopIndex];

  return (
    <>
      <Header />

      <div className="content-page low-circle-bg">
        <div className="content">
          {!isPictureTime ? (
            <Envelop
              correctAnswers={envelop.answer_options}
              envelopColor={envelop.color}
              answeredCorrectly={answeredCorrectly}
            />
          ) : (
            <GroupPicture
              opdracht={envelop.photoPrompt}
              didPressButton={handlePictureSent}
            />
          )}
        </div>
      </div>
    </>
  );
}
