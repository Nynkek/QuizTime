import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';



function QuizP3End() {



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="content-page low-circle-bg">
                <div className="content">
                    <h1 className='page-title'>Envelop</h1>
                    <div className='quiz-container'>
                        <p className='code-box'>Je mag de volgende envelop openen! Met de naam:</p>
                        <code className='digit'>geel</code>
                        <p className='code-box'>Kom pas weer terug bij deze app als je de volgende code hebt ontdekt.</p>
                    </div>
                    <div className='quiz-container'>
                        <h2>Puzzles van de envelop opgelost?</h2>
                        <p className='code-box'>Vul je gevonden code in om door te gaan</p>
                        <div className="input-widget">
                            <input max="9999" className="input" placeholder='0000' />
                            <div className="digit-background">
                                <div className="digit"></div>
                                <div className="digit"></div>
                                <div className="digit"></div>
                                <div className="digit"></div>
                            </div>
                        </div>

                    </div>
                </div>
                <Link to="/quiz4" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Indienen &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default QuizP3End;