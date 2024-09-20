import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';
import TwoOptions from "../Components/Quiz/TwoOptions";
import MultipleChoice from '../Components/Quiz/MultipleChoice';
import ListReorder from '../Components/Quiz/ListReorder';



function Quiz() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">
                    <h1>Quiz</h1>
                    <TwoOptions />
                    <hr />
                    <MultipleChoice />
                    <ListReorder />


                </div>
                <Link to="/" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Submit &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default Quiz;