import React, { useContext, useState, useEffect } from "react";
import { ScoreContext } from "../Context/ScoreProvider";

export default function ScoreAnimationComponent() {
  const { score } = useContext(ScoreContext); // Gebruik de context
  const [showsAnimation, setShowsAnimation] = useState(false);

  const [latestScore, setLatestScore] = useState(() => score);
  const [scoreDifference, setScoreDifference] = useState(0);

  useEffect(() => {
    if (score === latestScore) {
      return;
    }
    setScoreDifference(score - latestScore);
    setLatestScore(score);

    setShowsAnimation(true);
    const timeout = setTimeout(() => {
      setShowsAnimation(false);
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const isPositive = scoreDifference > 0;

  return (
    <div className={`animation-overlay ${showsAnimation ? "visible" : ""}`}>
      <div
        className={`score-container ${isPositive ? "positive" : "negative"}`}
      >
        <h1>{scoreDifference}</h1>
      </div>
    </div>
  );
}
