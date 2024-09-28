import React, { useState, useEffect } from "react";
import { frieseWoord } from "../Data/frieseWoord";

// Definieer de lijst met Friese woorden
export const frieseWoorden = frieseWoord;

const FrisianWord = () => {
  // State om het willekeurige woord op te slaan
  const [randomWoord, setRandomWoord] = useState(null);

  // Functie om een willekeurig woord te kiezen
  const getRandomWoord = () => {
    const randomIndex = Math.floor(Math.random() * frieseWoorden.length);
    return frieseWoorden[randomIndex];
  };

  // useEffect om een willekeurig woord te kiezen bij het laden van de component
  useEffect(() => {
    const woord = getRandomWoord();
    setRandomWoord(woord);
  }, []);

  // Als randomWoord nog niet is ingesteld, geef dan een laadbericht weer
  if (!randomWoord) {
    return <div>Laden...</div>;
  }

  // Render de zin met het willekeurige Friese woord
  return (
    <p>
      Jullie krijgen het favoriete Friese woord van {randomWoord.person} als
      cadeautje voor het meedoen:{" "}
      <strong>{randomWoord.word.toLowerCase()}</strong> (betekent:{" "}
      {randomWoord.meaning.toLowerCase()})!
    </p>
  );
};

export default FrisianWord;
