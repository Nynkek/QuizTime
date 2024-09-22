import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import './Pages.css';
import TwoOptions from "../Components/Quiz/TwoOptions";


function QuizP1() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">
                    <h1>Klopt het?</h1>
                    <TwoOptions nextpage="/quiz1end" />

                </div>

            </div>
        </>
    );
}

export default QuizP1;