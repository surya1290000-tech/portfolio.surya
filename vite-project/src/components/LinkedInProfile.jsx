import React, { useEffect, useRef } from 'react';

const LinkedInProfile = () => {
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

    const highlights = [
        { icon: '🎓', label: 'Education', value: 'KL University — B.Tech CSE (2027)' },
        { icon: '📍', label: 'Location', value: 'Vijayawada, Andhra Pradesh, India' },
        { icon: '💼', label: 'Open To', value: 'Internships · Full-time roles' },
        { icon: '🌐', label: 'Languages', value: 'Telugu · English · Hindi' },
    ];

    const featuredSkills = [
        'React.js', 'JavaScript', 'Node.js', 'Python',
        'HTML/CSS', 'Git', 'REST APIs', 'MongoDB',
    ];

    return (
        <section id="linkedin" className="linkedin-section" ref={ref}>
            <div className="reveal">
                <h2 className="section-title">LinkedIn Profile</h2>
                <div className="section-title-line" />
            </div>

            <div className="linkedin-card reveal">

                {/* Cover banner */}
                <div className="linkedin-cover">
                    <div className="linkedin-cover-pattern" />
                </div>

                {/* Avatar + name */}
                <div className="linkedin-header">
                    <div className="linkedin-avatar">
                        <img src="/avatar.jpg" alt="Surya Rajendra" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </div>
                    <div className="linkedin-identity">
                        <h3>Surya Rajendra</h3>
                        <p className="linkedin-headline">
                            Computer Science Student @ KL University · Full Stack Developer · Problem Solver
                        </p>
                        <p className="linkedin-location">📍 Vijayawada, Andhra Pradesh, India</p>
                    </div>

                    <a
                        href="https://in.linkedin.com/in/surya-rajendra-562934283"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-connect-btn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        View on LinkedIn
                    </a>
                </div>

                {/* About snippet */}
                <div className="linkedin-about">
                    <h4>About</h4>
                    <p>
                        I'm a passionate Computer Science and Engineering student at KL University (graduating 2027),
                        driven by a love for building innovative web solutions. I specialise in full-stack development
                        with React and Node.js, and actively sharpen my DSA skills on LeetCode.
                        Always looking for opportunities to collaborate, learn, and grow as a developer.
                    </p>
                </div>

                {/* Highlights grid */}
                <div className="linkedin-highlights">
                    {highlights.map(h => (
                        <div key={h.label} className="linkedin-highlight-item">
                            <span className="lh-icon">{h.icon}</span>
                            <div>
                                <span className="lh-label">{h.label}</span>
                                <span className="lh-value">{h.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div className="linkedin-skills">
                    <h4>Top Skills</h4>
                    <div className="linkedin-skill-pills">
                        {featuredSkills.map(s => (
                            <span key={s} className="linkedin-skill-pill">{s}</span>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LinkedInProfile;
