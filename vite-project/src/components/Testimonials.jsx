import React, { useState, useRef, useEffect } from 'react';

const TESTIMONIALS = [
    {
        name: 'Prof. K. Srinivas',
        role: 'Faculty Advisor, KL University',
        avatar: '👨‍🏫',
        text: 'Surya consistently demonstrates exceptional problem-solving skills and a passion for innovation. His projects showcase technical depth beyond his academic year.',
    },
    {
        name: 'Ravi Teja',
        role: 'Classmate & Project Collaborator',
        avatar: '👨‍💻',
        text: 'Working with Surya on our full-stack project was a great experience. He has a knack for writing clean, maintainable code and always delivers on time.',
    },
    {
        name: 'Ananya Reddy',
        role: 'Hackathon Team Member',
        avatar: '👩‍💻',
        text: 'Surya is incredibly driven. During our hackathon, he built the entire backend in a few hours and still found time to help others debug their code.',
    },
];

const Testimonials = () => {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e =>
                e.target.querySelectorAll('.reveal').forEach(el => el.classList.toggle('visible', e.isIntersecting))
            ),
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const goTo = (idx) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setActive(idx);
            setAnimating(false);
        }, 300);
    };

    const t = TESTIMONIALS[active];

    return (
        <section id="testimonials" className="testimonials" ref={ref}>
            <div className="reveal">
                <h2 className="section-title">Testimonials</h2>
                <div className="section-title-line" />
            </div>

            <div className={`testimonial-card reveal ${animating ? 'fading' : ''}`}>
                <div className="testimonial-avatar">{t.avatar}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                </div>
            </div>

            <div className="testimonial-dots reveal">
                {TESTIMONIALS.map((_, i) => (
                    <button
                        key={i}
                        className={`t-dot ${i === active ? 'active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Testimonial ${i + 1}`}
                    />
                ))}
            </div>

            <div className="testimonial-nav reveal">
                <button className="t-nav-btn" onClick={() => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>← Prev</button>
                <button className="t-nav-btn" onClick={() => goTo((active + 1) % TESTIMONIALS.length)}>Next →</button>
            </div>
        </section>
    );
};

export default Testimonials;
