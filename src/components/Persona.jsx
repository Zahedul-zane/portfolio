import React from 'react';

export default function Persona() {
  return (
    <section id="about" className="section">
      <div className="container">
        <span className="section-label">ABOUT ME</span>
        <h2 className="section-title">Persona & Academic Background</h2>
        <p className="section-subtitle">
          Undergraduate student building at the intersection of full-stack engineering, algorithms, and applied machine learning.
        </p>

        <div className="bento-grid">
          
          {/* ABOUT BIO */}
          <div className="bento-card bento-about">
            <span className="bento-tag">BIO</span>
            <h3 className="bento-bio-name">Hi, I'm Zahedul Islam</h3>
            <p className="bento-bio-text">
              I specialize in high-performance web engineering, data structures, and autonomous AI agents. Passionate about solving complex algorithmic problems and crafting sleek, intuitive digital interfaces.
            </p>
            <div className="pill-row">
              <div className="pill-item">
                <i className="fa-solid fa-location-dot" style={{ color: 'var(--mint-text-dark)' }}></i>
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="pill-item">
                <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--mint-text-dark)' }}></i>
                <span>EWU CSE · 2026</span>
              </div>
              <div className="pill-item">
                <i className="fa-solid fa-code-branch" style={{ color: 'var(--mint-text-dark)' }}></i>
                <span>Full-Stack & ML</span>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="bento-card bento-edu">
            <span className="bento-tag">EDUCATION</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '6px' }}>East West University</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
              Bachelor of Science in Computer Science & Engineering
            </p>
            <div className="pill-row">
              <div className="pill-item" style={{ background: 'var(--mint-light)', color: 'var(--mint-text-dark)' }}>
                <i className="fa-solid fa-calendar-days"></i> 2022 — 2026
              </div>
              <div className="pill-item">Status: Active Student</div>
            </div>
          </div>

          {/* STATS */}
          <div className="bento-card bento-stats">
            <span className="bento-tag">IMPACT & METRICS</span>
            <div className="stats-inner-grid">
              <div className="stat-box">
                <div className="stat-number mint">10+</div>
                <div className="stat-desc">Projects</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">20+</div>
                <div className="stat-desc">GitHub Stars</div>
              </div>
              <div className="stat-box">
                <div className="stat-number mint">50+</div>
                <div className="stat-desc">Problems</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">6+</div>
                <div className="stat-desc">Certificates</div>
              </div>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="bento-card bento-social">
            <span className="bento-tag">CONNECT</span>
            <div className="social-mini-grid">
              <a href="https://github.com/Zahedul-zane" target="_blank" rel="noreferrer" className="social-card">
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/zahedul-islam-153165374/" target="_blank" rel="noreferrer" className="social-card">
                <i className="fa-brands fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="https://leetcode.com/u/vsJ2gRZWWX/" target="_blank" rel="noreferrer" className="social-card">
                <i className="fa-solid fa-code"></i>
                <span>LeetCode</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
