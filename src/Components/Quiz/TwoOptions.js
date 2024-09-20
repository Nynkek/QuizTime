import React, { useState } from 'react';
import './Quiz.css';

function TwoOptions() {

    const [answers, setAnswers] = useState([]);


    // Functie om de keuze voor de huidige vraag op te slaan
    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);
    };



    return (
        <div className='puzzle-two-options'>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                    {questionIndex === 0 || answers[questionIndex - 1] ? (
                        <>
                            <div className='quiz-container'>

                                <h3>{question.title}</h3>

                                <ul>
                                    {question.q_options.map((option, index) => (
                                        <li key={index}>
                                            <input
                                                type="radio"
                                                id={`question${questionIndex}_option${index}`}
                                                name={`question${questionIndex}`}
                                                value={option}
                                                checked={answers[questionIndex] === option}
                                                onChange={() =>
                                                    handleAnswerSelection(questionIndex, option)
                                                }
                                            />
                                            <label htmlFor={`question${questionIndex}_option${index}`}>
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
}


export default TwoOptions;

const questions = [
    {
        title: 'Pim knipt al 10 jaar Nynkes hoofdhaar',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 'waar',
    },
    {
        title: 'De aarde is plat',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 'niet waar',
    },
    {
        title: 'Water kookt bij 100 graden Celsius',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: 'waar',
    },
];