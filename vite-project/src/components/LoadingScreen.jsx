import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setFadeOut(true), 1200);
        const t2 = setTimeout(() => setVisible(false), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    if (!visible) return null;

    return (
        <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="loading-logo">SR.</div>
            <div className="loading-bar-track">
                <div className="loading-bar-fill" />
            </div>
            <p className="loading-text">Loading portfolio...</p>
        </div>
    );
};

export default LoadingScreen;
