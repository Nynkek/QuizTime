import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';
import MatchValues from '../Components/Quiz/MatchValues';



function QuizP4() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">

                    <p>Hier komt de moeilijkste puzzle om te bouwen denk ik. Drag and drop maar dan naar een speciale plek</p>
                    <MatchValues />


                </div>
                <Link to="/" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Submit &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default QuizP4;