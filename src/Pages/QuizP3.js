import React, { useEffect } from 'react';
import Header from '../Components/Header/Header';
import './Pages.css';
import ListReorder from '../Components/Quiz/ListReorder';

function QuizP3() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />
            <div className="content-page">
                <div className="content">
                    <ListReorder />
                </div>
            </div>
        </>
    );
}

export default QuizP3;
