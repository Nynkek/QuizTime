import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Pages.css';



function WelcomeTeam() {
    const [selectedTeam, setSelectedTeam] = useState("");

    useEffect(() => {
        const savedTeam = localStorage.getItem("selectedTeam");
        if (savedTeam) {
            setSelectedTeam(savedTeam);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <>
            <div className='content-page'>
                <h1 className='circle-bg'>Welkom {selectedTeam}!</h1>
                <div className='content'>
                    <ol>
                        <li>Gebruik steeds dezelfde telefoon voor de quiz
                        </li>
                        <li>Beantwoord de vragen samen met je team
                        </li>
                        <li>Je score wordt bijgehouden, dus denk goed na over de antwoorden</li>
                        <li>Je mag de envelop pas openen als je het codewoord hebt</li>

                        <li>Bij vragen kun je Nynke een bericht sturen 06 48813006</li>
                    </ol>

                </div>
                <Link to="/quiz" className='link-next-page'>

                    <button type='button' className='btn-next-page'>Start quiz &#8594; </button>
                </Link>
            </div>

        </>
    );
}

export default WelcomeTeam;