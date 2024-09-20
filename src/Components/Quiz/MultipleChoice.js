import React, { useState } from 'react';

function MultipleChoice() {
    const [answers, setAnswers] = useState({});

    // Multiple choice vragenlijst
    const questions_multiple_choice = [
        {
            title: 'Van wie is de hobby:',
            focused_word: 'borduren',
            type: 'checkbox',
            q_options: ['Nynke', 'Margriet', 'Jan', 'Teun'],
            answer: 'Nynke',
        },
        {
            title: 'Van wie is de hobby:',
            focused_word: 'kogelstoten',
            type: 'checkbox',
            q_options: ['Nynke', 'Toes', 'Jan', 'Pim'],
            answer: 'Toes',
        },
    ];

    // Functie om antwoord voor een vraag op te slaan
    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        const updatedAnswers = { ...answers };

        // Als de vraag nog geen antwoorden heeft, maak een lege array
        if (!updatedAnswers[questionIndex]) {
            updatedAnswers[questionIndex] = [];
        }

        // Controleer of de geselecteerde optie al in de antwoordenlijst zit
        if (updatedAnswers[questionIndex].includes(selectedAnswer)) {
            // Als het al is geselecteerd, haal het uit de lijst (deselecteren)
            updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(
                (answer) => answer !== selectedAnswer
            );
        } else {
            // Voeg anders het antwoord toe aan de lijst
            updatedAnswers[questionIndex].push(selectedAnswer);
        }

        setAnswers(updatedAnswers);
    };

    // Functie om te controleren of er minimaal één antwoord is geselecteerd voor een vraag
    const hasAnsweredQuestion = (questionIndex) => {
        return answers[questionIndex] && answers[questionIndex].length > 0;
    };

    return (
        <div className='puzzle-multiple-choice'>
            {questions_multiple_choice.map((question, questionIndex) => (
                <div key={questionIndex}>
                    {/* Vraag wordt pas zichtbaar zodra de vorige vraag is beantwoord */}
                    {questionIndex === 0 || hasAnsweredQuestion(questionIndex - 1) ? (
                        <>
                            <h3>{question.title} <strong>{question.focused_word}</strong></h3>

                            <ul>
                                {question.q_options.map((q_option, index) => (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            id={`question${questionIndex}_option${index}`}
                                            name={`question${questionIndex}`}
                                            value={q_option}
                                            checked={
                                                answers[questionIndex] &&
                                                answers[questionIndex].includes(q_option)
                                            }
                                            onChange={() =>
                                                handleAnswerSelection(questionIndex, q_option)
                                            }
                                        />
                                        {/* Label koppelen aan de input via de id */}
                                        <label htmlFor={`question${questionIndex}_option${index}`}>
                                            {q_option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : null}
                </div>
            ))}
            {/* Eventuele controle knop of submit kan hier worden geplaatst */}
            <button
                onClick={() => console.log(answers)}
                className={'btn-next-page'}
            >
                Controleer Antwoorden
            </button>
        </div>
    );
}



export default MultipleChoice;
