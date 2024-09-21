import React, { useRef, useContext } from 'react';
import { toPng } from 'html-to-image';
import { ScoreContext } from '../Context/ScoreProvider';

const ShareComponent = () => {
    const textRef = useRef(null);
    const { score } = useContext(ScoreContext); // Gebruik de context


    const handleShare = async () => {
        try {
            const dataUrl = await toPng(textRef.current);
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'image.png', { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Gedeelde afbeelding',
                    text: { score },
                });
            } else {
                console.error('Delen is niet mogelijk op dit apparaat.');
            }
        } catch (error) {
            console.error('Er is iets misgegaan bij het delen:', error);
        }
    };

    return (
        <div>
            <div ref={textRef}>
                <h1>Dit is de tekst die wordt omgezet in een afbeelding</h1>
                <p>Meer tekst hier...</p>
            </div>
            <button onClick={handleShare}>Deel</button>
        </div>
    );
};

export default ShareComponent;
