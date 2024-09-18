import React from "react";
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";


function Quiz() {
    return (
        <>
            <Header />
            <h1>Quiz</h1>
            <p>Wie is lief?</p>
            <Link to="/">
                <button type='button' className='btn-next-page'>Submit &#8594; </button>
            </Link>
        </>
    );
}

export default Quiz;