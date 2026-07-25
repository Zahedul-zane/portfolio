import React from 'react';

export default function CertModal({ cert, onClose }) {
  if (!cert) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
          <div>
            <img
              src={cert.img}
              alt={cert.title}
              style={{ width: '100%', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}
            />
          </div>
          <div>
            <span className="section-label">{cert.date}</span>
            <h2 style={{ fontSize: '1.5rem', margin: '8px 0' }}>{cert.title}</h2>
            <span className="cert-issuer-badge">{cert.issuer}</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '14px 0' }}>
              {cert.description}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              {cert.tags.map((t, i) => (
                <span key={i} className="tag-chip" style={{ background: 'var(--mint-light)', color: 'var(--mint-text-dark)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
