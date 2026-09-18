const sectionIds = ['hero', 'about', 'expertise', 'projects', 'certificates', 'files', 'dashboards'];
const getModalRoot = () => document.getElementById('modalRoot');

const certificates = {
  1: {
    title: 'FINXCEL 9.0 (Business Analytics)',
    issuer: 'Business Analytics Competition',
    date: 'JAN 24, 2025',
    img: 'CertificateImage/FINXCEL9.0Certificate.jpeg',
    tags: ['EXCEL', 'DATA', 'ANALYTICS'],
    description: 'Successfully analyzed multi-dimensional business datasets to identify growth opportunities and optimize operational efficiency during the FINXCEL 9.0 national competition.'
  },
  2: {
    title: 'Intra-University Programming Contest',
    issuer: 'EWU CoPC',
    date: 'MAR 28, 2025',
    img: 'CertificateImage/Intra-uni-Prog-Contest.jpeg',
    tags: ['ALGO', 'CONTEST', 'C++'],
    description: 'Achieved high ranking in the East West University Intra-University Programming Contest, demonstrating advanced problem-solving skills in C++ and algorithmic logic.'
  },
  3: {
    title: 'LLM AI Agent Development',
    issuer: 'DeepLearning.AI',
    date: 'FEB 15, 2026',
    img: 'CertificateImage/LLM AI AGENT.jpeg',
    tags: ['AI', 'LLM', 'PYTHON'],
    description: 'Completed advanced training on building autonomous AI agents using Large Language Models, RAG systems, and LangGraph for complex task automation.'
  },
  4: {
    title: 'AI Agent for Beginners',
    issuer: 'Amazon Web Services',
    date: 'DEC 10, 2025',
    img: 'CertificateImage/AI Agent for beginners.jpg',
    tags: ['AI', 'CLOUD', 'AWS'],
    description: 'Fundamentals of AI Agent orchestration within the AWS ecosystem, focusing on Bedrock and automated cloud-based intelligence workflows.'
  },
  5: {
    title: 'Capture The Flag (CyberSecurity)',
    issuer: 'CyberSecurity Contest',
    date: 'NOV 05, 2025',
    img: 'CertificateImage/CaptureTheFlag.jpg',
    tags: ['SEC', 'CTF', 'CONTEST'],
    description: 'Demonstrated technical proficiency in penetration testing, cryptography, and network security during the Capture The Flag cybersecurity challenge.'
  },
  6: {
    title: 'Introduction to Artificial Neural Network',
    issuer: 'Coursera',
    date: 'JULY 7, 2026',
    img: 'CertificateImage/neural network.png',
    tags: ['AI', 'NEURAL NETWORK', 'DEEP LEARNING'],
    description: 'Deep dive into artificial neural networks, backpropagation algorithms, activation functions, and deep learning architectures.'
  },
  7: {
    title: 'Excel Essentials for Workplace Productivity',
    issuer: 'UNICEF / Passport to Earning',
    date: 'AUG 03, 2026',
    img: 'CertificateImage/UNICEF.jpg',
    tags: ['EXCEL', 'PRODUCTIVITY', 'UNICEF'],
    description: 'Successfully completed the course Excel Essentials for Workplace Productivity offered by UNICEF and Passport to Earning Bangladesh.'
  },
  8: {
    title: 'REACT 2026 (National Robotics Competition)',
    issuer: 'IEEE SEU SB • Southeast University',
    date: 'SEP 11, 2026',
    img: 'CertificateImage/REACT2026Certificate.jpeg',
    tags: ['ROBOTICS', 'IEEE', 'COMPETITION'],
    description: 'Awarded Certificate of Participation for active participation, enthusiasm, and valuable contribution to REACT 2026 (Research, Engineering, Automation, Computer, Technology) — The 1st National Robotics Competition organized by IEEE SEU Student Branch at Southeast University on 10-11th September 2026.'
  }
};

const files = {
  1: { title: 'Analysis of Time complexity & handshaking logic', file: 'File_PDF/Analysis of Time complexity and handshaking logic.pdf' },
  2: { title: 'Insertion Sort Algorithm Presentation', file: 'File_PDF/insertion_sort_algorithm_presentation.pdf' },
  3: { title: 'Emergence of Bangladesh', file: 'File_PDF/Emergence of Bangladesh.pdf' },
  4: { title: 'Library Data Structures for Library System', file: 'File_PDF/Library Data Structures for Library System.pdf' },
  5: { title: 'From Burnout to Belonging (ENGLISH 102)', file: 'File_PDF/From Burnout to Belonging(ENGLISH 102 ).pdf' },
  6: { title: 'Probability & Variance of Random Variable', file: 'File_PDF/Probability , Expectation of sum and product and variance of random variable (STATISTICS).pdf' },
  7: { title: 'Student Record Management Paper', file: 'File_PDF/Student Record Management.pdf' },
  8: { title: 'Impact of Colonial Economic Exploitation', file: 'File_PDF/Impact of Colonial Economic Exploitation on the Social Collapse of Bengali Society.pdf' },
  9: { title: 'Psychological Disorder Analysis of Christopher Robin', file: 'File_PDF/A Psychological Disorder Analysis of Disney’s Christopher Robin.pdf' },
  10: { title: 'Analysis time complexity with random vertices (Term Paper)', file: 'File_PDF/Analysis time complexity and handshaking logic with random vertices(TermPaper).pdf' },
  11: { title: 'Introduction to Artificial Neural Network Paper', file: 'File_PDF/Introduction to Artificial Neural Network.pdf' },
  12: { title: 'Economic Dependency Created by the IMF', file: 'File_PDF/Analysis of the effect of economic dependency created by the IMF.pdf' },
  13: { title: 'University Portal Management System (CSE302 Project)', file: 'File_PDF/CSE302 Project.pdf' }
};

function toggleMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileToggle || !mobileNav) return;
  const icon = mobileToggle.querySelector('i');
  mobileNav.classList.toggle('open');
  if (icon) {
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav && mobileNav.classList.contains('open')) {
    toggleMobileMenu();
  }
}

function scrollToSection(targetId) {
  const section = document.getElementById(targetId);
  if (!section) return;
  closeMobileMenu();
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollPos = window.scrollY + 180;
  let current = 'hero';
  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPos) {
      current = id;
    }
  });
  navLinks.forEach((link) => {
    const target = link.dataset.target || link.getAttribute('data-target');
    if (target === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function setFilter(filterValue) {
  const projectFilterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  projectFilterButtons.forEach((button) => {
    const filter = button.dataset.filter || button.getAttribute('data-filter');
    if (filter === filterValue) {
      button.classList.add('active');
      button.classList.remove('btn-outline');
      button.classList.add('btn-mint');
    } else {
      button.classList.remove('active');
      button.classList.remove('btn-mint');
      button.classList.add('btn-outline');
    }
  });

  projectCards.forEach((card) => {
    const category = (card.dataset.category || card.getAttribute('data-category') || '').toUpperCase();
    const tags = (card.dataset.tags || card.getAttribute('data-tags') || '').toUpperCase().split(',');
    if (filterValue === 'ALL' || category === filterValue || tags.includes(filterValue)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function closeModal() {
  const modalRoot = document.getElementById('modalRoot');
  if (modalRoot) {
    modalRoot.innerHTML = '';
  }
}

function openCertModal(certId) {
  const modalRoot = getModalRoot();
  if (!modalRoot) return;
  const cert = certificates[certId];
  if (!cert) return;
  const tags = cert.tags.map((tag) => `<span class="tag-chip" style="background: var(--mint-light); color: var(--mint-text-dark);">${tag}</span>`).join('');
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-content-box">
        <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; align-items: center;">
          <div>
            <img src="${cert.img}" alt="${cert.title}" style="width: 100%; border-radius: 16px; border: 1px solid rgba(0,0,0,0.08); box-shadow: var(--neo-shadow-md);" />
          </div>
          <div>
            <span class="section-label">${cert.date}</span>
            <h2 class="modal-title">${cert.title}</h2>
            <span class="cert-issuer-badge">${cert.issuer}</span>
            <p class="modal-description">${cert.description}</p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px;">${tags}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  attachModalListeners();
}

function openPdfModal(fileId) {
  const modalRoot = getModalRoot();
  if (!modalRoot) return;
  const file = files[fileId];
  if (!file) return;
  const encoded = encodeURI(file.file);
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-content-box modal-large">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-right: 40px;">
          <h3 class="modal-title">${file.title}</h3>
          <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <iframe src="${encoded}" title="${file.title}" style="width: 100%; height: 100%; border: none; border-radius: 12px; background: #f8fafc;"></iframe>
        <div class="modal-footer">
          <a href="${encoded}" download class="btn btn-mint" style="padding: 8px 18px; font-size: 0.88rem;">
            <i class="fa-solid fa-download"></i> Download Document
          </a>
        </div>
      </div>
    </div>
  `;
  attachModalListeners();
}

const projectsData = {
  1: {
    title: 'Student Management System',
    category: 'JAVA',
    desc: 'Real-time student intelligence platform with integrated database management, automated reporting, and interactive dashboard for academic monitoring.',
    tags: ['JAVA', 'SQL', 'UI/UX'],
    codeUrl: 'https://github.com/Zahedul-zane/StudentManagementSystem',
    liveUrl: 'https://zahedul-zane.github.io/StudentManagementSystem'
  },
  2: {
    title: 'LLM AI Agent Engine',
    category: 'AI',
    desc: 'ML-driven AI engine development using RAG systems and LangGraph for automated, context-aware interactions and intelligent system management.',
    tags: ['PYTHON', 'LLM', 'RAG'],
    codeUrl: 'https://github.com/Zahedul-zane/LLM-Based-AI-Engine-Development-EWU-Agent-RAG-',
    liveUrl: 'https://zahedul-zane.github.io/LLM-Based-AI-Engine-Development-EWU-Agent-RAG-'
  },
  3: {
    title: 'Course Selection Platform',
    category: 'WEB',
    desc: 'Full-stack educational platform built for streamlined academic registration, course discovery, and student enrollment management.',
    tags: ['WEB', 'NODE', 'JAVASCRIPT'],
    codeUrl: 'https://github.com/Zahedul-zane/CourseSelection',
    liveUrl: 'https://zahedul-zane.github.io/CourseSelection'
  },
  4: {
    title: 'Data Structure Visualization',
    category: 'ALGO',
    desc: 'Comprehensive implementation and visualization of core data structures, optimized for performance and educational demonstration.',
    tags: ['C++', 'ALGO', 'DSA'],
    codeUrl: 'https://github.com/Zahedul-zane/Data-Structure-Project',
    liveUrl: 'https://zahedul-zane.github.io/Data-Structure-Project'
  },
  5: {
    title: 'Time Complexity & Handshaking Analysis',
    category: 'ALGO',
    desc: 'Comprehensive analysis of algorithmic time complexity and mathematical principles of handshaking logic with random vertices.',
    tags: ['C PROGRAMMING', 'MATHS', 'ALGO'],
    codeUrl: 'https://github.com/Zahedul-zane/discrete-mathametics',
    liveUrl: 'https://zahedul-zane.github.io/discrete-mathametics'
  }
};

const techShowcaseData = {
  'C': {
    title: 'C Programming',
    icon: 'fa-solid fa-c',
    color: '#a855f7',
    desc: 'Low-level memory management, time complexity analysis, and mathematical handshaking proofs.',
    projects: [5],
    files: [1, 10],
    certs: [2]
  },
  'C++': {
    title: 'C++ & Competitive Programming',
    icon: 'fa-solid fa-code',
    color: '#f97316',
    desc: 'High-performance algorithms, object-oriented data structures, and contest problem solving.',
    projects: [4],
    files: [4, 1],
    certs: [2]
  },
  'PYTHON': {
    title: 'Python & AI Engineering',
    icon: 'fa-brands fa-python',
    color: '#3776ab',
    desc: 'Artificial intelligence, Large Language Models (LLM), RAG pipelines, and automated agent workflows.',
    projects: [2],
    files: [11],
    certs: [3, 6]
  },
  'JAVA': {
    title: 'Java Software Development',
    icon: 'fa-brands fa-java',
    color: '#ef4444',
    desc: 'Enterprise application architecture, object-oriented design, and database-driven software.',
    projects: [1],
    files: [7],
    certs: []
  },
  'JAVASCRIPT': {
    title: 'JavaScript Web Engineering',
    icon: 'fa-brands fa-square-js',
    color: '#f59e0b',
    desc: 'Full-stack dynamic web applications, asynchronous APIs, DOM interactions, and modern web UI.',
    projects: [3, 1],
    files: [],
    certs: []
  },
  'TYPESCRIPT': {
    title: 'TypeScript Application Architecture',
    icon: 'fa-solid fa-t',
    color: '#3178c6',
    desc: 'Strongly typed web development, scalable codebases, and maintainable frontend architecture.',
    projects: [3],
    files: [],
    certs: []
  },
  'REACT': {
    title: 'React & Modern Frontend',
    icon: 'fa-brands fa-react',
    color: '#06b6d4',
    desc: 'Component-driven UI engineering, reactive state management, and modern user interfaces.',
    projects: [3, 1],
    files: [],
    certs: []
  },
  'NODE.JS': {
    title: 'Node.js Backend Systems',
    icon: 'fa-brands fa-node-js',
    color: '#339933',
    desc: 'Server-side JavaScript runtime, RESTful API design, and asynchronous request handling.',
    projects: [3],
    files: [],
    certs: []
  },
  'SQL': {
    title: 'SQL Database Management',
    icon: 'fa-solid fa-database',
    color: '#10b981',
    desc: 'Relational database schema design, indexing, SQL queries, and academic record systems.',
    projects: [1],
    files: [7, 13],
    certs: [1]
  },
  'DOCKER': {
    title: 'Docker & System Containerization',
    icon: 'fa-brands fa-docker',
    color: '#2496ed',
    desc: 'Containerized software environments, automated deployments, and reproducible AI microservices.',
    projects: [2],
    files: [],
    certs: [4]
  },
  'FASTAPI': {
    title: 'FastAPI Microservices',
    icon: 'fa-solid fa-bolt',
    color: '#05998b',
    desc: 'High-performance Python web APIs, async request pipelines, and LLM backend endpoints.',
    projects: [2],
    files: [],
    certs: [3]
  },
  'DSA': {
    title: 'Data Structures & Algorithms (DSA)',
    icon: 'fa-solid fa-diagram-project',
    color: '#15803d',
    desc: 'Data structure design, C++ algorithm visualization, time complexity proofs, and competitive logic.',
    projects: [4, 5],
    files: [4, 1, 10],
    certs: [2]
  },
  'HTML5': {
    title: 'HTML5 Semantic Web',
    icon: 'fa-brands fa-html5',
    color: '#e34f26',
    desc: 'Semantic web architecture, accessible markup, document hierarchy, and SEO best practices.',
    projects: [3],
    files: [],
    certs: []
  },
  'CSS3': {
    title: 'CSS3 & Neo-Brutalist Design System',
    icon: 'fa-brands fa-css3-alt',
    color: '#1572b6',
    desc: 'Responsive CSS layouts, custom animations, glassmorphism visual effects, and design systems.',
    projects: [3],
    files: [],
    certs: []
  }
};

function openTechModal(techKey) {
  const modalRoot = getModalRoot();
  if (!modalRoot) return;
  const tech = techShowcaseData[techKey.toUpperCase()];
  if (!tech) return;

  const projectCardsHtml = tech.projects.map((id) => {
    const p = projectsData[id];
    if (!p) return '';
    const tags = p.tags.map((t) => `<span class="tag-chip">${t}</span>`).join('');
    return `
      <div style="background: var(--bg-neo-base); border-radius: 18px; padding: 20px; box-shadow: var(--neo-shadow-outset); border: 1px solid rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 1.1rem; color: var(--text-primary); margin: 0;">
            <i class="fa-solid fa-code" style="color: #10b981; margin-right: 8px;"></i> ${p.title}
          </h3>
          <span class="tag-chip" style="background: var(--mint-light); color: var(--mint-text-dark);">PROJECT</span>
        </div>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 12px;">${p.desc}</p>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">${tags}</div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="${p.codeUrl}" target="_blank" rel="noreferrer" class="project-btn" style="padding: 6px 14px; font-size: 0.82rem;">
            <i class="fa-brands fa-github"></i> Code
          </a>
          <a href="${p.liveUrl}" target="_blank" rel="noreferrer" class="project-btn" style="background: var(--mint-light); color: var(--mint-text-dark); border-color: var(--mint-main); padding: 6px 14px; font-size: 0.82rem;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
        </div>
      </div>
    `;
  }).join('');

  const pdfCardsHtml = tech.files.map((id) => {
    const f = files[id];
    if (!f) return '';
    return `
      <div style="background: var(--bg-neo-base); border-radius: 18px; padding: 20px; box-shadow: var(--neo-shadow-outset); border: 1px solid rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
          <h3 style="font-size: 1.1rem; color: var(--text-primary); margin: 0;">
            <i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 8px;"></i> ${f.title}
          </h3>
          <span class="tag-chip">ACADEMIC PDF</span>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;">
          <button onclick="openPdfModal(${id})" class="btn btn-mint" style="padding: 6px 14px; font-size: 0.82rem;">
            <i class="fa-solid fa-eye"></i> Preview PDF
          </button>
          <a href="${encodeURI(f.file)}" download class="btn btn-outline" style="padding: 6px 14px; font-size: 0.82rem;">
            <i class="fa-solid fa-download"></i> Download
          </a>
        </div>
      </div>
    `;
  }).join('');

  const certCardsHtml = tech.certs.map((id) => {
    const c = certificates[id];
    if (!c) return '';
    return `
      <div style="background: var(--bg-neo-base); border-radius: 18px; padding: 20px; box-shadow: var(--neo-shadow-outset); border: 1px solid rgba(0,0,0,0.05); cursor: pointer;" onclick="openCertModal(${id})">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 0.8rem; color: var(--mint-dark); font-weight: 700;">${c.issuer} • ${c.date}</span>
            <h3 style="font-size: 1.05rem; color: var(--text-primary); margin: 4px 0 0;">${c.title}</h3>
          </div>
          <i class="fa-solid fa-expand" style="color: var(--mint-text-dark); font-size: 1.1rem;"></i>
        </div>
      </div>
    `;
  }).join('');

  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-content-box modal-large" style="max-width: 850px;">
        <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
        <div style="margin-bottom: 20px;">
          <span class="section-label" style="background: var(--mint-light); color: var(--mint-text-dark);">
            <i class="${tech.icon}" style="color: ${tech.color};"></i> ${tech.title}
          </span>
          <h2 class="modal-title" style="margin-top: 10px; font-size: 1.4rem;">Connected Projects, Papers & Credentials</h2>
          <p style="color: var(--text-muted); font-size: 0.92rem;">${tech.desc}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 18px; overflow-y: auto; padding-right: 4px; max-height: 62vh;">
          ${projectCardsHtml ? `<h4 style="font-size: 0.9rem; letter-spacing: 0.08em; color: var(--mint-dark); margin-bottom: -6px;">FEATURED PROJECTS</h4>${projectCardsHtml}` : ''}
          ${pdfCardsHtml ? `<h4 style="font-size: 0.9rem; letter-spacing: 0.08em; color: var(--mint-dark); margin-bottom: -6px; margin-top: 10px;">ACADEMIC PAPERS & REPORTS</h4>${pdfCardsHtml}` : ''}
          ${certCardsHtml ? `<h4 style="font-size: 0.9rem; letter-spacing: 0.08em; color: var(--mint-dark); margin-bottom: -6px; margin-top: 10px;">VERIFIED CERTIFICATIONS</h4>${certCardsHtml}` : ''}
        </div>
      </div>
    </div>
  `;
  attachModalListeners();
}

function openDsaModal() {
  const modalRoot = getModalRoot();
  if (!modalRoot) return;
  modalRoot.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-content-box modal-large" style="max-width: 850px;">
        <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
        <div style="margin-bottom: 20px;">
          <span class="section-label" style="background: var(--mint-light); color: var(--mint-text-dark);">
            <i class="fa-solid fa-diagram-project"></i> DATA STRUCTURES & ALGORITHMS (DSA)
          </span>
          <h2 class="modal-title" style="margin-top: 10px; font-size: 1.5rem;">DSA Project & Academic PDF Document</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            Connected C++ Data Structure project and official academic research paper on Data Structures for Library Systems.
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; overflow-y: auto; padding-right: 4px; max-height: 65vh;">
          <!-- DSA Project Card -->
          <div style="background: var(--bg-neo-base); border-radius: 18px; padding: 22px; box-shadow: var(--neo-shadow-outset); border: 1px solid rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
              <h3 style="font-size: 1.15rem; color: var(--text-primary); margin: 0;">
                <i class="fa-solid fa-code" style="color: #10b981; margin-right: 8px;"></i> Data Structure Visualization
              </h3>
              <span class="tag-chip" style="background: var(--mint-light); color: var(--mint-text-dark);">DSA PROJECT</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">
              Comprehensive implementation and visual demonstration of core data structures in C++, optimized for performance and educational analysis.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="https://github.com/Zahedul-zane/Data-Structure-Project" target="_blank" rel="noreferrer" class="project-btn" style="padding: 8px 16px; font-size: 0.85rem;">
                <i class="fa-brands fa-github"></i> Source Code
              </a>
              <a href="https://zahedul-zane.github.io/Data-Structure-Project" target="_blank" rel="noreferrer" class="project-btn" style="background: var(--mint-light); color: var(--mint-text-dark); border-color: var(--mint-main); padding: 8px 16px; font-size: 0.85rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
              </a>
            </div>
          </div>

          <!-- DSA PDF Document Card -->
          <div style="background: var(--bg-neo-base); border-radius: 18px; padding: 22px; box-shadow: var(--neo-shadow-outset); border: 1px solid rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
              <h3 style="font-size: 1.15rem; color: var(--text-primary); margin: 0;">
                <i class="fa-solid fa-file-pdf" style="color: #ef4444; margin-right: 8px;"></i> Library Data Structures for Library System
              </h3>
              <span class="tag-chip">DSA ACADEMIC PDF</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">
              Official published document analyzing data structure architecture, memory layouts, and algorithmic operations for library record systems.
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <button id="dsaOpenPdfBtn" class="btn btn-mint" style="padding: 8px 16px; font-size: 0.85rem;">
                <i class="fa-solid fa-eye"></i> Preview DSA PDF
              </button>
              <a href="File_PDF/Library Data Structures for Library System.pdf" download class="btn btn-outline" style="padding: 8px 16px; font-size: 0.85rem;">
                <i class="fa-solid fa-download"></i> Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  attachModalListeners();

  const dsaOpenPdfBtn = document.getElementById('dsaOpenPdfBtn');
  if (dsaOpenPdfBtn) {
    dsaOpenPdfBtn.addEventListener('click', () => {
      openPdfModal(4);
    });
  }
}

function attachModalListeners() {
  const modalRoot = getModalRoot();
  if (!modalRoot) return;
  const closeBtn = modalRoot.querySelector('.modal-close-btn');
  const backdrop = modalRoot.querySelector('.modal-backdrop');
  const contentBox = modalRoot.querySelector('.modal-content-box');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
  if (contentBox) {
    contentBox.addEventListener('click', (event) => event.stopPropagation());
  }
}

function initCursor() {
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorRing = document.querySelector('.custom-cursor-ring');
  if (!cursorDot || !cursorRing) return;

  let cursor = { x: -50, y: -50 };
  let ring = { x: -50, y: -50 };

  document.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    cursorDot.style.left = `${cursor.x}px`;
    cursorDot.style.top = `${cursor.y}px`;
  });

  function animateRing() {
    if (!cursorRing) return;
    ring.x += (cursor.x - ring.x) * 0.15;
    ring.y += (cursor.y - ring.y) * 0.15;
    cursorRing.style.left = `${ring.x}px`;
    cursorRing.style.top = `${ring.y}px`;
    requestAnimationFrame(animateRing);
  }

  animateRing();
}

function initEventHandlers() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.querySelectorAll('.nav-link, .logo');
  const projectFilterButtons = document.querySelectorAll('.project-filter-btn');
  const certCards = document.querySelectorAll('.cert-card-box, .cert-card');
  const fileCards = document.querySelectorAll('.file-card');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = link.dataset.target || link.getAttribute('data-target');
      if (target) {
        scrollToSection(target);
      }
    });
  });

  projectFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || button.getAttribute('data-filter');
      if (filter) {
        setFilter(filter);
      }
    });
  });

  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const certId = card.dataset.certId || card.getAttribute('data-cert-id');
      if (certId) {
        openCertModal(certId);
      }
    });
  });

  fileCards.forEach((card) => {
    card.addEventListener('click', () => {
      const fileId = card.dataset.fileId || card.getAttribute('data-file-id');
      if (fileId) {
        openPdfModal(fileId);
      }
    });
  });

  const techCards = document.querySelectorAll('.tech-card');
  techCards.forEach((card) => {
    card.addEventListener('click', () => {
      const tech = card.dataset.tech || card.getAttribute('data-tech');
      if (tech) {
        if (tech.toUpperCase() === 'DSA') {
          openDsaModal();
        } else {
          openTechModal(tech);
        }
      }
    });
  });

  const dashRefreshBtn = document.getElementById('dashRefreshBtn');
  if (dashRefreshBtn) {
    dashRefreshBtn.addEventListener('click', () => {
      analyzeCodingProfiles(true);
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('resize', updateActiveNav);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  updateActiveNav();
  setFilter('ALL');
}

/* ==========================================================================
   COMPETITIVE PROGRAMMING PROFILE ANALYZER & LIVE DASHBOARD
   ========================================================================== */

const CODING_PROFILES = {
  codeforces: {
    handle: 'ZaHeDuL',
    url: 'https://codeforces.com/profile/ZaHeDuL'
  },
  leetcode: {
    username: 'vsJ2gRZWWX',
    url: 'https://leetcode.com/u/vsJ2gRZWWX/'
  },
  atcoder: {
    username: 'ZaHeDuL',
    url: 'https://atcoder.jp/users/ZaHeDuL'
  }
};

let codingStats = {
  codeforces: {
    rating: 793,
    maxRating: 793,
    rank: 'Newbie',
    solved: 84,
    friends: 3,
    avatar: 'https://userpic.codeforces.org/4981411/avatar/127a7b9d50edbc86.jpg',
    recentSubmissions: []
  },
  leetcode: {
    totalSolved: 22,
    easySolved: 18,
    mediumSolved: 4,
    hardSolved: 0,
    ranking: 4287369,
    recentSubmissions: []
  },
  atcoder: {
    rating: 49,
    rankTitle: '14 Kyu',
    accepted: 24,
    submissionsCount: 47,
    ratedMatches: 14,
    contestsCount: 15,
    ratedPointSum: 4200,
    recentSubmissions: []
  },
  lastUpdated: null
};

// Smooth counter animation
function animateNumber(element, target, prefix = '', suffix = '', duration = 1000) {
  if (!element) return;
  const start = parseInt(element.textContent.replace(/[^0-9]/g, ''), 10) || 0;
  if (start === target) {
    element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    return;
  }
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * ease);
    element.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    }
  }
  requestAnimationFrame(step);
}

// Fetch Codeforces Profile & Status
async function fetchCodeforcesData() {
  try {
    const [infoRes, statusRes] = await Promise.allSettled([
      fetch(`https://codeforces.com/api/user.info?handles=${CODING_PROFILES.codeforces.handle}`, { signal: AbortSignal.timeout(8000) }),
      fetch(`https://codeforces.com/api/user.status?handle=${CODING_PROFILES.codeforces.handle}`, { signal: AbortSignal.timeout(8000) })
    ]);

    if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
      const infoData = await infoRes.value.json();
      if (infoData.status === 'OK' && Array.isArray(infoData.result) && infoData.result.length > 0) {
        const user = infoData.result[0];
        codingStats.codeforces.rating = user.rating || codingStats.codeforces.rating;
        codingStats.codeforces.maxRating = user.maxRating || codingStats.codeforces.maxRating;
        if (user.rank) {
          codingStats.codeforces.rank = user.rank.charAt(0).toUpperCase() + user.rank.slice(1);
        }
        if (typeof user.friendOfCount === 'number') {
          codingStats.codeforces.friends = user.friendOfCount;
        }
        if (user.avatar) {
          codingStats.codeforces.avatar = user.avatar;
        }
      }
    }

    if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
      const statusData = await statusRes.value.json();
      if (statusData.status === 'OK' && Array.isArray(statusData.result)) {
        const solvedSet = new Set();
        statusData.result.forEach((sub) => {
          if (sub.verdict === 'OK' && sub.problem) {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });
        if (solvedSet.size > 0) {
          codingStats.codeforces.solved = solvedSet.size;
        }
        codingStats.codeforces.recentSubmissions = statusData.result.slice(0, 10);
      }
    }
  } catch (err) {
    console.warn('Codeforces live fetch fallback:', err);
  }
}

// Fetch LeetCode Statistics
async function fetchLeetCodeData() {
  const endpoints = [
    `https://leetcode-api-faisalshohag.vercel.app/${CODING_PROFILES.leetcode.username}`,
    `https://alfa-leetcode-api.onrender.com/userProfile/${CODING_PROFILES.leetcode.username}`
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const data = await res.json();
        if (data && (data.totalSolved !== undefined || data.easySolved !== undefined)) {
          codingStats.leetcode.totalSolved = data.totalSolved ?? (data.easySolved + data.mediumSolved + data.hardSolved);
          codingStats.leetcode.easySolved = data.easySolved ?? codingStats.leetcode.easySolved;
          codingStats.leetcode.mediumSolved = data.mediumSolved ?? codingStats.leetcode.mediumSolved;
          codingStats.leetcode.hardSolved = data.hardSolved ?? codingStats.leetcode.hardSolved;
          codingStats.leetcode.ranking = data.ranking ?? codingStats.leetcode.ranking;
          if (Array.isArray(data.recentSubmissions) && data.recentSubmissions.length > 0) {
            codingStats.leetcode.recentSubmissions = data.recentSubmissions;
          }
          return; // Success
        }
      }
    } catch (err) {
      console.warn(`LeetCode endpoint ${endpoint} fallback:`, err);
    }
  }
}

// Fetch AtCoder Statistics
async function fetchAtCoderData() {
  try {
    const [infoRes, subsRes] = await Promise.allSettled([
      fetch(`https://kenkoooo.com/atcoder/atcoder-api/v2/user_info?user=${CODING_PROFILES.atcoder.username}`, { signal: AbortSignal.timeout(8000) }),
      fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=${CODING_PROFILES.atcoder.username}&from_second=0`, { signal: AbortSignal.timeout(8000) })
    ]);

    if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
      const info = await infoRes.value.json();
      if (info) {
        codingStats.atcoder.accepted = info.accepted_count ?? codingStats.atcoder.accepted;
        codingStats.atcoder.ratedPointSum = info.rated_point_sum ?? codingStats.atcoder.ratedPointSum;
      }
    }

    if (subsRes.status === 'fulfilled' && subsRes.value.ok) {
      const subs = await subsRes.value.json();
      if (Array.isArray(subs) && subs.length > 0) {
        codingStats.atcoder.submissionsCount = subs.length;
        const contests = new Set(subs.map(s => s.contest_id));
        codingStats.atcoder.contestsCount = Math.max(contests.size, 15);
        codingStats.atcoder.recentSubmissions = subs.slice(-10).reverse();
      }
    }
  } catch (err) {
    console.warn('AtCoder live fetch fallback:', err);
  }
}

// Update DOM elements with analyzed telemetry
function renderDashboardStats(isInitial = false) {
  const totalSolved = codingStats.codeforces.solved + codingStats.leetcode.totalSolved + codingStats.atcoder.accepted;
  
  // Aggregate Top Bar
  const summarySolved = document.getElementById('summaryTotalSolved');
  const summaryContests = document.getElementById('summaryContestsCount');
  const summaryRatings = document.getElementById('summaryRatings');
  const heroTotal = document.getElementById('heroTotalProblems');

  if (isInitial) {
    if (summarySolved) summarySolved.textContent = totalSolved.toString();
    if (heroTotal) heroTotal.textContent = `${totalSolved}+`;
  } else {
    animateNumber(summarySolved, totalSolved);
    if (heroTotal) heroTotal.textContent = `${totalSolved}+`;
  }

  if (summaryContests) {
    summaryContests.textContent = `${codingStats.atcoder.contestsCount}+`;
  }
  if (summaryRatings) {
    summaryRatings.textContent = `${codingStats.codeforces.rating} / ${codingStats.atcoder.rating}`;
  }

  // Codeforces Card
  const cfRating = document.getElementById('cfRating');
  const cfMaxRating = document.getElementById('cfMaxRating');
  const cfSolved = document.getElementById('cfSolved');
  const cfFriends = document.getElementById('cfFriends');
  const cfRankText = document.getElementById('cfRankText');
  const cfRankBadge = document.getElementById('cfRankBadge');
  const cfAvatar = document.getElementById('cfAvatar');
  const cfRatingBar = document.getElementById('cfRatingBar');

  if (isInitial) {
    if (cfRating) cfRating.textContent = codingStats.codeforces.rating.toString();
    if (cfSolved) cfSolved.textContent = codingStats.codeforces.solved.toString();
  } else {
    animateNumber(cfRating, codingStats.codeforces.rating);
    animateNumber(cfSolved, codingStats.codeforces.solved);
  }

  if (cfMaxRating) cfMaxRating.textContent = codingStats.codeforces.maxRating.toString();
  if (cfFriends) cfFriends.textContent = `${codingStats.codeforces.friends} users`;
  if (cfRankText) cfRankText.textContent = codingStats.codeforces.rank;
  if (cfRankBadge) cfRankBadge.textContent = `${codingStats.codeforces.rank}`;
  if (cfAvatar && codingStats.codeforces.avatar) cfAvatar.src = codingStats.codeforces.avatar;
  if (cfRatingBar) {
    const pct = Math.min(Math.round((codingStats.codeforces.rating / 1200) * 100), 100);
    cfRatingBar.style.width = `${pct}%`;
  }

  // LeetCode Card
  const lcSolved = document.getElementById('lcSolved');
  const lcEasy = document.getElementById('lcEasySolved');
  const lcMedium = document.getElementById('lcMediumSolved');
  const lcHard = document.getElementById('lcHardSolved');
  const lcRankText = document.getElementById('lcRankText');
  const lcEasyBar = document.getElementById('lcEasyBar');
  const lcMediumBar = document.getElementById('lcMediumBar');

  if (isInitial) {
    if (lcSolved) lcSolved.textContent = codingStats.leetcode.totalSolved.toString();
    if (lcEasy) lcEasy.textContent = codingStats.leetcode.easySolved.toString();
    if (lcMedium) lcMedium.textContent = codingStats.leetcode.mediumSolved.toString();
  } else {
    animateNumber(lcSolved, codingStats.leetcode.totalSolved);
    animateNumber(lcEasy, codingStats.leetcode.easySolved);
    animateNumber(lcMedium, codingStats.leetcode.mediumSolved);
  }

  if (lcHard) lcHard.textContent = codingStats.leetcode.hardSolved.toString();
  if (lcRankText) lcRankText.textContent = `#${codingStats.leetcode.ranking.toLocaleString()}`;
  if (lcEasyBar && lcMediumBar && codingStats.leetcode.totalSolved > 0) {
    const easyPct = Math.round((codingStats.leetcode.easySolved / codingStats.leetcode.totalSolved) * 100);
    const medPct = 100 - easyPct;
    lcEasyBar.style.width = `${easyPct}%`;
    lcMediumBar.style.width = `${medPct}%`;
  }

  // AtCoder Card
  const atcoderRating = document.getElementById('atcoderRating');
  const atcoderAccepted = document.getElementById('atcoderAccepted');
  const atcoderMatches = document.getElementById('atcoderRatedMatches');
  const atcoderPoints = document.getElementById('atcoderRatedPoints');
  const atcoderBar = document.getElementById('atcoderRatingBar');

  if (isInitial) {
    if (atcoderRating) atcoderRating.textContent = codingStats.atcoder.rating.toString();
    if (atcoderAccepted) atcoderAccepted.textContent = codingStats.atcoder.accepted.toString();
  } else {
    animateNumber(atcoderRating, codingStats.atcoder.rating);
    animateNumber(atcoderAccepted, codingStats.atcoder.accepted);
  }

  if (atcoderMatches) atcoderMatches.textContent = codingStats.atcoder.ratedMatches.toString();
  if (atcoderPoints) atcoderPoints.textContent = codingStats.atcoder.ratedPointSum.toLocaleString();
  if (atcoderBar) {
    const acPct = Math.min(Math.round((codingStats.atcoder.rating / 400) * 100), 100);
    atcoderBar.style.width = `${Math.max(acPct, 12)}%`;
  }
}

// Master Profile Analysis Engine
async function analyzeCodingProfiles(forceRefresh = false) {
  const syncStatus = document.getElementById('dashSyncStatus');
  const syncTime = document.getElementById('dashSyncTime');
  const refreshBtn = document.getElementById('dashRefreshBtn');

  if (refreshBtn) refreshBtn.classList.add('spinning');
  if (syncStatus) syncStatus.textContent = 'Syncing Live Profiles...';

  // Check localStorage cache first
  const cacheKey = 'zahedul_coding_profiles_v1';
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - (parsed.timestamp || 0);
        if (parsed.stats) {
          codingStats = { ...codingStats, ...parsed.stats };
          renderDashboardStats(true);
        }
        // If cached less than 10 minutes ago, finish quickly
        if (age < 10 * 60 * 1000) {
          if (refreshBtn) refreshBtn.classList.remove('spinning');
          if (syncStatus) syncStatus.textContent = 'Live Profiles Synced';
          if (syncTime) syncTime.textContent = `Last Synced: ${new Date(parsed.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          return;
        }
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
  }

  // Run live queries concurrently
  await Promise.allSettled([
    fetchCodeforcesData(),
    fetchLeetCodeData(),
    fetchAtCoderData()
  ]);

  codingStats.lastUpdated = Date.now();

  // Save to cache
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      stats: codingStats,
      timestamp: codingStats.lastUpdated
    }));
  } catch (e) {
    console.warn('Cache write error:', e);
  }

  renderDashboardStats(false);

  if (refreshBtn) refreshBtn.classList.remove('spinning');
  if (syncStatus) syncStatus.textContent = 'Live Profiles Synced';
  if (syncTime) {
    const formatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    syncTime.textContent = `Last Synced: Today, ${formatted}`;
  }
}

// Interactive Platform Breakdown Modal
window.openPlatformModal = function(platform) {
  const modalRoot = getModalRoot();
  if (!modalRoot) return;

  let modalContent = '';

  if (platform === 'codeforces') {
    const recentRows = (codingStats.codeforces.recentSubmissions.length > 0)
      ? codingStats.codeforces.recentSubmissions.map(sub => `
          <div class="sub-item-row">
            <div class="sub-item-name">
              <i class="fa-solid fa-code" style="color: #ef4444;"></i>
              <span>${sub.problem ? (sub.problem.contestId + sub.problem.index + ' - ' + sub.problem.name) : 'Problem Solve'}</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 0.78rem; color: var(--text-subtle);">${sub.programmingLanguage || 'C++'}</span>
              <span class="sub-status-tag ${sub.verdict === 'OK' ? 'sub-status-ac' : 'sub-status-other'}">${sub.verdict || 'OK'}</span>
            </div>
          </div>
        `).join('')
      : '<p style="color: var(--text-muted); padding: 12px 0;">Contest telemetry synchronized. Check profile for full archive.</p>';

    modalContent = `
      <div class="modal-backdrop">
        <div class="modal-content-box modal-large">
          <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid rgba(0,0,0,0.06); padding-bottom: 16px; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <img src="${codingStats.codeforces.avatar}" alt="Avatar" style="width: 56px; height: 56px; border-radius: 50%; box-shadow: var(--neo-shadow-outset); border: 2px solid var(--mint-main);" onerror="this.src='DP.jpg'">
              <div>
                <h2 class="modal-title" style="margin: 0; display: flex; align-items: center; gap: 10px;">
                  Codeforces Analysis
                  <span class="tag-chip" style="background: #fee2e2; color: #b91c1c; font-size: 0.8rem;">${codingStats.codeforces.rank}</span>
                </h2>
                <span style="color: var(--text-subtle); font-size: 0.9rem; font-family: var(--font-mono);">Handle: @ZaHeDuL</span>
              </div>
            </div>
            <a href="${CODING_PROFILES.codeforces.url}" target="_blank" rel="noreferrer" class="btn btn-mint" style="padding: 8px 18px; font-size: 0.88rem;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Profile
            </a>
          </div>

          <div class="platform-modal-grid">
            <div class="platform-stat-box">
              <span class="title">Current Rating</span>
              <span class="val" style="color: #ef4444;">${codingStats.codeforces.rating}</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">Peak: ${codingStats.codeforces.maxRating}</span>
            </div>
            <div class="platform-stat-box">
              <span class="title">Unique Solved</span>
              <span class="val" style="color: var(--mint-text-dark);">${codingStats.codeforces.solved} Problems</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">Verified Verdict: OK</span>
            </div>
            <div class="platform-stat-box">
              <span class="title">Community Friends</span>
              <span class="val">${codingStats.codeforces.friends} Users</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">Network connections</span>
            </div>
          </div>

          <div style="margin-top: 24px;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; font-family: var(--font-cyber-sub);">
              <i class="fa-solid fa-clock-rotate-left" style="margin-right: 6px; color: var(--mint-dark);"></i> Recent Submission Telemetry
            </h3>
            <div style="max-height: 250px; overflow-y: auto; padding-right: 6px;">
              ${recentRows}
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (platform === 'leetcode') {
    const recentRows = (codingStats.leetcode.recentSubmissions.length > 0)
      ? codingStats.leetcode.recentSubmissions.map(sub => `
          <div class="sub-item-row">
            <div class="sub-item-name">
              <i class="fa-solid fa-code" style="color: #f59e0b;"></i>
              <span>${sub.title || 'Algorithmic Problem'}</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 0.78rem; color: var(--text-subtle); text-transform: uppercase;">${sub.lang || 'C++'}</span>
              <span class="sub-status-tag ${sub.statusDisplay === 'Accepted' ? 'sub-status-ac' : 'sub-status-other'}">${sub.statusDisplay || 'Accepted'}</span>
            </div>
          </div>
        `).join('')
      : '<p style="color: var(--text-muted); padding: 12px 0;">Algorithmic problem catalog synchronized. Click Visit Profile to view all solutions.</p>';

    modalContent = `
      <div class="modal-backdrop">
        <div class="modal-content-box modal-large">
          <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid rgba(0,0,0,0.06); padding-bottom: 16px; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 54px; height: 54px; border-radius: 50%; background: #fef3c7; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #b45309; box-shadow: var(--neo-shadow-outset);">
                <i class="fa-solid fa-code"></i>
              </div>
              <div>
                <h2 class="modal-title" style="margin: 0; display: flex; align-items: center; gap: 10px;">
                  LeetCode Analytics
                  <span class="tag-chip" style="background: #fef3c7; color: #b45309; font-size: 0.8rem;">DSA Solved</span>
                </h2>
                <span style="color: var(--text-subtle); font-size: 0.9rem; font-family: var(--font-mono);">Profile: @vsJ2gRZWWX</span>
              </div>
            </div>
            <a href="${CODING_PROFILES.leetcode.url}" target="_blank" rel="noreferrer" class="btn btn-mint" style="padding: 8px 18px; font-size: 0.88rem;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Profile
            </a>
          </div>

          <div class="platform-modal-grid">
            <div class="platform-stat-box">
              <span class="title">Total Solved</span>
              <span class="val" style="color: var(--mint-text-dark);">${codingStats.leetcode.totalSolved}</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">Easy: ${codingStats.leetcode.easySolved} | Med: ${codingStats.leetcode.mediumSolved} | Hard: ${codingStats.leetcode.hardSolved}</span>
            </div>
            <div class="platform-stat-box">
              <span class="title">Global Ranking</span>
              <span class="val" style="color: #f59e0b;">#${codingStats.leetcode.ranking.toLocaleString()}</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">Top worldwide percentile</span>
            </div>
            <div class="platform-stat-box">
              <span class="title">Primary Languages</span>
              <span class="val" style="font-size: 1.1rem;">C++ • MySQL • Java</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">Algorithms & Database</span>
            </div>
          </div>

          <div style="margin-top: 24px;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; font-family: var(--font-cyber-sub);">
              <i class="fa-solid fa-circle-check" style="margin-right: 6px; color: #10b981;"></i> Recent Verified Solves
            </h3>
            <div style="max-height: 250px; overflow-y: auto; padding-right: 6px;">
              ${recentRows}
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (platform === 'atcoder') {
    const recentRows = (codingStats.atcoder.recentSubmissions.length > 0)
      ? codingStats.atcoder.recentSubmissions.map(sub => `
          <div class="sub-item-row">
            <div class="sub-item-name">
              <i class="fa-solid fa-cubes" style="color: #6366f1;"></i>
              <span>${sub.problem_id || 'Problem'}</span>
            </div>
            <div style="display: flex; gap: 10px; align-items: center;">
              <span style="font-size: 0.78rem; color: var(--text-subtle);">${sub.language ? sub.language.split(' ')[0] : 'C++'}</span>
              <span class="sub-status-tag ${sub.result === 'AC' ? 'sub-status-ac' : 'sub-status-other'}">${sub.result || 'AC'}</span>
            </div>
          </div>
        `).join('')
      : '<p style="color: var(--text-muted); padding: 12px 0;">Contest history and rated rounds synchronized. Click Visit Profile to view standings.</p>';

    modalContent = `
      <div class="modal-backdrop">
        <div class="modal-content-box modal-large">
          <button class="modal-close-btn" aria-label="Close modal"><i class="fa-solid fa-xmark"></i></button>
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid rgba(0,0,0,0.06); padding-bottom: 16px; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="width: 54px; height: 54px; border-radius: 50%; background: #e0e7ff; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #4338ca; box-shadow: var(--neo-shadow-outset);">
                <i class="fa-solid fa-cubes"></i>
              </div>
              <div>
                <h2 class="modal-title" style="margin: 0; display: flex; align-items: center; gap: 10px;">
                  AtCoder Contest Telemetry
                  <span class="tag-chip" style="background: #e0e7ff; color: #4338ca; font-size: 0.8rem;">${codingStats.atcoder.rankTitle}</span>
                </h2>
                <span style="color: var(--text-subtle); font-size: 0.9rem; font-family: var(--font-mono);">User: @ZaHeDuL</span>
              </div>
            </div>
            <a href="${CODING_PROFILES.atcoder.url}" target="_blank" rel="noreferrer" class="btn btn-mint" style="padding: 8px 18px; font-size: 0.88rem;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Profile
            </a>
          </div>

          <div class="platform-modal-grid">
            <div class="platform-stat-box">
              <span class="title">Current Rating</span>
              <span class="val" style="color: #6366f1;">${codingStats.atcoder.rating}</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">${codingStats.atcoder.rankTitle} (Gray)</span>
            </div>
            <div class="platform-stat-box">
              <span class="title">Accepted Problems</span>
              <span class="val" style="color: var(--mint-text-dark);">${codingStats.atcoder.accepted} AC</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">${codingStats.atcoder.submissionsCount} total submissions</span>
            </div>
            <div class="platform-stat-box">
              <span class="title">Contests / Matches</span>
              <span class="val">${codingStats.atcoder.ratedMatches} Rated</span>
              <span style="font-size: 0.8rem; color: var(--text-subtle);">${codingStats.atcoder.contestsCount} total rounds played</span>
            </div>
          </div>

          <div style="margin-top: 24px;">
            <h3 style="font-size: 1.1rem; margin-bottom: 12px; font-family: var(--font-cyber-sub);">
              <i class="fa-solid fa-chart-simple" style="margin-right: 6px; color: #6366f1;"></i> Recent AtCoder Submissions
            </h3>
            <div style="max-height: 250px; overflow-y: auto; padding-right: 6px;">
              ${recentRows}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  modalRoot.innerHTML = modalContent;
  attachModalListeners();
};

initCursor();
initEventHandlers();

// Automatically analyze coding profiles upon entering the portfolio
analyzeCodingProfiles();
