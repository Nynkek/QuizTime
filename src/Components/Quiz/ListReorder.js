import React, { useState, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ScoreContext } from '../../Context/ScoreProvider';
import { useNavigate } from 'react-router-dom';

import './Quiz.css';

const questions_drag_and_drop = [
    {
        title: 'Sorteer de volgende mensen op',
        focused_word: 'Lengte',
        type: 'drag_and_drop',
        question_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer_order_indices: [3, 2, 1, 0],
        options_measurement: ['Langst', 'Kortst']
    },
    {
        title: 'Wie is er het langst',
        focused_word: 'samen',
        type: 'drag_and_drop',
        question_options: ['Pim & Nynke', 'Bugs & Lola', 'Jan & Hannie', 'Corrie & Koos'],
        answer_order_indices: [3, 2, 1, 0],
        options_measurement: ['Langst', 'Kortst']
    }
    // Voeg hier meer vragen toe
];

function ListReorder() {
    const [answers, setAnswers] = useState([]); // Houd de antwoorden bij
    const [visibleQuestions, setVisibleQuestions] = useState([0]); // Houd bij welke vragen zichtbaar zijn
    const [itemsList, setItemsList] = useState(
        questions_drag_and_drop.map(question => question.question_options)
    ); // Houd de items bij voor elke vraag
    const [allAnswered, setAllAnswered] = useState(false);
    const [errors, setErrors] = useState([]);
    const { score, setScore } = useContext(ScoreContext);
    const navigate = useNavigate();

    const handleAnswerSelection = (questionIndex, order) => {
        const updatedAnswers = answers;
        const options = questions_drag_and_drop[questionIndex].question_options;
        const answerIndices = order.map(answer => options.indexOf(answer));
        updatedAnswers[questionIndex] = answerIndices;
        setAnswers(updatedAnswers);

        // Voeg de volgende vraag toe aan de zichtbare vragen als deze er is
        if (
            questionIndex === visibleQuestions.length - 1 &&
            visibleQuestions.length < questions_drag_and_drop.length
        ) {
            setVisibleQuestions([...visibleQuestions, questionIndex + 1]);
        } else if (questionIndex === questions_drag_and_drop.length - 1) {
            setAllAnswered(true);
        }
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result, questionIndex) => {
        if (!result.destination) {
            return;
        }

        const updatedItems = reorder(
            itemsList[questionIndex],
            result.source.index,
            result.destination.index
        );

        const newItemsList = [...itemsList];
        newItemsList[questionIndex] = updatedItems;
        setItemsList(newItemsList);

        // Selecteer het antwoord nadat de gebruiker het heeft versleept
        handleAnswerSelection(questionIndex, updatedItems);
    };

    const arraysEqual = (left, right) => {
        if (left.length !== right.length) {
            return false;
        }
        for (let index = 0; index < left.length; index++) {
            if (left[index] !== right[index]) {
                return false;
            }
        }
        return true;
    };

    const checkAnswers = () => {
        let tempScore = score;
        const newErrors = [];

        questions_drag_and_drop.forEach((question, index) => {
            const userAnswers = answers[index] || [];

            // Controleer of de gegeven antwoorden overeenkomen met de correcte antwoorden
            if (!arraysEqual(userAnswers, question.answer_order_indices)) {
                newErrors[index] = true;
                tempScore -= 5;
            } else {
                newErrors[index] = false;
            }
        });

        setErrors(newErrors);

        const allAnsweredCorrectly = newErrors.every(error => error === false);
        if (allAnsweredCorrectly) {
            tempScore += questions_drag_and_drop.length * 10; // +10 per goed antwoord
        }
        setScore(tempScore);

        if (allAnsweredCorrectly) {
            navigate('/quiz4');
        }
    };

    return (
        <div className="quiz-drag-and-drop-list">
            {visibleQuestions.map(questionIndex => {
                const currentQuestion = questions_drag_and_drop[questionIndex];
                const items = itemsList[questionIndex];

                return (
                    <div key={questionIndex} className="quiz-container">
                        <div className="question">
                            <h3>{currentQuestion.title}</h3>
                            <h3>
                                <strong>{currentQuestion.focused_word}</strong>
                            </h3>
                            <DragDropContext onDragEnd={result => onDragEnd(result, questionIndex)}>
                                <Droppable droppableId={`droppable-${questionIndex}`}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`droppable ${
                                                snapshot.isDraggingOver ? 'isDraggingOver' : ''
                                            }`}
                                        >
                                            {items.map((item, index) => (
                                                <Draggable
                                                    key={item}
                                                    draggableId={item}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`draggable ${
                                                                snapshot.isDragging
                                                                    ? 'isDragging'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {item}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            {/* Toon foutmelding onder de vraag als deze fout is beantwoord */}
                            {errors[questionIndex] && (
                                <p className="error">Dit antwoord is fout, probeer opnieuw!</p>
                            )}
                        </div>
                        <div className="arrow">
                            <div className="arrow-text-top">
                                {currentQuestion.options_measurement[0]}
                            </div>
                            <div className="arrow-top"></div>
                            <div className="arrow-line"></div>
                            <div className="arrow-bottom"></div>
                            <div className="arrow-text-bottom">
                                {currentQuestion.options_measurement[1]}
                            </div>
                        </div>
                    </div>
                );
            })}
            <button
                type="button"
                onClick={checkAnswers}
                className="btn-next-page"
                disabled={!allAnswered}
            >
                Submit &#8594;
            </button>
        </div>
    );
}

export default ListReorder;
