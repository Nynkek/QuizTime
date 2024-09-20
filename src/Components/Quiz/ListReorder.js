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
        options_measurement: ['langst', 'kortst']
    },

    // Je kunt hier meer vragen toevoegen
];

function ListReorder() {
    const currentQuestion = questions_drag_and_drop[0];
    const [items, setItems] = useState(currentQuestion.question_options);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(reorderedItems);
    };

    return (
        <div className='quiz-drag-and-drop-list'>
            <div className='quiz-container'>
                <div className='question'>

                    <h3>{currentQuestion.title}</h3>
                    <h3><strong>{currentQuestion.focused_word}</strong></h3>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
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
                    <div className='arrow-text-botom'>{currentQuestion.options_measurement[1]}</div>


                </div>

            </div>
        </div>
    );
}

export default ListReorder;
