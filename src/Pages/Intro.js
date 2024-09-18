import React from 'react';
import { Link } from "react-router-dom";


function Intro() {
    return (
        <>
            <div className='page'>
                <h1>Quiz Time met de Sluisjes</h1>
                <Link to="/teampicker">
                    <button type='button' className='btn-next-page'>Kies je team &#8594; </button>
                </Link>
            </div>
        </>

    );

}

export default Intro;