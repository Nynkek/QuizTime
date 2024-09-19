import React from "react";
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';



function Quiz() {
    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">
                    <h1>Quiz</h1>
                    <p>Wie is lief?</p>
                </div>
                <Link to="/" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Submit &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default Quiz;