import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ScoreContext } from '../../Context/ScoreProvider';
import { useNavigate } from 'react-router-dom';

import './Quiz.css';
import { questions_reorder } from '../../Data/questions';



function ListReorder() {
    const answersLocalStorageKey = 'quizAnswers_listReorder';
    const itemsListLocalStorageKey = 'quizAnswers_listReorder_itemList';

    const saveLocalStorage = (data, key) => {
        localStorage.setItem(key, JSON.stringify(data));
    };
    const loadLocalStorage = key => {
        return JSON.parse(localStorage.getItem(key)) || [];
    };
    const loadItemsList = () => {
        const items = loadLocalStorage(itemsListLocalStorageKey);
        if (items.length === 0) {
            return questions_reorder.map(question => question.question_options);
        }
        return items;
    };

    const [answers, setAnswers] = useState(loadLocalStorage(answersLocalStorageKey)); // Houd de antwoorden bij
    const [visibleQuestions, setVisibleQuestions] = useState([0]); // Houd bij welke vragen zichtbaar zijn
    const [itemsList, setItemsList] = useState(loadItemsList()); // Houd de items bij voor elke vraag
    const [allAnswered, setAllAnswered] = useState(false);
    const [errors, setErrors] = useState([]);
    const { score, setScore } = useContext(ScoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        saveLocalStorage(answers, answersLocalStorageKey);
        saveLocalStorage(itemsList, itemsListLocalStorageKey);
        // Maak steeds de volgende vraag zichtbaar voor beantwoorde vragen
        let visible = [0];
        answers.forEach((answers, index) => {
            if (index >= questions_reorder.length - 1) {
                // Maak niet een onbestaande vraag zichtbaar
                return;
            }
            if (answers.length > 0) {
                visible.push(index + 1);
            }
        });
        setVisibleQuestions(visible);
        const answeredQuestions = answers.filter(answers => answers.length > 0);
        setAllAnswered(answeredQuestions.length === questions_reorder.length);
    }, [answers, itemsList]);

    const handleAnswerSelection = (questionIndex, order) => {
        const updatedAnswers = answers;
        const options = questions_reorder[questionIndex].question_options;
        updatedAnswers[questionIndex] = order.map(answer => options.indexOf(answer));
        setAnswers(updatedAnswers);
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
        let newScore = score;
        const newErrors = [];

        questions_reorder.forEach((question, index) => {
            const userAnswers = answers[index] || [];

            // Controleer of de gegeven antwoorden overeenkomen met de correcte antwoorden
            if (!arraysEqual(userAnswers, question.answer_order_indices)) {
                newErrors[index] = true;
                newScore -= 5;
            } else {
                newErrors[index] = false;
            }
        });

        setErrors(newErrors);

        const allAnsweredCorrectly = newErrors.every(error => error === false);
        if (allAnsweredCorrectly) {
            newScore += questions_reorder.length * 10; // +10 per goed antwoord
        }
        setScore(newScore);

        if (allAnsweredCorrectly) {
            navigate('/quiz4');
        }
    };

    return (
        <>
        <div className="quiz-drag-and-drop-list">
            {visibleQuestions.map(questionIndex => {
                const currentQuestion = questions_reorder[questionIndex];
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
      
        </div>
        <button
                type="button"
                onClick={checkAnswers}
                className="btn-next-page"
                disabled={!allAnswered}
            >
                Submit &#8594;
            </button>
        </>
    );
}

export default ListReorder;
