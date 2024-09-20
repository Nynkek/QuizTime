import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import "./Quiz.css"; // CSS importeren

const questions_drag_and_drop = [
    {
        title: "Welk huisdier hoort bij wie?",
        type: "drag_and_drop",
        question_options: ["Tanja", "Lisa", "Noor", "Wytze"],
        answer_ordered: ["Tanja", "Wytze", "Noor", "Lisa"],
    },
    {
        title: "Welke oogkleur hoort bij wie?",
        type: "drag_and_drop",
        question_options: ["Nynke", "Margriet", "Jan", "Teun"],
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
    return values.map((value, index) => (
        <MatchValues value={value} index={index} key={`${value}-${index}`} />
    ));
});

function MatchValuesApp() {
    // We halen de 'question_options' van de eerste vraag uit de lijst
    const [state, setState] = useState({
        droppable1: questions_drag_and_drop[0].question_options,
        droppable2: [],
        droppable3: [],
        droppable4: []
    });

    function onDragEnd(result) {
        const { source, destination } = result;

        // Als er geen bestemming is, doe niets
        if (!destination) {
            return;
        }

        // Als we binnen hetzelfde gebied slepen
        if (source.droppableId === destination.droppableId) {
            const values = reorder(
                state[source.droppableId],
                source.index,
                destination.index
            );
            setState({
                ...state,
                [source.droppableId]: values
            });
        } else {
            // Verplaats het item naar een ander gebied
            const result = move(
                state[source.droppableId],
                state[destination.droppableId],
                source,
                destination
            );

            setState({
                ...state,
                ...result
            });
        }
    }

    return (
        <div>
            <h2>{questions_drag_and_drop[0].title}</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="droppable-container">
                    {["droppable1", "droppable2", "droppable3", "droppable4"].map(
                        (droppableId) => (
                            <Droppable key={droppableId} droppableId={droppableId}>
                                {(provided) => (
                                    <div
                                        className="droppable-area"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <MatchValuesList values={state[droppableId]} />
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )
                    )}
                </div>
            </DragDropContext>
        </div>
    );
}
export default MatchValuesApp;
