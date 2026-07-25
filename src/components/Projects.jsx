import React, { useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('ALL');

  const projects = [
    {
      id: 1,
      title: 'Student Management System',
      category: 'JAVA',
      description: 'Real-time student intelligence platform with integrated database management, automated reporting, and interactive dashboard for academic monitoring.',
      tags: ['JAVA', 'SQL', 'UI/UX'],
      gradient: 'linear-gradient(135deg, #80ed99 0%, #3b82f6 100%)',
      codeUrl: 'https://github.com/Zahedul-zane/StudentManagementSystem',
      liveUrl: 'https://zahedul-zane.github.io/StudentManagementSystem'
    },
    {
      id: 2,
      title: 'LLM AI Agent Engine',
      category: 'AI',
      description: 'ML-driven AI engine development using RAG systems and LangGraph for automated, context-aware interactions and intelligent system management.',
      tags: ['PYTHON', 'LLM', 'RAG'],
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #80ed99 100%)',
      codeUrl: 'https://github.com/Zahedul-zane/LLM-Based-AI-Engine-Development-EWU-Agent-RAG-',
      liveUrl: 'https://zahedul-zane.github.io/LLM-Based-AI-Engine-Development-EWU-Agent-RAG-'
    },
    {
      id: 3,
      title: 'Course Selection Platform',
      category: 'WEB',
      description: 'Full-stack educational platform built for streamlined academic registration, course discovery, and student enrollment management.',
      tags: ['WEB', 'NODE', 'JAVASCRIPT'],
      gradient: 'linear-gradient(135deg, #f97316 0%, #80ed99 100%)',
      codeUrl: 'https://github.com/Zahedul-zane/CourseSelection',
      liveUrl: 'https://zahedul-zane.github.io/CourseSelection'
    },
    {
      id: 4,
      title: 'Data Structure Visualization',
      category: 'ALGO',
      description: 'Comprehensive implementation and visualization of core data structures, optimized for performance and educational demonstration.',
      tags: ['C++', 'ALGO', 'DSA'],
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
      codeUrl: 'https://github.com/Zahedul-zane/Data-Structure-Project',
      liveUrl: 'https://zahedul-zane.github.io/Data-Structure-Project'
    },
    {
      id: 5,
      title: 'Time Complexity & Handshaking Analysis',
      category: 'ALGO',
      description: 'Comprehensive analysis of algorithmic time complexity and mathematical principles of handshaking logic with random vertices.',
      tags: ['C PROGRAMMING', 'MATHS', 'ALGO'],
      gradient: 'linear-gradient(135deg, #a855f7 0%, #80ed99 100%)',
      codeUrl: 'https://github.com/Zahedul-zane/discrete-mathametics',
      liveUrl: 'https://zahedul-zane.github.io/discrete-mathametics'
    }
  ];

  const filteredProjects = filter === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === filter || p.tags.includes(filter));

  return (
    <section id="projects" className="section">
      <div className="container">
        <span className="section-label">PORTFOLIO</span>
        <h2 className="section-title">Selected Projects</h2>
        <p className="section-subtitle">
          Featured engineering projects ranging from AI agent systems and algorithmic analyses to full-stack management web platforms.
        </p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {['ALL', 'AI', 'WEB', 'JAVA', 'ALGO'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-mint' : 'btn-outline'}`}
              style={{ padding: '8px 18px', fontSize: '0.85rem', borderRadius: '9999px' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header-bg" style={{ background: project.gradient }}>
                <span className="badge-pill" style={{ background: '#ffffff', color: '#0f172a' }}>
                  <i className="fa-solid fa-code"></i> {project.category}
                </span>
              </div>
              
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-tags-row">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="tag-chip">{tag}</span>
                  ))}
                </div>

                <div className="project-footer-row">
                  <a href={project.codeUrl} target="_blank" rel="noreferrer" className="project-btn">
                    <i className="fa-brands fa-github"></i> Code
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-btn" style={{ background: 'var(--mint-light)', color: 'var(--mint-text-dark)', borderColor: 'var(--mint-main)' }}>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
