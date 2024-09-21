import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

const ShareComponent = () => {
    const textRef = useRef(null);

    const handleShare = async () => {
        try {
            const dataUrl = await toPng(textRef.current);
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'image.png', { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Gedeelde afbeelding',
                    text: 'Bekijk deze afbeelding!',
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
