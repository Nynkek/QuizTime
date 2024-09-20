import React, { useEffect } from 'react';
import Header from "../Components/Header/Header";
import { Link } from "react-router-dom";
import './Pages.css';
import MultipleChoice from '../Components/Quiz/MultipleChoice';



function QuizP2() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Header />
            < div className="content-page" >
                <div className="content" >

                    < MultipleChoice />



                </div>
                < Link to="/quiz3" className='link-next-page' >
                    <button type='button' className='btn-next-page' > Submit &#8594; </button>
                </Link>
            </div>
        </>
    );
}

export default QuizP2;