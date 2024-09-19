import React from 'react';
import { Link } from "react-router-dom";
import './Pages.css';




function Intro() {
    return (
        <>
            <div className='content-page'>
                <h1>Quiz Time met de Sluisjes</h1>
                <Link to="/teampicker" className='link-next-page'>
                    <button type='button' className='btn-next-page'>Kies je team &#8594; </button>
                </Link>
            </div>
        </>

    );

}

export default Intro;