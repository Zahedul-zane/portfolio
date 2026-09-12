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

initCursor();
initEventHandlers();
