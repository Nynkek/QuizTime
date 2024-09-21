import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import './Pages.css';
import html2canvas from 'html2canvas';

function ShareScore() {
    const [selectedTeam, setSelectedTeam] = useState("");
    const printRef = useRef();

    // Haal de teamnaam op uit localStorage
    useEffect(() => {
        const savedTeam = localStorage.getItem("selectedTeam");
        if (savedTeam) {
            setSelectedTeam(savedTeam);
        }
    }, []);

    // Stel de teamscore in
    var teamScore = "5134 punten";

    // Scroll naar boven bij laden van de pagina
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Functie om afbeelding te downloaden
    const handleDownloadImage = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);

        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'quiz_score.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };

    return (
        <>
            <div className='content-page circle-bg'>
                <h1 className='title-screen'>Laatste stap</h1>
                <p>Klik op de knop om je uitslag te delen met Nynke! Dan bepaald zij wie er gewonnen heeft.</p>

                {/* Gedeelte dat als afbeelding wordt gegenereerd */}

                <div ref={printRef} className="score-container">
                    <div className='quiz-container'>
                        <h2>Teamnaam: {selectedTeam}</h2>
                        <p>Score: {teamScore}</p>
                    </div>
                </div>

                <button type='button' className='btn-next-page' onClick={handleDownloadImage}>
                    Download Score als Afbeelding
                </button>

                <Link to="/" className='link-next-page'>
                    <button type='button' className=''>opnieuw quiz doen &#8594;</button>
                </Link>
            </div>
        </>
    );
}

export default ShareScore;
