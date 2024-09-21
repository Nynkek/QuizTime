import React, { useState, useEffect } from 'react';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';

function TwoOptions() {
    const [answers, setAnswers] = useState([]);
    const [errors, setErrors] = useState([]);
    const [score, setScore] = useState(parseInt(localStorage.getItem('quizScore'), 10)); // Nieuwe state om de score bij te houden

    // Ophalen van antwoorden en score bij page refresh
    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || [];
        setAnswers(savedAnswers);

        const savedScore = parseInt(localStorage.getItem('quizScore'), 10) || 0;
        setScore(savedScore);
        window.dispatchEvent(new Event('quizScore'))
    }, []);

    // Antwoorden opslaan in localStorage
    useEffect(() => {
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
    }, [answers]);

    // Score opslaan in localStorage
    useEffect(() => {
        console.log(score + "ikbenhier");
        localStorage.setItem('quizScore', score);
    }, [score]);

    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);
    };

    const checkAnswers = () => {
        const newErrors = [];
        let newScore = score; // We beginnen met de huidige score

        questions.forEach((question, index) => {
            if (answers[index] !== question.answer) {
                newErrors[index] = true;
                newScore -= 5; // Elk fout antwoord kost -5 punten
            } else {
                newErrors[index] = false;
            }
        });

        setErrors(newErrors);

        // Als er geen fouten zijn, +10 per correct antwoord
        if (newErrors.every(error => error === false)) {
            newScore += questions.length * 10; // +10 per goed antwoord
        }

        setScore(newScore); // Update de score in de state

        if (newErrors.every(error => error === false)) {
            localStorage.setItem('quizScore', newScore);
            navigate('/quiz1end')
        }

    };

    const allAnswered = answers.length === questions.length && answers.every(answer => answer !== undefined);
    const navigate = useNavigate();


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
                                                onChange={() => handleAnswerSelection(questionIndex, option)}
                                            />
                                            <label htmlFor={`question${questionIndex}_option${index}`}>
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {errors[questionIndex] && (
                                    <p className="error">Dit antwoord is fout, probeer opnieuw!</p>
                                )}
                            </div>
                        </>
                    ) : null}
                </div>
            ))}

            <h2>Score: {score}</h2> {/* Toon de huidige score */}


            <button type='button' className='btn-next-page' disabled={!allAnswered}
                onClick={checkAnswers}>Submit &#8594; </button>

        </div>
    );
}




export default TwoOptions;

const questions = [
    {
        title: 'Pim knipt al 10 jaar Nynkes hoofdhaar',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: '✓ waar',
    },
    {
        title: 'De aarde is plat',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: '✗ niet waar',
    },
    {
        title: 'Water kookt bij 100 graden Celsius',
        type: 'radio',
        q_options: ['✗ niet waar', '✓ waar'],
        answer: '✓ waar',
    },
];
