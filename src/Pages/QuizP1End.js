import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';



function QuizP1End() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="content-page low-circle-bg">
                <div className="content">
                    <h1 className='page-title'>Open envelop</h1>
                    <p>Je mag de volgende envelop openen! Met de naam:</p>

                    <code>groen</code>
                    <br />
                    <div className='quiz-container'>


                        <h2>Puzzles van de envelop opgelost?</h2>
                        <p>Vul je gevonden code in om door te gaan</p>
                        <input placeholder='0000'></input>
                    </div>
                </div>
                <Link to="/quiz2" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Indienen &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default QuizP1End;