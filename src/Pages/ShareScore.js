import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './Pages.css';
import { Link } from 'react-router-dom';


function ShareScore() {

    const [selectedTeam, setSelectedTeam] = useState("");

    useEffect(() => {
        const savedTeam = localStorage.getItem("selectedTeam");
        if (savedTeam) {
            setSelectedTeam(savedTeam);
        }
    }, []);
    const printRef = useRef();

    // Functie om ondersteuning voor bestandsshares te checken
    const canShareFiles = () => {
        const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
        return navigator.canShare && navigator.canShare({ files: [mockFile] });
    };

    // Functie om afbeelding te delen
    const handleShareImage = async () => {
        const element = printRef.current;

        // Maak een screenshot van het element met html2canvas
        const canvas = await html2canvas(element);

        // Converteer canvas naar blob
        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'score.jpg', { type: 'image/jpeg' });

            // Check of het apparaat bestandsshares ondersteunt
            if (navigator.canShare && canShareFiles()) {
                try {
                    await navigator.share({
                        title: 'Quiz Score',
                        text: 'We hebben de quiz afgerond, dit is de score van' + { selectedTeam },
                        files: [file]  // Deel de afbeelding
                    });
                    console.log('Succesvol gedeeld!');
                } catch (error) {
                    console.error('Er ging iets mis tijdens het delen:', error);
                }
            } else {
                // Fallback als delen van bestanden niet wordt ondersteund
                alert('Delen wordt niet ondersteund op dit apparaat. Probeer een screenshot te maken.');
            }
        }, 'image/jpeg');
    };

    return (
        <div className='content-page circle-bg'>
            <h1 className='title-screen'>Deel je score!</h1>

            {/* Gedeelte dat als afbeelding wordt gegenereerd */}

            <div ref={printRef} className="score-container quiz-container">
                <h2 className='scorecard-header div1'>Score-kaart: {selectedTeam}</h2>
                <div className='div2'>Totaal goed:</div>
                <div className='div3'>40 vragen</div>
                <div className='div4'>Totaal fouten: </div>
                <div className='div5'> 4</div>
                <div className='div6'>Totale Score:</div>
                <div className='div7'>12323 punten</div>
                <div className='div8'>Jullie krijgen het favorieten Frieze woord van Lina als cadeautje voor het meedoen: Gearfetsje! </div>
            </div>

            {/* Share-knop */}
            <button type="button" className='btn-next-page' onClick={handleShareImage}>
                Deel Score
            </button>

            <Link to="/" className=''>
                <button type='button' >doe quiz opnieuw &#8594; </button>
            </Link>
        </div>
    );
}

export default ShareScore;
