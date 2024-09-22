import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';
import ListReorder from '../Components/Quiz/ListReorder';



function QuizP3() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">


                    <ListReorder />


                </div>
                <Link to="/quiz3end" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Submit &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default QuizP3;