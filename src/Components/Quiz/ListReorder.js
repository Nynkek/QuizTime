import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import './Quiz.css';

const questions_drag_and_drop = [
    {
        title: 'Sorteer de volgende mensen op',
        focused_word: 'Lengte',
        type: 'drag_and_drop',
        question_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
        answer_ordered: ['bruin', 'blauw', 'paars', 'groen'],
        options_measurement: ['Langst', 'Kortst']
    },
    {
        title: 'Wie is er het langst',
        focused_word: 'samen',
        type: 'drag_and_drop',
        question_options: ['Nynke & Nynke', 'Bugs & Lola', 'Jan & Hannie', 'Corrie & Koos'],
        answer_ordered: ['Nynke & Nynke', 'Bugs & Lola', 'Jan & Hannie', 'Corrie & Koos'],
        options_measurement: ['Langst', 'Kortst']
    },
    // Voeg hier meer vragen toe
];

function ListReorder() {
    const [answers, setAnswers] = useState([]);  // Houd de antwoorden bij
    const [visibleQuestions, setVisibleQuestions] = useState([0]);  // Houd bij welke vragen zichtbaar zijn
    const [itemsList, setItemsList] = useState(
        questions_drag_and_drop.map((question) => question.question_options)
    ); // Houd de items bij voor elke vraag

    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);

        // Voeg de volgende vraag toe aan de zichtbare vragen als deze er is
        if (questionIndex < questions_drag_and_drop.length - 1) {
            setVisibleQuestions([...visibleQuestions, questionIndex + 1]);
        } else {
            console.log('Alle vragen zijn beantwoord');
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

    return (
        <div className='quiz-drag-and-drop-list'>
            {visibleQuestions.map((questionIndex) => {
                const currentQuestion = questions_drag_and_drop[questionIndex];
                const items = itemsList[questionIndex];

                return (
                    <div key={questionIndex} className='quiz-container'>
                        <div className='question'>
                            <h3>{currentQuestion.title}</h3>
                            <h3><strong>{currentQuestion.focused_word}</strong></h3>
                            <DragDropContext onDragEnd={(result) => onDragEnd(result, questionIndex)}>
                                <Droppable droppableId={`droppable-${questionIndex}`}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`droppable ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}
                                        >
                                            {items.map((item, index) => (
                                                <Draggable key={item} draggableId={item} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`draggable ${snapshot.isDragging ? 'isDragging' : ''}`}
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
                        </div>
                        <div className='arrow'>
                            <div className='arrow-text-top'>{currentQuestion.options_measurement[0]}</div>
                            <div className='arrow-top'></div>
                            <div className='arrow-line'></div>
                            <div className='arrow-bottom'></div>
                            <div className='arrow-text-bottom'>{currentQuestion.options_measurement[1]}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ListReorder;
