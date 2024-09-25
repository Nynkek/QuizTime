import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ScoreContext } from "../../Context/ScoreProvider";
import { useNavigate } from "react-router-dom";
import "./Quiz.css"; // CSS importeren
import { questions_drag_and_drop } from "../../Data/questions";

// Functie om een lijst opnieuw te ordenen binnen hetzelfde gebied
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Functie om items van het ene gebied naar het andere te verplaatsen
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

function MatchValues({ value, index }) {
  return (
    <Draggable draggableId={`${value}-${index}`} index={index}>
      {(provided) => (
        <div
          className="match-value-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {value}
        </div>
      )}
    </Draggable>
  );
}

const MatchValuesList = React.memo(function MatchValuesList({ values }) {
  const safeValues = values || [];
  return safeValues.map((value, index) => (
    <MatchValues value={value} index={index} key={`${value}-${index}`} />
  ));
});

const arraysEqual = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index])
  );
};

function Question({ question, questionIndex, state, onDragEnd, error }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="question-section">
        <h2>{question.title}</h2>
        <div className="droppable-container droppable-container-answer-options">
          {question.answer_options.map((answerOption, index) => (
            <Droppable
              key={`droppable-${questionIndex}-${index + 2}`}
              droppableId={`droppable-${questionIndex}-${index + 2}`}
            >
              {(provided) => (
                <div className="droppable-container-answer-options-container">
                  <div
                    className="droppable-area droppable-area-answer-options"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <MatchValuesList
                      values={state[`droppable-${questionIndex}-${index + 2}`]}
                    />
                    {provided.placeholder}
                  </div>
                  <div className="droppable-area-description">
                    {answerOption}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>

        <div className="droppable-container droppable-container-names">
          <Droppable droppableId={`droppable-${questionIndex}-1`}>
            {(provided) => (
              <div
                className="droppable-area droppable-area-names"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <MatchValuesList
                  values={state[`droppable-${questionIndex}-1`]}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Foutmelding weergeven als er een fout is */}
        {error && (
          <div className="error">
            Fout! Controleer je antwoord, er kan maar 1 antwoord per vakje.
          </div>
        )}
      </div>
    </DragDropContext>
  );
}

function MatchValuesApp({ nextpage }) {
  const [states, setStates] = useState(() => {
    const savedStates = localStorage.getItem("quizAnswers_mv");
    return savedStates
      ? JSON.parse(savedStates)
      : questions_drag_and_drop.map((q, questionIndex) => {
          const state = {
            [`droppable-${questionIndex}-1`]: q.question_options,
          };
          q.answer_options.forEach((_, idx) => {
            state[`droppable-${questionIndex}-${idx + 2}`] = [];
          });
          return state;
        });
  });

  const { score, setScore } = useContext(ScoreContext);
  const [allAnswered, setAllAnswered] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("quizAnswers_mv", JSON.stringify(states));
  }, [states]);

  useEffect(() => {
    const allQuestionsFilled = states.every(
      (state, index) =>
        Object.keys(state).filter((key) => key !== `droppable-${index}-1`)
          .length === questions_drag_and_drop[index].answer_options.length
    );
    setAllAnswered(allQuestionsFilled);
  }, [states]);

  const checkAnswers = () => {
    let tempScore = score;
    const newErrors = [];

    questions_drag_and_drop.forEach((question, index) => {
      console.log(`Vraag ${index + 1}: ${question.title}`);

      // Verkrijg de antwoorden van de gebruiker
      const userAnswers = Object.keys(states[index])
        .filter((key) => key !== `droppable-${index}-1`) // Vermijd de droppable voor de namen
        .map((key) => states[index][key][0]); // Neem alleen de eerste waarde uit elk droppable

      console.log(`Jouw antwoorden: ${userAnswers}`);

      // Zorg ervoor dat userAnswers dezelfde lengte heeft als de juiste antwoorden
      if (userAnswers.length !== question.answer_ordered.length) {
        newErrors[index] = true; // Vraag is fout als niet alle antwoorden zijn ingevuld
        console.log(
          `Fout: Niet alle antwoorden ingevuld voor vraag ${index + 1}`
        );
        return;
      }

      // Creëer een array van correcte antwoorden op basis van answer_ordered
      const correctAnswers = question.answer_ordered.map(
        (i) => question.question_options[i]
      );
      console.log(`Correcte antwoorden: ${correctAnswers}`);

      // Vergelijk userAnswers met correctAnswers
      if (!arraysEqual(userAnswers, correctAnswers)) {
        newErrors[index] = true; // Vraag is fout
        tempScore -= 5; // Strafpunten
        setScore(tempScore);
        console.log(
          `Fout: Antwoorden komen niet overeen voor vraag ${index + 1}`
        );
      } else {
        newErrors[index] = false; // Vraag is goed
        console.log(`Goed: Antwoorden komen overeen voor vraag ${index + 1}`);
      }
    });

    setErrors(newErrors);
    console.log(`Fouten array: ${newErrors}`);

    // Controleer of alle antwoorden goed zijn
    if (newErrors.every((error) => error === false)) {
      tempScore += questions_drag_and_drop.length * 10; // Voeg punten toe voor alle goede antwoorden
      setScore(tempScore);
      console.log(`Alle antwoorden zijn goed! Score: ${tempScore}`);
      navigate(nextpage); // Ga naar de eindpagina
    } else {
      console.log(`Niet alle antwoorden zijn goed. Score blijft: ${tempScore}`);
    }
  };

  return (
    <>
      <div>
        {questions_drag_and_drop.map((question, questionIndex) => {
          const state = states[questionIndex];
          const onDragEnd = (result) => {
            const { source, destination } = result;

            if (!destination) return;

            const currentState = states[questionIndex];

            if (source.droppableId === destination.droppableId) {
              const values = reorder(
                currentState[source.droppableId],
                source.index,
                destination.index
              );
              const newState = {
                ...currentState,
                [source.droppableId]: values,
              };
              setStates(
                states.map((s, idx) => (idx === questionIndex ? newState : s))
              );
            } else {
              const result = move(
                currentState[source.droppableId],
                currentState[destination.droppableId],
                source,
                destination
              );

              const newState = {
                ...currentState,
                ...result,
              };
              setStates(
                states.map((s, idx) => (idx === questionIndex ? newState : s))
              );
            }
          };

          return (
            <Question
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
              state={state}
              onDragEnd={onDragEnd}
              error={errors[questionIndex]} // Foutmelding doorgeven
            />
          );
        })}
      </div>
      <button
        onClick={checkAnswers}
        disabled={!allAnswered}
        type="button"
        className="btn-next-page"
      >
        Controleer Antwoorden
      </button>
    </>
  );
}

export default MatchValuesApp;
