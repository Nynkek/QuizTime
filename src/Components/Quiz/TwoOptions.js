import React, { useState, useEffect, useContext } from 'react';
import './Quiz.css';
import { useNavigate } from 'react-router-dom';
import { ScoreContext } from '../../Context/ScoreProvider';
import { questions_two_options } from '../../Data/questions';

function TwoOptions({ nextpage }) {
    const { score, setScore } = useContext(ScoreContext);
    const navigate = useNavigate();

    const [answers, setAnswers] = useState(() => {
        // Haal antwoorden op uit localStorage bij initiële render
        return JSON.parse(localStorage.getItem('quizAnswers_2o')) || [];
    });

    const [errors, setErrors] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
        // Haal huidige vraagindex op uit localStorage bij initiële render
        return parseInt(localStorage.getItem('quizCurrentQuestionIndex_2o'), 10) || 0;
    });

    // Sla antwoorden op in localStorage bij elke update
    useEffect(() => {
        localStorage.setItem('quizAnswers_2o', JSON.stringify(answers));
    }, [answers]);

    // Sla huidige vraagindex op in localStorage bij elke update
    useEffect(() => {
        localStorage.setItem('quizCurrentQuestionIndex_2o', currentQuestionIndex.toString());
    }, [currentQuestionIndex]);

    const handleAnswerSelection = (questionIndex, selectedAnswerIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswerIndex; // Sla de index van het geselecteerde antwoord op
        setAnswers(updatedAnswers);

        // Verhoog de huidige vraagindex als er meer vragen zijn en de volgende vraag nog niet is beantwoord
        if (questionIndex < questions_two_options.length - 1 && answers.length <= questionIndex + 1) {
            setCurrentQuestionIndex(questionIndex + 1);
        }
    };

    const checkAnswers = () => {
        const newErrors = [];
        let newScore = score;

        // Controleer alle antwoorden
        questions_two_options.forEach((question, index) => {
            const isCorrect = answers[index] === question.answer;
            newErrors[index] = !isCorrect;
            newScore += isCorrect ? 10 : -5; // +10 voor goed, -5 voor fout antwoord
        });

        setErrors(newErrors);
        setScore(newScore);

        // Ga door naar de volgende pagina als alle antwoorden correct zijn
        if (newErrors.every(error => !error)) {
            navigate(nextpage);
        }
    };

    const allAnswered = answers.length === questions_two_options.length && answers.every(answer => answer !== undefined);

    return (
        <div className='puzzle-two-options'>
            {questions_two_options.map((question, questionIndex) => (
                questionIndex <= currentQuestionIndex && (
                    <div key={questionIndex} className='quiz-container'>
                        <h3>{question.title}</h3>
                        <ul>
                            {question.q_options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    <input
                                        type="radio"
                                        id={`question${questionIndex}_option${optionIndex}`}
                                        name={`question${questionIndex}`}
                                        value={optionIndex}
                                        checked={answers[questionIndex] === optionIndex}
                                        onChange={() => handleAnswerSelection(questionIndex, optionIndex)}
                                    />
                                    <label htmlFor={`question${questionIndex}_option${optionIndex}`}>
                                        {option}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        {errors[questionIndex] && (
                            <p className="error">Dit antwoord is fout, probeer opnieuw!</p>
                        )}
                    </div>
                )
            ))}
            <h2>Score: {score}</h2>
            <button type='button' className='btn-next-page' disabled={!allAnswered} onClick={checkAnswers}>
                Submit &#8594;
            </button>
        </div>
    );
}

export default TwoOptions;
