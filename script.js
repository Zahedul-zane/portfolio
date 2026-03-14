// Neon Core System

// --- Cyber Quantum Core Background ---
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    
    const resizeCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let particles = [];
    const numParticles = Math.min(2500, Math.floor((width * height) / 400)); 
    
    let mouse = { x: -1000, y: -1000, radius: 250, active: false };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
    });
    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
    });

    const init = () => {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    };

    // Fast noise approximation
    const noise = (x, y, t) => {
        return Math.sin(x * 0.003 + t) + Math.sin(y * 0.003 - t) + Math.cos((x+y) * 0.002 + t);
    };

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = 0;
            this.vy = 0;
            this.size = Math.random() * 1.5 + 0.5;
            this.baseColor = Math.random() > 0.4 ? [0, 243, 255] : [188, 19, 254]; // Cyan & Purple
            this.color = `rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, ${Math.random() * 0.6 + 0.2})`;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 1.2 + 0.3;
        }

        update(time) {
            // Flow field calculation
            let n = noise(this.x, this.y, time * 0.3);
            this.angle = n * Math.PI * 2;
            
            // Apply base movement along the flow field
            let targetVx = Math.cos(this.angle) * this.speed;
            let targetVy = Math.sin(this.angle) * this.speed;

            // Interpolate for smooth turning
            this.vx += (targetVx - this.vx) * 0.1;
            this.vy += (targetVy - this.vy) * 0.1;

            // Mouse repulsion (Gravity/Vortex effect)
            if (mouse.active) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    // Ease out
                    force = force * force * force;
                    
                    let angleToMouse = Math.atan2(dy, dx);
                    
                    // Repel outward
                    this.vx -= Math.cos(angleToMouse) * force * 12;
                    this.vy -= Math.sin(angleToMouse) * force * 12;
                    
                    // Add tangent spin to create a vortex around the mouse
                    this.vx += Math.sin(angleToMouse) * force * 5;
                    this.vy -= Math.cos(angleToMouse) * force * 5;
                    
                    this.color = `rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, 1)`;
                    this.size = Math.random() * 1.5 + 1.0;
                } else {
                    this.color = `rgba(${this.baseColor[0]}, ${this.baseColor[1]}, ${this.baseColor[2]}, 0.5)`;
                    this.size = Math.max(0.5, this.size - 0.1);
                }
            }

            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Screen wrapping
            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let time = 0;
    const animate = () => {
        // Transparent trail effect: fade existing canvas pixels out rather than drawing black
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        // Draw the new particles on top additively
        ctx.globalCompositeOperation = 'lighter';

        time += 0.003;

        particles.forEach(p => {
            p.update(time);
            p.draw();
        });
        
        // Reset composite operation for the next frame
        ctx.globalCompositeOperation = 'source-over';

        requestAnimationFrame(animate);
    };

    init();
    animate();
}
// --- End Cyber Quantum Core Background ---

// DOM Elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cyberGrid = document.querySelector('.cyber-grid-bg');
const mouseGlow = document.querySelector('.mouse-glow');
const magneticElems = document.querySelectorAll('[data-magnetic]');
const scrollElements = document.querySelectorAll('.scroll-reveal');
const counters = document.querySelectorAll('.num');

// 1. Cyber Cursor & Grid Parallax
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    cursorDot.style.left = `${x}px`;
    cursorDot.style.top = `${y}px`;
    
    // Ring follows with delay
    cursorRing.animate({
        left: `${x}px`,
        top: `${y}px`
    }, { duration: 400, fill: "forwards" });

    // Parallax Grid
    if(cyberGrid) {
        // CSS handles the infinite synthwave moving animation now.
        // JS parallax removed to prevent transform property frame overwrites.
    }

    // Ambient mouse spotlight
    if(mouseGlow) {
        mouseGlow.style.left = `${x}px`;
        mouseGlow.style.top = `${y}px`;
    }
});

// Click Spark Effect
document.addEventListener('mousedown', () => {
    cursorRing.classList.add('click');
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
});
document.addEventListener('mouseup', () => {
    cursorRing.classList.remove('click');
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Drag to Scroll For Tech Stack
const stackTrack = document.getElementById('stack-track');
if (stackTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    stackTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        stackTrack.classList.add('active');
        // Pause animation when dragging
        stackTrack.style.animationPlayState = 'paused';
        startX = e.pageX - stackTrack.offsetLeft;
        scrollLeft = stackTrack.parentElement.scrollLeft;
    });

    stackTrack.addEventListener('mouseleave', () => {
        isDown = false;
        stackTrack.classList.remove('active');
        stackTrack.style.animationPlayState = 'running';
    });

    stackTrack.addEventListener('mouseup', () => {
        isDown = false;
        stackTrack.classList.remove('active');
        stackTrack.style.animationPlayState = 'running';
    });

    stackTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - stackTrack.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        // Instead of scrollLeft which depends on overflow, we manually translate 
        // Or better yet, we can use the parent's overflow scroll if we make the track wide
        // Let's implement actual CSS scrolling on the parent instead
        stackTrack.parentElement.scrollLeft = scrollLeft - walk;
    });
}

// Magnetic Force Field
magneticElems.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        
        // Active State Indicator
        cursorRing.classList.add('active');
    });

    elem.addEventListener('mouseleave', () => {
        elem.style.transform = 'translate(0, 0)';
        cursorRing.classList.remove('active');
    });
});

// 2. System Boot Animation (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stats')) {
                initCounters();
            }
        }
    });
}, { threshold: 0.15 });

// Init Styles for Scroll
scrollElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    observer.observe(el);
});

// 3. Data Parsing (Counters)
let counted = false;
function initCounters() {
    if (counted) return;
    counted = true;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-val');
        const duration = 1500; // ms
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
// 4. Certificate Modal
const modal = document.querySelector('.cert-modal');
const modalImg = document.querySelector('.modal-img');
const closeModal = document.querySelector('.close-modal');
const certItems = document.querySelectorAll('.cert-item');

certItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgUrl = item.getAttribute('data-cert-img');
        if (imgUrl) {
            modalImg.src = imgUrl;
            modal.classList.add('active');
            cursorRing.style.borderColor = '#00f3ff'; // Reset cursor
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// 5. Document Explorer
// The 'documents' array is now loaded from files.js

const fileListContainer = document.getElementById('dynamic-file-list');
const fileModal = document.querySelector('.file-modal');
const fileIframe = document.querySelector('.file-iframe');
const closeFileModal = document.querySelector('.close-file-modal');

if(fileListContainer) {
    fileListContainer.innerHTML = '';
    documents.forEach(doc => {
        let icon = '';
        if(doc.type === 'pdf') icon = 'fa-file-pdf';
        else if(doc.type === 'doc') icon = 'fa-file-word';
        else if(doc.type === 'xls') icon = 'fa-file-excel';
        else if(doc.type === 'ppt') icon = 'fa-file-powerpoint';
        else icon = 'fa-file';

        const a = document.createElement('a');
        a.href = '#';
        a.className = `file-item ${doc.type}`;
        a.setAttribute('data-magnetic', '');
        a.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <span>${doc.title}</span>
        `;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            fileModal.classList.add('active');
            // Reset custom cursor temporarily so they can interact with the iframe easily
            cursorRing.style.borderColor = '#00f3ff';
            
            // Set Modal Title
            const titleElem = document.getElementById('active-file-title');
            if(titleElem) titleElem.innerText = doc.title;

            if (doc.type === 'pdf') {
                // Browsers can open PDFs natively from relative/local paths
                fileIframe.src = doc.file;
            } else {
                // For Office files (doc, xls, ppt), we use the Google Docs Viewer embed.
                // Note: Google Docs Viewer REQUIRES the file to be hosted on a public URL.
                if (window.location.protocol === 'file:') {
                    // Local fallback: Create a blob document telling the user it only works hosted
                    const htmlContent = `
                        <div style="font-family: 'Rajdhani', sans-serif; padding: 40px; text-align: center; color: #333;">
                            <h2 style="color: #ff4d4d;">Cannot Preview Locally</h2>
                            <p>Office files (DOC, PPT, XLS) require a live server (like GitHub Pages or Vercel) to preview properly using the Google Docs Viewer.</p>
                            <p>To view this file right now, please open <b>${doc.file}</b> directly from your computer folders.</p>
                            <div style="margin-top: 20px;">
                                <a href="${doc.file}" download style="padding: 10px 20px; background: #00f3ff; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">Download / Open File</a>
                            </div>
                        </div>
                    `;
                    const blob = new Blob([htmlContent], { type: 'text/html' });
                    fileIframe.src = URL.createObjectURL(blob);
                } else {
                    // Hosted online: Use Google Docs Viewer
                    const publicUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + doc.file;
                    fileIframe.src = `https://docs.google.com/gview?url=${encodeURIComponent(publicUrl)}&embedded=true`;
                }
            }
        });

        fileListContainer.appendChild(a);
    });

    // Re-initialize hover effects for new elements
    const newMagneticElems = fileListContainer.querySelectorAll('[data-magnetic]');
    newMagneticElems.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            cursorRing.classList.add('active');
        });
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0, 0)';
            cursorRing.classList.remove('active');
        });
    });
}

if(closeFileModal) {
    closeFileModal.addEventListener('click', () => {
        fileModal.classList.remove('active');
        fileIframe.src = ''; // stop loading audio/video/iframe
    });
    fileModal.addEventListener('click', (e) => {
        if (e.target === fileModal) {
            fileModal.classList.remove('active');
            fileIframe.src = '';
        }
    });
}
