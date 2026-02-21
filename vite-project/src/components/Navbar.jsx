import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { to: 'about', label: 'About' },
  { to: 'projects', label: 'Work' },
  { to: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'skills', 'github-stats', 'linkedin', 'certifications', 'testimonials', 'contact'];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand */}
        <Link to="hero" smooth duration={500} className="nav-brand">
          PORTFOLIO,&nbsp;<span>SURYA</span>
        </Link>

        {/* Desktop links */}
        <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                smooth
                duration={500}
                className={activeSection === to ? 'nav-active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {/* Theme toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;