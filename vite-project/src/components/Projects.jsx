import React, { useEffect, useRef, useState } from 'react';

const ALL_PROJECTS = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A personal portfolio built with React and Vite showcasing projects, skills and contact information.',
    tags: ['React', 'Vite', 'CSS', 'Node.js'],
    url: '#',
    repo: 'https://github.com/surya1290000-tech',
    image: '/proj-portfolio.png',
  },
  {
    id: 2,
    title: 'Full Stack App',
    description: 'A full-stack web application with a REST API backend and a dynamic React frontend.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    url: '#',
    repo: 'https://github.com/surya1290000-tech',
    image: '/proj-fullstack.png',
  },
  {
    id: 3,
    title: 'DSA Problem Tracker',
    description: 'A tracker app to log and monitor Data Structures and Algorithms practice progress.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    url: '#',
    repo: 'https://github.com/surya1290000-tech',
    image: '/proj-dsa.png',
  },
  {
    id: 4,
    title: 'Python Data Analyzer',
    description: 'Analyzes datasets and generates visual reports using Pandas and Matplotlib.',
    tags: ['Python', 'Pandas', 'Matplotlib'],
    url: '#',
    repo: 'https://github.com/surya1290000-tech',
    image: '/proj-python.png',
  },
];


const ALL_TAGS = ['All', ...new Set(ALL_PROJECTS.flatMap(p => p.tags))];

const Projects = () => {
  const [activeTag, setActiveTag] = useState('All');
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

  const filtered = activeTag === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter(p => p.tags.includes(activeTag));

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="reveal">
        <h2 className="section-title">My Projects</h2>
        <div className="section-title-line" />
      </div>

      {/* Filter Tabs */}
      <div className="project-filter reveal">
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="projects-grid reveal">
        {filtered.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-banner">
              <img
                src={project.image}
                alt={project.title}
                className="project-banner-img"
              />
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className={`tag ${tag === activeTag ? 'tag-active' : ''}`}
                    onClick={() => setActiveTag(tag)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                    className="project-link-btn primary">🚀 Live Demo</a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer"
                    className="project-link-btn secondary">⌥ GitHub</a>
                )}
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center' }}>
            No projects found for "{activeTag}".
          </p>
        )}
      </div>
    </section>
  );
};

export default Projects;