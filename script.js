// Neon Core System

// Initialize PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

// DOM Elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const mouseGlow = document.querySelector('.mouse-glow');
const magneticElems = document.querySelectorAll('[data-magnetic]');
const scrollElements = document.querySelectorAll('.scroll-reveal');
const counters = document.querySelectorAll('.num');
const headerLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');

// 0. Reveal Text Pre-processing
document.querySelectorAll('.reveal-text').forEach(el => {
    // Skip if already has spans (manually defined)
    if (el.children.length > 0) return;
    
    const text = el.innerText;
    el.innerHTML = '';
    text.split(' ').forEach((word, i) => {
        const span = document.createElement('span');
        span.innerText = word + (i < text.split(' ').length - 1 ? '\u00A0' : '');
        el.appendChild(span);
    });
});

// 1. Cyber Cursor & Grid Parallax
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    if (cursorDot) {
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;
    }
    
    if (cursorRing) {
        cursorRing.animate({
            left: `${x}px`,
            top: `${y}px`
        }, { duration: 400, fill: "forwards" });
    }

    if(mouseGlow) {
        mouseGlow.style.left = `${x}px`;
        mouseGlow.style.top = `${y}px`;
    }

    const mag = e.target.closest('[data-magnetic]');
    if(mag) {
        const rect = mag.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        
        // Smoother, more responsive magnetic pull
        mag.style.transition = 'transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)';
        mag.style.transform = `translate(${mx * 0.4}px, ${my * 0.4}px)`;
        if (cursorRing) cursorRing.classList.add('active');
    }
});

document.addEventListener('mouseout', (e) => {
    const mag = e.target.closest('[data-magnetic]');
    if(mag) {
        mag.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        mag.style.transform = 'translate(0, 0)';
        if (cursorRing) cursorRing.classList.remove('active');
    }
});

document.addEventListener('mousedown', () => {
    if (cursorRing) cursorRing.classList.add('click');
    if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
});
document.addEventListener('mouseup', () => {
    if (cursorRing) cursorRing.classList.remove('click');
    if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
});

// 1.5 Header Scroll Tracking
window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    headerLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

headerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a local anchor on the same page
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        } 
        // If it's an anchor to index.html from another page
        else if (href.includes('index.html#')) {
            const anchor = href.split('#')[1];
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || !window.location.pathname.includes('.html')) {
                e.preventDefault();
                const targetSection = document.querySelector('#' + anchor);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});

// 2. System Boot Animation (Unique Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'contact' || entry.target.classList.contains('persona-stats')) {
                initCounters();
            }
        }
    });
}, { threshold: 0.15 });

scrollElements.forEach(el => observer.observe(el));

// 2.5 3D Tilt Effect for Interactive Cards
function initTilt() {
    const cards = document.querySelectorAll('.card:not(.contributions-graph), .cred-card, .mini-project');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 12;
            const rotateY = (centerX - x) / 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}
initTilt();

// 2.6 Galactic Parallax Depth & Scroll Parallax
window.addEventListener('scroll', () => {
    const spiral = document.querySelector('.spiral-container');
    const scrolled = window.pageYOffset;

    if (spiral) {
        spiral.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.02}deg) scale(${1 + scrolled * 0.0002})`;
    }

    // Scroll Parallax for specific elements (like BUILDER text)
    document.querySelectorAll('[data-scroll-speed]').forEach(el => {
        const speed = el.getAttribute('data-scroll-speed');
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 3. Data Parsing (Counters)
let counted = false;
function initCounters() {
    if (counted) return;
    counted = true;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-val');
        const duration = 1500;
        const increment = target / (duration / 20);
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target;
                if(target > 20) counter.innerText += '+';
                if(target === 100) counter.innerText += '%';
                clearInterval(timer);
            } else {
                counter.innerText = Math.ceil(current);
            }
        }, 20);
    });
}

// 4. GitHub Contributions Mock Grid
const githubGrid = document.querySelector('.github-grid');
if (githubGrid) {
    for (let i = 0; i < 350; i++) {
        const dot = document.createElement('div');
        dot.className = 'grid-dot';
        if (Math.random() > 0.8) dot.classList.add('active');
        githubGrid.appendChild(dot);
    }
}

// 5. Certificate Modal Logic (Advanced Detailed Overlay)
const modal = document.querySelector('#cert-detail-modal');
const modalImg = modal ? modal.querySelector('.modal-img') : null;
const closeModal = modal ? modal.querySelector('.close-modal') : null;
const certBtns = document.querySelectorAll('.view-cert-btn');

let currentCertIdx = 0;
const certData = [];

if (modal) {
    certBtns.forEach((btn, idx) => {
        certData.push({
            img: btn.getAttribute('data-cert-img'),
            title: btn.getAttribute('data-title'),
            issuer: btn.getAttribute('data-issuer'),
            date: btn.getAttribute('data-date'),
            tags: btn.getAttribute('data-tags'),
            desc: btn.getAttribute('data-desc'),
            verify: btn.getAttribute('data-verify'),
            color: btn.closest('.cred-item') ? btn.closest('.cred-item').style.getPropertyValue('--c') : '#f97316'
        });
        
        btn.addEventListener('click', () => {
            currentCertIdx = idx;
            updateCertModal();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function updateCertModal() {
        const data = certData[currentCertIdx];
        if (!data) return;
        
        modalImg.src = data.img;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-issuer').innerText = data.issuer;
        document.getElementById('modal-issuer').style.color = data.color || '#f97316';
        document.getElementById('modal-date').innerText = data.date;
        document.getElementById('modal-description').innerText = data.desc;
        document.getElementById('modal-verify-code').innerText = data.verify;
        
        const verifyLink = document.getElementById('modal-verify-link');
        if (verifyLink) {
            verifyLink.href = `https://certificates.zahedul.dev/verify/${data.verify}`;
        }
        
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        if (data.tags) {
            data.tags.split(',').forEach(tag => {
                const span = document.createElement('span');
                span.innerText = tag.trim();
                tagsContainer.appendChild(span);
            });
        }
        
        document.getElementById('current-idx').innerText = currentCertIdx + 1;
        document.getElementById('total-idx').innerText = certData.length;
    }

    modal.querySelector('.nav-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentCertIdx = (currentCertIdx - 1 + certData.length) % certData.length;
        updateCertModal();
    });

    modal.querySelector('.nav-next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentCertIdx = (currentCertIdx + 1) % certData.length;
        updateCertModal();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal.click();
        if (e.key === 'ArrowLeft') modal.querySelector('.nav-prev').click();
        if (e.key === 'ArrowRight') modal.querySelector('.nav-next').click();
    });
}

// 7. Document Explorer & File Hub
const mainFileGrid = document.getElementById('main-file-grid');
const fileModal = document.querySelector('.file-modal');
const fileIframe = fileModal ? fileModal.querySelector('.file-iframe') : null;
const closeFileModal = fileModal ? fileModal.querySelector('.close-file-modal') : null;

function openFile(doc) {
    if (!fileModal) return;
    fileModal.classList.add('active');
    if (cursorRing) cursorRing.style.borderColor = 'var(--accent-secondary)';
    
    const titleElem = document.getElementById('active-file-title');
    if(titleElem) titleElem.innerText = doc.title;

    if (doc.type === 'pdf') {
        fileIframe.src = doc.file;
    } else {
        if (window.location.protocol === 'file:') {
            const htmlContent = `
                <div style="font-family: 'Inter', sans-serif; padding: 40px; text-align: center; color: #fff; background: #0f172a; height: 100vh;">
                    <h2 style="color: var(--accent-primary);">Cannot Preview Locally</h2>
                    <p>Office files require a live server to preview properly using Google Docs Viewer.</p>
                    <p>To view this file right now, please open <b>${doc.file}</b> directly.</p>
                    <div style="margin-top: 20px;">
                        <a href="${doc.file}" download style="padding: 12px 24px; background: var(--accent-secondary); color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">Download / Open File</a>
                    </div>
                </div>
            `;
            const blob = new Blob([htmlContent], { type: 'text/html' });
            fileIframe.src = URL.createObjectURL(blob);
        } else {
            const publicUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + doc.file;
            fileIframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(publicUrl)}&embedded=true`;
        }
    }
}

async function renderPDFThumbnail(url, canvas) {
    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.4 });
        const context = canvas.getContext('2d');
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;
        return true;
    } catch (error) {
        console.error("Error rendering PDF thumbnail:", error);
        return false;
    }
}

if(typeof documents !== 'undefined' && mainFileGrid) {
    mainFileGrid.innerHTML = '';
    documents.forEach(doc => {
        let icon = doc.type === 'pdf' ? 'fa-file-pdf' : 'fa-file';
        const card = document.createElement('div');
        card.className = 'card mini-project'; 
        const thumbContainerId = `thumb-${Math.random().toString(36).substr(2, 9)}`;
        
        card.innerHTML = `
            <div style="cursor:pointer; margin-bottom: 20px;">
                <div id="${thumbContainerId}" class="file-thumb-container" style="height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; overflow: hidden; border-radius: 8px; background: rgba(0,0,0,0.2);">
                    <i class="fa-solid ${icon}" style="font-size: 2.5rem; color: var(--accent-primary);"></i>
                </div>
                <h3 style="font-size: 1rem; color: #fff; margin-bottom: 5px;">${doc.title}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">${doc.type}_DOCUMENT</p>
            </div>
            <div class="project-actions" style="justify-content: center;">
                <button class="btn-visit" style="padding: 8px 20px; font-size: 0.75rem; border:none; cursor:pointer; width: 100%;">
                    <i class="fa-solid fa-eye"></i> OPEN_FILE
                </button>
            </div>
        `;
        
        if (doc.type === 'pdf') {
            const canvas = document.createElement('canvas');
            renderPDFThumbnail(doc.file, canvas).then(success => {
                if (success) {
                    const container = card.querySelector(`#${thumbContainerId}`);
                    if (container) { container.innerHTML = ''; container.appendChild(canvas); }
                }
            });
        }

        card.querySelector('div:first-child').addEventListener('click', () => openFile(doc));
        card.querySelector('.btn-visit').addEventListener('click', () => openFile(doc));
        mainFileGrid.appendChild(card);
    });
}

if(closeFileModal) {
    closeFileModal.addEventListener('click', () => {
        fileModal.classList.remove('active');
        fileIframe.src = ''; 
    });
    fileModal.addEventListener('click', (e) => {
        if (e.target === fileModal) {
            fileModal.classList.remove('active');
            fileIframe.src = '';
        }
    });
}
