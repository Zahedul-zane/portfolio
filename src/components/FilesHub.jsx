import React, { useState } from 'react';
import PdfModal from './PdfModal';

export default function FilesHub() {
  const [selectedFile, setSelectedFile] = useState(null);

  const documents = [
    { id: 1, title: 'Analysis of Time complexity & handshaking logic', file: 'File_PDF/Analysis of Time complexity and handshaking logic.pdf', category: 'ALGORITHMS' },
    { id: 2, title: 'Insertion Sort Algorithm Presentation', file: 'File_PDF/insertion_sort_algorithm_presentation.pdf', category: 'ALGORITHMS' },
    { id: 3, title: 'Emergence of Bangladesh', file: 'File_PDF/Emergence of Bangladesh.pdf', category: 'HISTORY' },
    { id: 4, title: 'Library Data Structures for Library System', file: 'File_PDF/Library Data Structures for Library System.pdf', category: 'DATA STRUCTURES' },
    { id: 5, title: 'From Burnout to Belonging (ENGLISH 102)', file: 'File_PDF/From Burnout to Belonging(ENGLISH 102 ).pdf', category: 'ENGLISH' },
    { id: 6, title: 'Probability & Variance of Random Variable', file: 'File_PDF/Probability , Expectation of sum and product and variance of random variable (STATISTICS).pdf', category: 'STATISTICS' },
    { id: 7, title: 'Student Record Management Paper', file: 'File_PDF/Student Record Management.pdf', category: 'SYSTEMS' },
    { id: 8, title: 'Impact of Colonial Economic Exploitation', file: 'File_PDF/Impact of Colonial Economic Exploitation on the Social Collapse of Bengali Society.pdf', category: 'SOCIOLOGY' },
    { id: 9, title: 'Psychological Disorder Analysis of Christopher Robin', file: 'File_PDF/A Psychological Disorder Analysis of Disney’s Christopher Robin.pdf', category: 'PSYCHOLOGY' },
    { id: 10, title: 'Analysis time complexity with random vertices (Term Paper)', file: 'File_PDF/Analysis time complexity and handshaking logic with random vertices(TermPaper).pdf', category: 'ALGORITHMS' },
    { id: 11, title: 'Introduction to Artificial Neural Network Paper', file: 'File_PDF/Introduction to Artificial Neural Network.pdf', category: 'AI & ML' },
    { id: 12, title: 'Economic Dependency Created by the IMF', file: 'File_PDF/Analysis of the effect of economic dependency created by the IMF.pdf', category: 'ECONOMICS' }
  ];

  return (
    <section id="files" className="section">
      <div className="container">
        <span className="section-label">ACADEMIC MODULES & PAPERS</span>
        <h2 className="section-title">Files & Reports Hub</h2>
        <p className="section-subtitle">
          Access published academic research papers, presentations, and technical documentation.
        </p>

        <div className="files-grid">
          {documents.map((doc) => (
            <div key={doc.id} className="file-card" onClick={() => setSelectedFile(doc)}>
              <div className="file-icon-wrap">
                <i className="fa-solid fa-file-pdf"></i>
              </div>
              <div className="file-details">
                <h4>{doc.title}</h4>
                <span>{doc.category} • PDF Document</span>
              </div>
              <div style={{ color: 'var(--mint-text-dark)' }}>
                <i className="fa-solid fa-eye"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PdfModal file={selectedFile} onClose={() => setSelectedFile(null)} />
    </section>
  );
}
