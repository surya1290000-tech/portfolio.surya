import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <Link to="hero" smooth={true} duration={600}>
            <button
                className={`back-to-top ${visible ? 'visible' : ''}`}
                aria-label="Back to top"
            >
                ↑
            </button>
        </Link>
    );
};

export default BackToTop;
