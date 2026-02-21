import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const trail = trailRef.current;
        let mouseX = -100, mouseY = -100;
        let trailX = -100, trailY = -100;
        let rafId;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX - 8}px, ${mouseY - 8}px)`;
        };

        const animateTrail = () => {
            trailX += (mouseX - trailX) * 0.12;
            trailY += (mouseY - trailY) * 0.12;
            trail.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`;
            rafId = requestAnimationFrame(animateTrail);
        };

        window.addEventListener('mousemove', onMove);
        rafId = requestAnimationFrame(animateTrail);

        const onDown = () => cursor.classList.add('clicked');
        const onUp = () => cursor.classList.remove('clicked');
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <>
            {/* Dot */}
            <div ref={cursorRef} className="cursor-dot" />
            {/* Glow ring */}
            <div ref={trailRef} className="cursor-glow" />
        </>
    );
};

export default CursorGlow;
