import React, { useEffect, useRef } from 'react';

const CERTS = [
    {
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cambridge_Linguaskill_logo.svg/400px-Cambridge_Linguaskill_logo.svg.png',
        logoBg: '#FFFFFF',
        logoFallback: '🎓',
        title: 'Linguaskill Cambridge English',
        issuer: 'Cambridge English',
        date: 'Dec 2023',
        credentialId: 'klv04230151',
        skills: ['Speaking', 'Listening', 'English', 'Writing'],
        url: null,
    },
    {
        logo: null,
        logoBg: '#F0F0F0',
        logoFallback: '🏅',
        title: 'Responsive Web Design',
        issuer: 'freeCodeCamp',
        date: '2024',
        credentialId: null,
        skills: ['HTML', 'CSS', 'Responsive Design'],
        url: null,
    },
    {
        logo: null,
        logoBg: '#F0F0F0',
        logoFallback: '⚛️',
        title: 'React Developer Certification',
        issuer: 'Meta (Coursera)',
        date: '2024',
        credentialId: null,
        skills: ['React', 'JavaScript', 'Frontend'],
        url: null,
    },
    {
        logo: null,
        logoBg: '#F0F0F0',
        logoFallback: '🐍',
        title: 'Python for Everybody',
        issuer: 'University of Michigan (Coursera)',
        date: '2023',
        credentialId: null,
        skills: ['Python', 'Data Structures', 'Web Scraping'],
        url: null,
    },
    {
        logo: null,
        logoBg: '#F0F0F0',
        logoFallback: '🔐',
        title: 'Git & GitHub Foundations',
        issuer: 'GitHub',
        date: '2024',
        credentialId: null,
        skills: ['Git', 'GitHub', 'Version Control'],
        url: null,
    },
    {
        logo: null,
        logoBg: '#F0F0F0',
        logoFallback: '☁️',
        title: 'Cloud Fundamentals',
        issuer: 'AWS Skill Builder',
        date: '2025',
        credentialId: null,
        skills: ['Cloud Computing', 'AWS', 'DevOps'],
        url: null,
    },
];

const Certifications = () => {
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

    return (
        <section id="certifications" className="certifications" ref={ref}>
            <div className="reveal">
                <h2 className="section-title">certifications</h2>
                <div className="section-title-line" />
            </div>

            <div className="certs-list reveal">
                {CERTS.map((cert, i) => (
                    <div className="cert-card-li" key={i}>
                        {/* Logo */}
                        <div className="cert-logo-box" style={{ background: cert.logoBg }}>
                            {cert.logo ? (
                                <img
                                    src={cert.logo}
                                    alt={cert.issuer}
                                    className="cert-logo-img"
                                    onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                            ) : null}
                            <span
                                className="cert-logo-fallback"
                                style={{ display: cert.logo ? 'none' : 'flex' }}
                            >
                                {cert.logoFallback}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="cert-details">
                            <h4 className="cert-title-li">
                                {cert.url ? (
                                    <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.title}</a>
                                ) : cert.title}
                            </h4>
                            <p className="cert-meta">
                                <span className="cert-issuer-name">{cert.issuer}</span>
                                <span className="cert-dot">•</span>
                                <span>Issued {cert.date}</span>
                            </p>
                            {cert.credentialId && (
                                <p className="cert-credential">Credential ID: {cert.credentialId}</p>
                            )}
                            {cert.skills && cert.skills.length > 0 && (
                                <p className="cert-skills-row">
                                    <span className="cert-skills-label">Skills:</span>{' '}
                                    {cert.skills.join(', ')}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
