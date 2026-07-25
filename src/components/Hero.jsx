import React from 'react';

export default function Hero() {
  const techStack = [
    { name: 'RAG SYSTEM', icon: 'fa-solid fa-brain', color: '#06b6d4', style: { top: '10%', left: '15%' } },
    { name: 'LLM', icon: 'fa-solid fa-microchip', color: '#0f766e', style: { top: '25%', right: '10%' } },
    { name: 'AGENT', icon: 'fa-solid fa-code', color: '#f97316', style: { bottom: '15%', left: '10%' } },
    { name: 'NEURAL NET', icon: 'fa-solid fa-network-wired', color: '#3776ab', style: { bottom: '20%', right: '15%' } },
    { name: 'DOCKER', icon: 'fa-brands fa-docker', color: '#2496ed', style: { top: '55%', left: '5%' } },
    { name: 'AUTONOMY', icon: 'fa-solid fa-robot', color: '#339933', style: { top: '60%', right: '5%' } },
  ];

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          
          <div className="hero-text-content">
            <div className="section-label cyber-label">
              <i className="fa-solid fa-terminal"></i>
              <span>AI_SYSTEM READY // VER 2.0</span>
            </div>

            <div className="hero-dp-card">
              <img src="zahedulDP.jpg" alt="Zahedul Islam" />
            </div>

            <h1 className="hero-title">
              Hello, I'm <br />
              <span className="name glitch-text" data-text="ZAHEDUL ISLAM">ZAHEDUL<br/>ISLAM</span>
            </h1>

            <p className="hero-subtitle">
              <span className="highlight-mint cyber-text">Competitive Programmer & LLM AI Engineer</span> crafting autonomous AI agents, algorithm solutions, and modern software architectures with neural intelligence.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn btn-mint">
                <i className="fa-solid fa-compass"></i> VIEW PORTFOLIO
              </a>
              <a href="File_PDF/Analysis of Time complexity and handshaking logic.pdf" target="_blank" rel="noreferrer" className="btn btn-outline">
                <i className="fa-solid fa-file-pdf"></i> DOWNLOAD RESUME
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit-wrapper">
              <div className="orbit-center">
                <i className="fa-solid fa-microchip"></i>
              </div>
              <div className="orbit-ring-shape ring-1"></div>
              <div className="orbit-ring-shape ring-2"></div>
              <div className="orbit-ring-shape ring-3"></div>

              {techStack.map((tech, idx) => (
                <div key={idx} className="tech-tag-floating cyber-tag" style={{ ...tech.style, animationDelay: `${idx * 0.6}s` }}>
                  <i className={tech.icon} style={{ color: tech.color }}></i>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
