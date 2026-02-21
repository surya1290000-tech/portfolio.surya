import React, { useEffect, useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    color: '#818cf8',
    skills: [
      { name: 'HTML / CSS', level: 95, icon: '🎨' },
      { name: 'JavaScript', level: 85, icon: '⚡' },
      { name: 'React', level: 82, icon: '⚛️' },
    ],
  },
  {
    title: 'Backend & Tools',
    color: '#34d399',
    skills: [
      { name: 'Node.js', level: 70, icon: '🟢' },
      { name: 'Python', level: 72, icon: '🐍' },
      { name: 'Git & GitHub', level: 88, icon: '🔗' },
    ],
  },
  {
    title: 'Database & Other',
    color: '#fb923c',
    skills: [
      { name: 'SQL', level: 65, icon: '🗄️' },
      { name: 'REST APIs', level: 78, icon: '🔌' },
      { name: 'Problem Solving', level: 80, icon: '🧩' },
    ],
  },
];

const Skills = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
              bar.style.width = bar.dataset.level + '%';
            });
            entry.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="reveal">
        <h2 className="section-title">my skills</h2>
        <div className="section-title-line" />
      </div>

      <div className="skills-grid reveal">
        {skillCategories.map(cat => (
          <div className="skill-cat-card" key={cat.title}>
            <div className="skill-cat-header">
              <div className="skill-cat-dot" style={{ background: cat.color }} />
              <h3 className="skill-cat-title">{cat.title}</h3>
            </div>
            <div className="skill-bars-list">
              {cat.skills.map(skill => (
                <div className="skill-row" key={skill.name}>
                  <div className="skill-row-top">
                    <span className="skill-row-icon">{skill.icon}</span>
                    <span className="skill-row-name">{skill.name}</span>
                    <span className="skill-row-pct" style={{ color: cat.color }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-bar-fill"
                      data-level={skill.level}
                      style={{ width: '0%', background: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;