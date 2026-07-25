import React, { useState } from 'react';
import CertModal from './CertModal';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const certs = [
    {
      id: 1,
      title: 'FINXCEL 9.0 (Business Analytics)',
      issuer: 'Business Analytics Competition',
      date: 'JAN 24, 2025',
      img: 'CertificateImage/FINXCEL9.0Certificate.jpeg',
      tags: ['EXCEL', 'DATA', 'ANALYTICS'],
      description: 'Successfully analyzed multi-dimensional business datasets to identify growth opportunities and optimize operational efficiency during the FINXCEL 9.0 national competition.'
    },
    {
      id: 2,
      title: 'Intra-University Programming Contest',
      issuer: 'EWU CoPC',
      date: 'MAR 28, 2025',
      img: 'CertificateImage/Intra-uni-Prog-Contest.jpeg',
      tags: ['ALGO', 'CONTEST', 'C++'],
      description: 'Achieved high ranking in the East West University Intra-University Programming Contest, demonstrating advanced problem-solving skills in C++ and algorithmic logic.'
    },
    {
      id: 3,
      title: 'LLM AI Agent Development',
      issuer: 'DeepLearning.AI',
      date: 'FEB 15, 2026',
      img: 'CertificateImage/LLM AI AGENT.jpeg',
      tags: ['AI', 'LLM', 'PYTHON'],
      description: 'Completed advanced training on building autonomous AI agents using Large Language Models, RAG systems, and LangGraph for complex task automation.'
    },
    {
      id: 4,
      title: 'AI Agent for Beginners',
      issuer: 'Amazon Web Services',
      date: 'DEC 10, 2025',
      img: 'CertificateImage/AI Agent for beginners.jpg',
      tags: ['AI', 'CLOUD', 'AWS'],
      description: 'Fundamentals of AI Agent orchestration within the AWS ecosystem, focusing on Bedrock and automated cloud-based intelligence workflows.'
    },
    {
      id: 5,
      title: 'Capture The Flag (CyberSecurity)',
      issuer: 'CyberSecurity Contest',
      date: 'NOV 05, 2025',
      img: 'CertificateImage/CaptureTheFlag.jpg',
      tags: ['SEC', 'CTF', 'CONTEST'],
      description: 'Demonstrated technical proficiency in penetration testing, cryptography, and network security during the Capture The Flag cybersecurity challenge.'
    },
    {
      id: 6,
      title: 'Introduction to Artificial Neural Network',
      issuer: 'Coursera',
      date: 'JULY 7, 2026',
      img: 'CertificateImage/neural network.png',
      tags: ['AI', 'NEURAL NETWORK', 'DEEP LEARNING'],
      description: 'Deep dive into artificial neural networks, backpropagation algorithms, activation functions, and deep learning architectures.'
    }
  ];

  return (
    <section id="certificates" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <span className="section-label">ACHIEVEMENTS</span>
        <h2 className="section-title">Verified Certificates & Honors</h2>
        <p className="section-subtitle">
          Official certifications in machine learning, competitive programming, data analytics, and cloud engineering.
        </p>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {certs.map((cert) => (
            <div key={cert.id} className="cert-item">
              <div className="cert-dot"></div>
              <div className="cert-card-box" onClick={() => setSelectedCert(cert)}>
                <img src={cert.img} alt={cert.title} className="cert-thumb-img" />
                <div className="cert-info-main">
                  <span className="cert-issuer-badge">{cert.issuer} • {cert.date}</span>
                  <h3 className="cert-title-text">{cert.title}</h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {cert.tags.map((t, idx) => (
                      <span key={idx} className="tag-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--mint-text-dark)' }}>
                  <i className="fa-solid fa-expand" style={{ fontSize: '1.2rem' }}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
}
