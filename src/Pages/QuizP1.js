import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
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
                    <TwoOptions />

                </div>
                <Link to="/quiz1end" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Submit &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default QuizP1;