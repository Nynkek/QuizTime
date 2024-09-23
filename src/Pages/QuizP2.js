import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import './Pages.css';
import MultipleChoice from '../Components/Quiz/MultipleChoice';

function QuizP2() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">
                    <MultipleChoice nextpage="/quiz2end" />
                </div>
            </div>
        </>
    );
}

export default QuizP2;
