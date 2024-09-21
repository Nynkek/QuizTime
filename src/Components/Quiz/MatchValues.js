import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import "./Quiz.css"; // CSS importeren

const questions_drag_and_drop = [
    {
        title: "Welk huisdier hoort bij wie?",
        type: "drag_and_drop",
        question_options: ["Tanja", "Lisa", "Noor", "Wytze"],
        answer_options: ["Kat", "Hond", "Kanarie", "Konijn"],
        answer_ordered: ["Tanja", "Wytze", "Noor", "Lisa"],
    },
    {
        title: "Welke oogkleur hoort bij wie?",
        type: "drag_and_drop",
        question_options: ["Nynke", "Margriet", "Jan", "Teun"],
        answer_options: ["bruin", "blauw", "groen", "grijs"],
        answer_ordered: ["Nynke", "Teun", "Jan", "Margriet"],
    },
    {
        title: "Welke auto is van wie?",
        type: "drag_and_drop",
        question_options: ["Nynke", "Margriet", "Jan", "Teun"],
        answer_options: ["Geen", "Tesla", "Citroen", "Rammelbak"],
        answer_ordered: ["Nynke", "Teun", "Jan", "Margriet"],
    },
];

// Functie om een lijst opnieuw te ordenen binnen hetzelfde gebied
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// Functie om items van het ene gebied naar het andere te verplaatsen
const move = (source, destination, droppableSource, droppableDestination) => {
    // Check if source or destination is undefined
    if (!source || !destination) {
        console.error("Source or destination is undefined");
        return {};
    }

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
    // Zorg ervoor dat values altijd een array is (gebruik [] als fallback)
    const safeValues = values || [];

    return safeValues.map((value, index) => (
        <MatchValues value={value} index={index} key={`${value}-${index}`} />
    ));
});

function MatchValuesApp() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index van de huidige vraag
    const [visibleQuestions, setVisibleQuestions] = useState([0]); // Bijhouden van de zichtbare vragen
    const [states, setStates] = useState(() =>
        questions_drag_and_drop.map((q, questionIndex) => {
            const state = { [`droppable-${questionIndex}-1`]: q.question_options }; // Vraag specifieke droppable (namen)
            q.answer_options.forEach((_, idx) => {
                state[`droppable-${questionIndex}-${idx + 2}`] = []; // Antwoorden gebieden
            });
            return state;
        })
    );

    useEffect(() => {
        const currentState = states[currentQuestionIndex];

        const allFilled = Object.keys(currentState)
            .filter(key => key !== `droppable-${currentQuestionIndex}-1`)
            .every(key => currentState[key].length > 0);

        // Als alles is gevuld en er zijn nog vragen over, toon de volgende vraag
        if (allFilled && currentQuestionIndex < questions_drag_and_drop.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);

            // Controleer of de volgende vraag een correct geïnitialiseerde state heeft
            const nextQuestionState = states[currentQuestionIndex + 1] || {};
            const initializedState = {
                ...nextQuestionState,
                [`droppable-${currentQuestionIndex + 1}-1`]: nextQuestionState[`droppable-${currentQuestionIndex + 1}-1`] || [],
            };

            setStates(states.map((s, idx) => idx === currentQuestionIndex + 1 ? initializedState : s));
            setVisibleQuestions([...visibleQuestions, currentQuestionIndex + 1]);
        }
    }, [states, currentQuestionIndex, visibleQuestions]);

    function onDragEnd(result) {
        const { source, destination } = result;

        // Als er geen bestemming is, doe niets
        if (!destination) {
            return;
        }

        const currentState = states[currentQuestionIndex];

        // Controleer of de droppableId's bestaan
        if (!currentState[source.droppableId] || !currentState[destination.droppableId]) {
            console.error("DroppableId does not exist in the current state");
            return;
        }

        // Als we binnen hetzelfde gebied slepen
        if (source.droppableId === destination.droppableId) {
            const values = reorder(
                currentState[source.droppableId],
                source.index,
                destination.index
            );
            const newState = {
                ...currentState,
                [source.droppableId]: values
            };
            setStates(states.map((s, idx) => (idx === currentQuestionIndex ? newState : s)));
        } else {
            // Verplaats het item naar een ander gebied
            const result = move(
                currentState[source.droppableId],
                currentState[destination.droppableId],
                source,
                destination
            );

            const newState = {
                ...currentState,
                ...result
            };
            setStates(states.map((s, idx) => (idx === currentQuestionIndex ? newState : s)));
        }
    }

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                {visibleQuestions.map(questionIndex => {
                    const question = questions_drag_and_drop[questionIndex];
                    const state = states[questionIndex];

                    return (
                        <div key={questionIndex} className="question-section">
                            <h2>{question.title}</h2>
                            <div className="droppable-container droppable-container-answer-options">
                                {question.answer_options.map((answerOption, index) => (
                                    <Droppable
                                        key={`droppable-${questionIndex}-${index + 2}`}
                                        droppableId={`droppable-${questionIndex}-${index + 2}`}
                                    >
                                        {(provided) => (
                                            <div className='droppable-container-answer-options-container'>
                                                <div
                                                    className="droppable-area droppable-area-answer-options"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    <MatchValuesList values={state[`droppable-${questionIndex}-${index + 2}`]} />
                                                    {provided.placeholder}
                                                </div>
                                                <div className='droppable-area-description'>
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
                                            <MatchValuesList values={state[`droppable-${questionIndex}-1`]} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default MatchValuesApp;
