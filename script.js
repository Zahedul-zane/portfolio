// ================================================================
//  CLAY MORPHISM PORTFOLIO – CORE INTERACTION SYSTEM
// ================================================================

// ── PDF.js worker ────────────────────────────────────────────────
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}

// ── DOM References ───────────────────────────────────────────────
const cursorDot    = document.querySelector('.cursor-dot');
const cursorRing   = document.querySelector('.cursor-ring');
const mouseGlow    = document.querySelector('.mouse-glow');
const magneticElems = document.querySelectorAll('[data-magnetic]');
const scrollElements = document.querySelectorAll('.scroll-reveal');
const counters     = document.querySelectorAll('.num');
const headerLinks  = document.querySelectorAll('.nav-link');
const allSections  = document.querySelectorAll('section[id]');
const themeToggleBtn = document.getElementById('theme-toggle');
const menuToggleBtn  = document.getElementById('menu-toggle');

// ================================================================
//  THEME CONFIGURATION – PERMANENT LIGHT MODE
// ================================================================
function initThemeToggle() {
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
}

// ================================================================
//  MOBILE MENU
// ================================================================
function initMobileMenu() {
    if (!menuToggleBtn) return;
    menuToggleBtn.addEventListener('click', () => {
        const nav = document.querySelector('.top-nav');
        if (nav) nav.classList.toggle('open');
    });
}

// ── Init on DOMContentLoaded ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
    init3DEntry();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initThemeToggle();
    initMobileMenu();
}

// ================================================================
//  REVEAL-TEXT PRE-PROCESSING
// ================================================================
document.querySelectorAll('.reveal-text').forEach(el => {
    if (el.children.length > 0) return; // already wrapped
    const text = el.innerText;
    el.innerHTML = '';
    text.split(' ').forEach((word, i, arr) => {
        const span = document.createElement('span');
        span.innerText = word + (i < arr.length - 1 ? '\u00A0' : '');
        el.appendChild(span);
    });
});

// ================================================================
//  GOOEY VELOCITY-BASED CURSOR
// ================================================================
let prevCX = 0, prevCY = 0;
let cursorVX = 0, cursorVY = 0;
let cursorAngle = 0;
let cursorStretch = 1;
let rafCursor = null;

function updateCursorDeformation() {
    const speed = Math.sqrt(cursorVX * cursorVX + cursorVY * cursorVY);
    const maxStretch = 1.85;
    const maxSpeed   = 22;

    // Target stretch based on speed
    const targetStretch = 1 + Math.min(speed / maxSpeed, 1) * (maxStretch - 1);
    // Target angle based on velocity direction
    const targetAngle   = Math.atan2(cursorVY, cursorVX) * (180 / Math.PI);

    // Smooth lerp toward targets
    cursorStretch += (targetStretch - cursorStretch) * 0.14;
    if (speed > 0.5) {
        cursorAngle  += (targetAngle  - cursorAngle)  * 0.18;
    }

    if (cursorDot) {
        const w = 10 * cursorStretch;
        const h = 10 / cursorStretch;
        cursorDot.style.width  = `${w}px`;
        cursorDot.style.height = `${h}px`;
        cursorDot.style.transform = `translate(-50%, -50%) rotate(${cursorAngle}deg)`;
        cursorDot.style.borderRadius = `${50 / cursorStretch}%`;
    }
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Velocity
    cursorVX = x - prevCX;
    cursorVY = y - prevCY;
    prevCX = x; prevCY = y;

    // Move dot instantly
    if (cursorDot) {
        cursorDot.style.left = `${x}px`;
        cursorDot.style.top  = `${y}px`;
    }

    // Move ring with slight lag
    if (cursorRing) {
        cursorRing.animate(
            { left: `${x}px`, top: `${y}px` },
            { duration: 320, fill: 'forwards', easing: 'cubic-bezier(0.23,1,0.32,1)' }
        );
    }

    if (mouseGlow) {
        mouseGlow.style.left = `${x}px`;
        mouseGlow.style.top  = `${y}px`;
    }

    // Magnetic pull on data-magnetic elements
    const mag = e.target.closest('[data-magnetic]');
    if (mag) {
        const rect = mag.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width  / 2;
        const my = e.clientY - rect.top  - rect.height / 2;
        mag.style.transition = 'transform 0.12s cubic-bezier(0.23,1,0.32,1)';
        mag.style.transform  = `translate(${mx * 0.38}px, ${my * 0.38}px)`;
        if (cursorRing) cursorRing.classList.add('active');
    }

    // Deform cursor shape
    if (rafCursor) cancelAnimationFrame(rafCursor);
    rafCursor = requestAnimationFrame(updateCursorDeformation);
});

document.addEventListener('mouseout', (e) => {
    const mag = e.target.closest('[data-magnetic]');
    if (mag) {
        mag.style.transition = 'transform 0.55s cubic-bezier(0.23,1,0.32,1)';
        mag.style.transform  = 'translate(0,0)';
        if (cursorRing) cursorRing.classList.remove('active');
    }
});

document.addEventListener('mousedown', () => {
    if (cursorRing) cursorRing.classList.add('click');
    if (cursorDot) cursorDot.style.transform = `translate(-50%, -50%) scale(1.6)`;
});

document.addEventListener('mouseup', () => {
    if (cursorRing) cursorRing.classList.remove('click');
    if (cursorDot) cursorDot.style.transform = `translate(-50%, -50%) scale(1)`;
});

// ================================================================
//  HEADER SCROLL TRACKING & ACTIVE LINK
// ================================================================
window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 220) {
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
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        } else if (href.includes('index.html#')) {
            const anchor = href.split('#')[1];
            const isIndex = window.location.pathname.endsWith('index.html')
                         || window.location.pathname === '/'
                         || !window.location.pathname.includes('.html');
            if (isIndex) {
                e.preventDefault();
                const target = document.querySelector('#' + anchor);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ================================================================
//  BUBBLE PUFF-IN SCROLL REVEAL (IntersectionObserver)
// ================================================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.id === 'contact' ||
                entry.target.classList.contains('persona-stats')) {
                initCounters();
            }
        }
    });
}, { threshold: 0.12 });

scrollElements.forEach(el => revealObserver.observe(el));

// ================================================================
//  CARD TILT + GLARE (2D parallax on hover)
// ================================================================
function initTilt() {
    const cards = document.querySelectorAll(
        '.card:not(.contributions-graph), .cred-card, .mini-project, .project-card-premium'
    );

    cards.forEach(card => {
        // Inject glare layer
        if (!card.querySelector('.card-glare')) {
            const glare = document.createElement('div');
            glare.className = 'card-glare';
            card.appendChild(glare);
        }

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width  / 2;
            const cy = rect.height / 2;

            // Gentle 2D shift (max ±10px)
            const moveX = (x - cx) / (rect.width  / 20);
            const moveY = (y - cy) / (rect.height / 20);

            // Glare position
            card.style.setProperty('--x', `${(x / rect.width)  * 100}%`);
            card.style.setProperty('--y', `${(y / rect.height) * 100}%`);

            // Only apply fine-grained translate during hover – don't override the hover scale/lift
            card.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translate(0,0) scale(1)';
        });
    });
}

initTilt();

// ================================================================
//  STAGGERED CARD ENTRY ANIMATION
// ================================================================
function init3DEntry() {
    const elements = document.querySelectorAll(
        '.card:not(.contributions-graph), .project-card-premium, .cred-item'
    );
    elements.forEach(el => el.classList.add('animate-3d-entry'));

    setTimeout(() => {
        elements.forEach((el, idx) => {
            setTimeout(() => el.classList.add('loaded'), idx * 65);
        });
    }, 200);
}

// ================================================================
//  CONCENTRIC ORBITS – HERO (with clay bobbing)
// ================================================================
function initOrbits() {
    const container = document.querySelector('.orbit-container');
    if (!container) return;
    const icons = container.querySelectorAll('.tech-icon');
    if (!icons.length) return;

    const orbitsConfig = [
        { radius: 135, dir: 1,  speed: 0.0065 },
        { radius: 205, dir: -1, speed: 0.0048 },
        { radius: 275, dir: 1,  speed: 0.0032 },
    ];

    const items = [];
    icons.forEach((icon, i) => {
        const orbitIdx = i % 3;
        const config   = orbitsConfig[orbitIdx];
        let iconsInOrbit = 0;
        icons.forEach((_, j) => { if (j % 3 === orbitIdx) iconsInOrbit++; });
        const posIdx = Math.floor(i / 3);
        const angle  = (posIdx * 2 * Math.PI) / iconsInOrbit;

        items.push({
            el: icon,
            radius: config.radius,
            dir:    config.dir,
            speed:  config.speed,
            angle:  angle,
            bobPhase: Math.random() * Math.PI * 2,
            bobSpeed: 0.018 + Math.random() * 0.012,
            bobAmp:   6 + Math.random() * 5,
        });
    });

    function loop() {
        items.forEach(item => {
            item.angle    += item.speed * item.dir;
            item.bobPhase += item.bobSpeed;

            const x     = item.radius * Math.cos(item.angle);
            const rawY  = item.radius * Math.sin(item.angle);
            // clay bobbing – add vertical oscillation
            const bob   = Math.sin(item.bobPhase) * item.bobAmp;
            const y     = rawY + bob;

            // Depth cue via sine of angle
            const depth   = Math.sin(item.angle);
            const scale   = 0.82 + depth * 0.18;
            const opacity = 0.60 + depth * 0.40;

            item.el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            item.el.style.opacity   = opacity;
            item.el.style.zIndex    = Math.round((depth + 1) * 10).toString();
        });
        requestAnimationFrame(loop);
    }

    loop();

    // Container parallax drift with mouse
    document.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        if (!rect.width) return;
        const normX = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
        const normY = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
        container.style.transform =
            `translate(calc(-50% + ${normX * 14}px), calc(-50% + ${normY * 14}px))`;
    });
}

initOrbits();

// ================================================================
//  FORGE TECH GALAXY – MOUSE PARALLAX
// ================================================================
function initForge() {
    const forge  = document.querySelector('.forge-container');
    const galaxy = document.querySelector('.tech-galaxy');
    if (!forge || !galaxy) return;

    forge.addEventListener('mousemove', (e) => {
        const rect = forge.getBoundingClientRect();
        const x    = (e.clientX - rect.left  - rect.width  / 2) / 12;
        const y    = (e.clientY - rect.top   - rect.height / 2) / 12;
        galaxy.style.transform = `translate(${x}px, ${y}px)`;
    });

    forge.addEventListener('mouseleave', () => {
        galaxy.style.transform = 'translate(0,0)';
    });
}

initForge();

// ================================================================
//  SCROLL PARALLAX (builder text + spiral)
// ================================================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const spiral   = document.querySelector('.spiral-container');
    if (spiral) {
        spiral.style.transform =
            `translate(-50%,-50%) rotate(${scrolled * 0.02}deg) scale(${1 + scrolled * 0.0002})`;
    }
    document.querySelectorAll('[data-scroll-speed]').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-scroll-speed'));
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ================================================================
//  COUNTERS
// ================================================================
let counted = false;
function initCounters() {
    if (counted) return;
    counted = true;

    counters.forEach(counter => {
        const target    = +counter.getAttribute('data-val');
        const duration  = 1600;
        const increment = target / (duration / 20);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target + (target > 20 ? '+' : '') + (target === 100 ? '%' : '');
                clearInterval(timer);
            } else {
                counter.innerText = Math.ceil(current);
            }
        }, 20);
    });
}

// ================================================================
//  GITHUB CONTRIBUTION GRID (mock)
// ================================================================
const githubGrid = document.querySelector('.github-grid');
if (githubGrid) {
    for (let i = 0; i < 350; i++) {
        const dot = document.createElement('div');
        dot.className = 'grid-dot';
        if (Math.random() > 0.78) dot.classList.add('active');
        githubGrid.appendChild(dot);
    }
}

// ================================================================
//  CERTIFICATE MODAL
// ================================================================
const modal      = document.querySelector('#cert-detail-modal');
const modalImg   = modal ? modal.querySelector('.modal-img')    : null;
const closeModal = modal ? modal.querySelector('.close-modal')  : null;
const certBtns   = document.querySelectorAll('.view-cert-btn');

let currentCertIdx = 0;
const certData = [];

if (modal) {
    certBtns.forEach((btn, idx) => {
        certData.push({
            img:    btn.getAttribute('data-cert-img'),
            title:  btn.getAttribute('data-title'),
            issuer: btn.getAttribute('data-issuer'),
            date:   btn.getAttribute('data-date'),
            tags:   btn.getAttribute('data-tags'),
            desc:   btn.getAttribute('data-desc'),
            verify: btn.getAttribute('data-verify'),
            color:  btn.closest('.cred-item')
                      ? btn.closest('.cred-item').style.getPropertyValue('--c')
                      : '#f97316',
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
        document.getElementById('modal-title').innerText   = data.title;
        document.getElementById('modal-issuer').innerText  = data.issuer;
        document.getElementById('modal-issuer').style.color = data.color || '#f97316';
        document.getElementById('modal-date').innerText    = data.date;
        document.getElementById('modal-description').innerText = data.desc;
        document.getElementById('modal-verify-code').innerText = data.verify;

        const verifyLink = document.getElementById('modal-verify-link');
        if (verifyLink) {
            verifyLink.href = `https://certificates.zahedul.dev/verify/${data.verify}`;
        }

        const tagsEl = document.getElementById('modal-tags');
        tagsEl.innerHTML = '';
        if (data.tags) {
            data.tags.split(',').forEach(tag => {
                const span = document.createElement('span');
                span.innerText = tag.trim();
                tagsEl.appendChild(span);
            });
        }

        document.getElementById('current-idx').innerText = currentCertIdx + 1;
        document.getElementById('total-idx').innerText   = certData.length;
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
        if (e.key === 'Escape')      closeModal.click();
        if (e.key === 'ArrowLeft')   modal.querySelector('.nav-prev').click();
        if (e.key === 'ArrowRight')  modal.querySelector('.nav-next').click();
    });
}

// ================================================================
//  FILE EXPLORER / DOCUMENT HUB
// ================================================================
const mainFileGrid  = document.getElementById('main-file-grid');
const fileModal     = document.querySelector('.file-modal');
const fileIframe    = fileModal ? fileModal.querySelector('.file-iframe')    : null;
const closeFileModal = fileModal ? fileModal.querySelector('.close-file-modal') : null;

function openFile(doc) {
    if (!fileModal) return;
    fileModal.classList.add('active');
    if (cursorRing) cursorRing.style.borderColor = 'var(--accent-secondary)';

    const titleElem = document.getElementById('active-file-title');
    if (titleElem) titleElem.innerText = doc.title;

    if (doc.type === 'pdf') {
        fileIframe.src = doc.file;
    } else {
        if (window.location.protocol === 'file:') {
            const html = `
                <div style="font-family:'Comfortaa',sans-serif;padding:40px;text-align:center;
                            color:var(--text-main);background:var(--bg-canvas);height:100vh;">
                    <h2 style="color:var(--accent-primary);margin-bottom:16px;">Cannot Preview Locally</h2>
                    <p style="color:var(--text-muted);">Office files require a live server.</p>
                    <p style="margin-top:8px;color:var(--text-muted);">Open <b>${doc.file}</b> directly.</p>
                    <div style="margin-top:28px;">
                        <a href="${doc.file}" download
                           style="padding:14px 28px;background:var(--accent-primary);color:#fff;
                                  text-decoration:none;border-radius:100px;font-weight:800;">
                            Download / Open File
                        </a>
                    </div>
                </div>`;
            fileIframe.src = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
        } else {
            const publicUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + doc.file;
            fileIframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(publicUrl)}&embedded=true`;
        }
    }
}

async function renderPDFThumbnail(url, canvas) {
    try {
        const pdf  = await pdfjsLib.getDocument(url).promise;
        const page = await pdf.getPage(1);
        const vp   = page.getViewport({ scale: 0.4 });
        canvas.height = vp.height;
        canvas.width  = vp.width;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        return true;
    } catch (err) {
        console.error('PDF thumbnail error:', err);
        return false;
    }
}

if (typeof documents !== 'undefined' && mainFileGrid) {
    mainFileGrid.innerHTML = '';

    documents.forEach(doc => {
        const icon = doc.type === 'pdf' ? 'fa-file-pdf' : 'fa-file';
        const card = document.createElement('div');
        card.className = 'card mini-project';
        const thumbId = `thumb-${Math.random().toString(36).substr(2, 9)}`;

        card.innerHTML = `
            <div style="cursor:pointer;margin-bottom:18px;">
                <div id="${thumbId}" class="file-thumb-container">
                    <i class="fa-solid ${icon}" style="font-size:2.8rem;color:var(--accent-primary);"></i>
                </div>
                <h3 style="font-size:0.95rem;color:var(--text-main);margin-bottom:5px;
                           font-family:var(--font-display);line-height:1.4;">${doc.title}</h3>
                <p style="font-size:0.75rem;color:var(--text-muted);text-transform:uppercase;
                          letter-spacing:1px;font-weight:700;">${doc.type}_DOCUMENT</p>
            </div>
            <div class="project-actions" style="justify-content:center;">
                <button class="btn-visit"
                        style="width:100%;justify-content:center;padding:11px 20px;">
                    <i class="fa-solid fa-eye"></i> OPEN_FILE
                </button>
            </div>`;

        if (doc.type === 'pdf') {
            const cvs = document.createElement('canvas');
            renderPDFThumbnail(doc.file, cvs).then(ok => {
                if (ok) {
                    const container = card.querySelector(`#${thumbId}`);
                    if (container) { container.innerHTML = ''; container.appendChild(cvs); }
                }
            });
        }

        card.querySelector('div:first-child').addEventListener('click', () => openFile(doc));
        card.querySelector('.btn-visit').addEventListener('click', () => openFile(doc));
        mainFileGrid.appendChild(card);
    });

    // Re-init tilt for dynamically created file cards
    setTimeout(initTilt, 400);
}

if (closeFileModal) {
    closeFileModal.addEventListener('click', () => {
        fileModal.classList.remove('active');
        fileIframe.src = '';
        if (cursorRing) cursorRing.style.borderColor = '';
    });

    fileModal.addEventListener('click', (e) => {
        if (e.target === fileModal) {
            fileModal.classList.remove('active');
            fileIframe.src = '';
            if (cursorRing) cursorRing.style.borderColor = '';
        }
    });
}
