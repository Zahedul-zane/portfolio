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

// 2.5 3D Tilt Effect for Interactive Cards with Glare (Integrated with Pitch Physics)
function initTilt() {
    const cards = document.querySelectorAll('.card:not(.contributions-graph), .cred-card, .mini-project, .project-card-premium');
    cards.forEach(card => {
        // Create glare element dynamically if not present
        if (!card.querySelector('.card-glare')) {
            const glare = document.createElement('div');
            glare.className = 'card-glare';
            card.appendChild(glare);
        }

        // Initialize tilt datasets for the physics loop
        card.dataset.hoverX = "0";
        card.dataset.hoverY = "0";
        card.dataset.activeScale = "1";

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            card.style.setProperty('--x', `${xPercent}%`);
            card.style.setProperty('--y', `${yPercent}%`);
            
            // Set datasets for unified physics pipeline
            card.dataset.hoverX = rotateX.toString();
            card.dataset.hoverY = rotateY.toString();
            card.dataset.activeScale = "1.02";
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset datasets
            card.dataset.hoverX = "0";
            card.dataset.hoverY = "0";
            card.dataset.activeScale = "1";
        });
    });
}
initTilt();

// 2.52 Scroll Velocity 3D Pitch Physics with Layout Caching
let cachedPitchItems = [];
function cachePitchItems() {
    cachedPitchItems = Array.from(document.querySelectorAll('.card:not(.contributions-graph), .cred-card, .mini-project, .project-card-premium'));
}

let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let targetPitch = 0;
let currentPitch = 0;
let isScrolling = false;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Pitch bends X-axis based on scroll speed (capped at [-10, 10] degrees)
    targetPitch = Math.min(Math.max(scrollVelocity * 0.06, -10), 10);
    isScrolling = true;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        targetPitch = 0;
        isScrolling = false;
    }, 70);
});

function updateScrollPitch() {
    requestAnimationFrame(updateScrollPitch);
    
    // Smooth damp towards target
    currentPitch += (targetPitch - currentPitch) * 0.12;

    if (Math.abs(currentPitch) > 0.01 || isScrolling) {
        const len = cachedPitchItems.length;
        for (let i = 0; i < len; i++) {
            const item = cachedPitchItems[i];
            const rect = item.getBoundingClientRect();
            // Optimize: only apply transform to items in viewport
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const hoverX = parseFloat(item.dataset.hoverX) || 0;
                const hoverY = parseFloat(item.dataset.hoverY) || 0;
                const activeScale = parseFloat(item.dataset.activeScale) || 1;

                const totalRotX = hoverX + currentPitch;
                item.style.transform = `perspective(1000px) rotateX(${totalRotX}deg) rotateY(${hoverY}deg) scale3d(${activeScale}, ${activeScale}, ${activeScale})`;
            }
        }
    }
}
updateScrollPitch();

// 2.53 Staggered 3D Cascading Entry Loader
function init3DEntry() {
    const elements = document.querySelectorAll('.card:not(.contributions-graph), .project-card-premium, .cred-item');
    elements.forEach(el => {
        el.classList.add('animate-3d-entry');
    });

    setTimeout(() => {
        elements.forEach((el, idx) => {
            setTimeout(() => {
                el.classList.add('loaded');
            }, idx * 60);
        });
    }, 150);
}

// 2.55 3D Tech Icons Sphere
function init3DSphere() {
    const container = document.querySelector('.orbit-container');
    if (!container) return;
    const icons = container.querySelectorAll('.tech-icon');
    if (!icons.length) return;

    let radius = 240;
    let count = icons.length;
    let angleX = 0.003;
    let angleY = 0.003;
    let elements = [];

    // Distribute icons over the sphere coordinates
    icons.forEach((icon, i) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        elements.push({
            el: icon,
            x: x,
            y: y,
            z: z
        });
    });

    function rotateSphere() {
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        elements.forEach(item => {
            // Rotate around Y-axis
            let x1 = item.x * cosY - item.z * sinY;
            let z1 = item.z * cosY + item.x * sinY;
            
            // Rotate around X-axis
            let y2 = item.y * cosX - z1 * sinX;
            let z2 = z1 * cosX + item.y * sinX;

            item.x = x1;
            item.y = y2;
            item.z = z2;

            // Scale based on Z depth
            const scale = (item.z + radius * 1.5) / (radius * 2.5);
            const opacity = 0.2 + 0.8 * scale;

            item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, ${item.z}px) scale(${scale})`;
            item.el.style.opacity = opacity;
            item.el.style.zIndex = Math.round(item.z + 100).toString();
        });
    }

    let animId;
    function render() {
        rotateSphere();
        animId = requestAnimationFrame(render);
    }
    render();

    // Mouse drag controls to rotate/spin
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) {
            // Hover parallax influence
            const rect = container.getBoundingClientRect();
            const mx = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
            const my = (e.clientY - rect.top - rect.height/2) / (rect.height/2);
            angleX = my * 0.003;
            angleY = -mx * 0.003;
            return;
        }

        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;

        angleY = deltaX * 0.004;
        angleX = -deltaY * 0.004;

        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    // Touch support for mobile devices
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;

        angleY = deltaX * 0.006;
        angleX = -deltaY * 0.006;

        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
    });
}
init3DSphere();

// 2.56 3D Gyroscopic Forge Galaxy Interaction
function initForge3D() {
    const forge = document.querySelector('.forge-container');
    const galaxy = document.querySelector('.tech-galaxy');
    if (!forge || !galaxy) return;

    forge.addEventListener('mousemove', (e) => {
        const rect = forge.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Incline the galaxy based on cursor coordinates
        const rotateX = -y / 18;
        const rotateY = x / 18;

        galaxy.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    forge.addEventListener('mouseleave', () => {
        galaxy.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}
initForge3D();

// Run cache and staggering entries on load
document.addEventListener('DOMContentLoaded', () => {
    cachePitchItems();
    init3DEntry();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    cachePitchItems();
    init3DEntry();
}

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
