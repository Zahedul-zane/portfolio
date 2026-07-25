import React from 'react';

export default function PdfModal({ file, onClose }) {
  if (!file) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-box" style={{ maxWidth: '900px', height: '85vh', padding: '20px', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingRight: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{file.title}</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <iframe
          src={file.file}
          title={file.title}
          style={{ width: '100%', height: '100%', border: 'none', borderRadius: '12px', background: '#f8fafc' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '14px' }}>
          <a href={file.file} download className="btn btn-mint" style={{ padding: '8px 18px', fontSize: '0.88rem' }}>
            <i className="fa-solid fa-download"></i> Download Document
          </a>
        </div>
      </div>
    </div>
  );
}
