import React, { useState, useContext, useEffect, useCallback } from "react";
import { ScoreContext } from "../../Context/ScoreProvider";
import { useNavigate } from "react-router-dom";
import { questions_multiple_choice } from "../../Data/questions";

function MultipleChoice({ nextpage }) {
  const [answers, setAnswers] = useState({});
  const [allAnswered, setAllAnswered] = useState(false);
  const [errors, setErrors] = useState([]);

  const { score, setScore } = useContext(ScoreContext);
  const { wrongAmount, setWrongAmount } = useContext(ScoreContext);

  const navigate = useNavigate();

  // Laad antwoorden vanuit localStorage wanneer de component wordt geladen
  useEffect(() => {
    const savedAnswers = localStorage.getItem("quizAnswers_mc");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Functie om antwoord voor een vraag op te slaan en in localStorage te bewaren
  const handleAnswerSelection = (questionIndices, selectedAnswerIndex) => {
    const updatedAnswers = { ...answers };

    // Zorg ervoor dat de antwoorden voor deze vraag altijd een array zijn
    if (!Array.isArray(updatedAnswers[questionIndices])) {
      updatedAnswers[questionIndices] = [];
    }

    // Check of het geselecteerde antwoord al is gekozen (toggle)
    if (updatedAnswers[questionIndices].includes(selectedAnswerIndex)) {
      // Deselecteren
      updatedAnswers[questionIndices] = updatedAnswers[questionIndices].filter(
        (answer) => answer !== selectedAnswerIndex
      );
    } else {
      // Anders selecteren
      updatedAnswers[questionIndices].push(selectedAnswerIndex);
    }

    setAnswers(updatedAnswers);
    localStorage.setItem("quizAnswers_mc", JSON.stringify(updatedAnswers)); // Sla de antwoorden op in localStorage
  };

  // Controleer of er minimaal één antwoord is geselecteerd voor een vraag
  const hasAnsweredQuestion = useCallback(
    (questionIndex) => {
      return answers[questionIndex] && answers[questionIndex].length > 0;
    },
    [answers]
  ); // Voeg `answers` toe als dependency

  // Controleer of alle vragen zijn beantwoord
  useEffect(() => {
    const allAnsweredCheck = questions_multiple_choice.every(
      (_, questionIndex) => hasAnsweredQuestion(questionIndex)
    );
    setAllAnswered(allAnsweredCheck);
  }, [answers, hasAnsweredQuestion]);

  // Vergelijk arrays om te controleren of de gegeven antwoorden juist zijn
  const arraysEqual = (arr1, arr2) => {
    return (
      arr1.length === arr2.length &&
      arr1.every((val) => arr2.includes(val)) &&
      arr2.every((val) => arr1.includes(val))
    );
  };

  // Valideer de antwoorden en update de score
  const checkAnswers = () => {
    let tempScore = score;
    let newWrongAmount = wrongAmount;

    const newErrors = [];

    questions_multiple_choice.forEach((question, index) => {
      const userAnswers = answers[index] || [];

      // Controleer of de gegeven antwoorden overeenkomen met de correcte antwoorden
      if (!arraysEqual(userAnswers, question.answer_index)) {
        newErrors[index] = true;
        tempScore -= 5;
        newWrongAmount++;
      } else {
        newErrors[index] = false;
      }
    });

    setErrors(newErrors); // Update de errors state

    if (newErrors.every((error) => error === false)) {
      tempScore += questions_multiple_choice.length * 10; // +10 per goed antwoord
    }

    setScore(tempScore);
    setWrongAmount(newWrongAmount);

    if (newErrors.every((error) => error === false)) {
      navigate(nextpage);
    }
  };

  return (
    <div className="puzzle-multiple-choice">
      {questions_multiple_choice.map((question, questionIndex) => (
        <div key={questionIndex}>
          {/* Controleer of de vorige vraag is beantwoord voordat deze vraag wordt getoond */}
          {questionIndex === 0 || hasAnsweredQuestion(questionIndex - 1) ? (
            <>
              <div className="quiz-container">
                <h3>{question.title}</h3>
                <h3>
                  <strong>{question.focused_word}</strong>
                </h3>
                <ul>
                  {question.q_options.map((q_option, optionIndex) => (
                    <li key={optionIndex}>
                      <input
                        type="checkbox"
                        id={`question${questionIndex}_option${optionIndex}`}
                        name={`question${questionIndex}`}
                        value={q_option}
                        checked={
                          answers[questionIndex] &&
                          answers[questionIndex].includes(optionIndex)
                        }
                        onChange={() =>
                          handleAnswerSelection(questionIndex, optionIndex)
                        }
                      />
                      <label
                        htmlFor={`question${questionIndex}_option${optionIndex}`}
                      >
                        {q_option}
                      </label>
                    </li>
                  ))}
                </ul>
                {/* Toon foutmelding onder de vraag als deze fout is beantwoord */}
                {errors[questionIndex] && (
                  <p className="error">
                    Dit antwoord is fout, probeer opnieuw! Er kunnen meerdere
                    antwoorden goed zijn.
                  </p>
                )}
              </div>
            </>
          ) : null}
        </div>
      ))}

      <button
        type="button"
        className="btn-next-page"
        onClick={checkAnswers}
        disabled={!allAnswered}
      >
        Submit &#8594;
      </button>
    </div>
  );
}

export default MultipleChoice;
