import React from 'react';

export default function Forge() {
  const technologies = [
    { name: 'C', icon: 'fa-solid fa-c', color: '#a855f7' },
    { name: 'C++', icon: 'fa-solid fa-code', color: '#f97316' },
    { name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab' },
    { name: 'Java', icon: 'fa-brands fa-java', color: '#ef4444' },
    { name: 'JavaScript', icon: 'fa-brands fa-square-js', color: '#f59e0b' },
    { name: 'TypeScript', icon: 'fa-solid fa-t', color: '#3178c6' },
    { name: 'React', icon: 'fa-brands fa-react', color: '#06b6d4' },
    { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933' },
    { name: 'SQL', icon: 'fa-solid fa-database', color: '#10b981' },
    { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ed' },
    { name: 'FastAPI', icon: 'fa-solid fa-bolt', color: '#05998b' },
    { name: 'DSA', icon: 'fa-solid fa-diagram-project', color: '#15803d' },
    { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#e34f26' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572b6' }
  ];

  return (
    <section id="expertise" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <span className="section-label">TECHNICAL EXPERTISE</span>
        <h2 className="section-title">The Engineering Forge</h2>
        <p className="section-subtitle">
          Core technical skill set across full-stack software development, machine learning frameworks, data structures, and databases.
        </p>

        <div className="tech-grid">
          {technologies.map((tech, idx) => (
            <div key={idx} className="tech-card">
              <i className={tech.icon} style={{ color: tech.color }}></i>
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
