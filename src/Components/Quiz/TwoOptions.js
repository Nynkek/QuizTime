import React, { useState } from 'react';

function TwoOptions() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
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
                            <h3>{question.title}</h3>

                            <ul>
                                {question.q_options.map((option, index) => (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            name={`question${questionIndex}`}
                                            value={option}
                                            checked={answers[questionIndex] === option}
                                            onChange={() =>
                                                handleAnswerSelection(questionIndex, option)
                                            }
                                        />
                                        {option}
                                    </li>
                                ))}
                            </ul>
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
        q_options: ['niet waar', 'waar'],
        answer: 'waar',
    },
    {
        title: 'De aarde is plat',
        type: 'radio',
        q_options: ['niet waar', 'waar'],
        answer: 'niet waar',
    },
    {
        title: 'Water kookt bij 100 graden Celsius',
        type: 'radio',
        q_options: ['niet waar', 'waar'],
        answer: 'waar',
    },
];