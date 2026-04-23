// Neon Core System

// --- Cyber Quantum Core Background (Disabled: Using Video) ---
// Canvas logic removed to optimize performance.

// Initialize PDF.js worker
if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
}


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

    // Ambient mouse spotlight
    if(mouseGlow) {
        mouseGlow.style.left = `${x}px`;
        mouseGlow.style.top = `${y}px`;
    }

    // Dynamic Magnetic Force Field (Event Delegation)
    const mag = e.target.closest('[data-magnetic]');
    if(mag) {
        const rect = mag.getBoundingClientRect();
        const mx = e.clientX - rect.left - rect.width / 2;
        const my = e.clientY - rect.top - rect.height / 2;
        mag.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px)`;
        cursorRing.classList.add('active');
    }
});

// Reset Magnetic on mouseout
document.addEventListener('mouseout', (e) => {
    const mag = e.target.closest('[data-magnetic]');
    if(mag) {
        mag.style.transform = 'translate(0, 0)';
        cursorRing.classList.remove('active');
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

// Header Navigation Mapping
const headerLinks = document.querySelectorAll('.nav-link');
headerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        let targetId = '';
        
        if (href === '#home') targetId = 'home-view';
        else if (href === '#profile') targetId = 'home-view'; // Scroll to profile part?
        else if (href === '#work') targetId = 'projects-overview';
        else if (href === '#certificates') targetId = 'certs-overview';
        else if (href === '#explorer') targetId = 'files-view';
        
        if (targetId) {
            const sidebarItem = document.querySelector(`[data-target="${targetId}"]`);
            if (sidebarItem) sidebarItem.click();
        }
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
// 5. Certificate Modal Logic (Updated for Layout)
const modal = document.querySelector('.cert-modal');
const modalImg = document.querySelector('.modal-img');
const closeModal = document.querySelector('.close-modal');
const certBtns = document.querySelectorAll('.view-cert-btn');

certBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const imgUrl = btn.getAttribute('data-cert-img');
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

// 6. Sidebar Logic & Dynamic Content Switching
const folderHeaders = document.querySelectorAll('.folder-header');
const contentSections = document.querySelectorAll('.content-section');

// Central Switch Function
function switchView(targetId, activeElement) {
    if(!targetId) return;
    
    // Clear all active states
    document.querySelectorAll('.tree-item, .folder-header, .side-nav-btn, .nav-link').forEach(el => {
        el.classList.remove('active');
    });
    contentSections.forEach(s => s.classList.remove('active'));

    // Set new active state
    if(activeElement) {
        activeElement.classList.add('active');
        
        // If it's a child of a folder, make sure the folder is open
        const parentFolder = activeElement.closest('.tree-folder');
        if(parentFolder) {
            parentFolder.classList.add('open');
        }
    } else {
        // Try to find the element based on targetId to set it active
        const sidebarItem = document.querySelector(`[data-target="${targetId}"]`);
        if(sidebarItem) {
            sidebarItem.classList.add('active');
            const parentFolder = sidebarItem.closest('.tree-folder');
            if(parentFolder) parentFolder.classList.add('open');
        }
    }

    // Sync Header Nav Link
    let headerLinkTarget = '';
    if (targetId === 'home-view') headerLinkTarget = '#home';
    else if (targetId === 'projects-overview' || targetId.startsWith('project-')) headerLinkTarget = '#work';
    else if (targetId === 'certs-overview' || targetId.startsWith('cert-')) headerLinkTarget = '#certificates';
    else if (targetId === 'files-view') headerLinkTarget = '#explorer';

    if (headerLinkTarget) {
        const hLink = document.querySelector(`.nav-link[href="${headerLinkTarget}"]`);
        if (hLink) hLink.classList.add('active');
    }
    
    const targetSection = document.getElementById(targetId);
    if(targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Toggle Folders
folderHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const folder = header.parentElement;
        folder.classList.toggle('open');
        
        // If folder-header has a target, switch to it
        const targetId = header.getAttribute('data-target');
        if(targetId) switchView(targetId, header);
    });
});

// Switch Views for Tree Items
document.querySelectorAll('.tree-item[data-target]').forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        switchView(targetId, item);
    });
});

// 7. Document Explorer & File Hub
const sidebarFileList = document.getElementById('sidebar-file-list');
const mainFileGrid = document.getElementById('main-file-grid');
const fileModal = document.querySelector('.file-modal');
const fileIframe = document.querySelector('.file-iframe');
const closeFileModal = document.querySelector('.close-file-modal');

function openFile(doc) {
    fileModal.classList.add('active');
    cursorRing.style.borderColor = 'var(--accent-secondary)';
    
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

// PDF Thumbnail Generator
async function renderPDFThumbnail(url, canvas) {
    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        
        // Scale for thumbnail - Adjust as needed
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

if(typeof documents !== 'undefined') {
    if(sidebarFileList) sidebarFileList.innerHTML = '';
    if(mainFileGrid) mainFileGrid.innerHTML = '';

    documents.forEach(doc => {
        let icon = '';
        if(doc.type === 'pdf') icon = 'fa-file-pdf';
        else if(doc.type === 'doc') icon = 'fa-file-word';
        else if(doc.type === 'xls') icon = 'fa-file-excel';
        else if(doc.type === 'ppt') icon = 'fa-file-powerpoint';
        else icon = 'fa-file';

        // Sidebar Item
        if(sidebarFileList) {
            const li = document.createElement('li');
            li.className = 'tree-item';
            li.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${doc.title}</span>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                switchView('files-view', li);
                openFile(doc);
            });
            sidebarFileList.appendChild(li);
        }

        // Main Grid Card
        if(mainFileGrid) {
            const cardId = `file-${Math.random().toString(36).substr(2, 9)}`;
            const card = document.createElement('div');
            card.className = 'card mini-project'; 
            card.id = cardId;
            card.style.textAlign = 'center';
            
            const thumbContainerId = `thumb-${cardId}`;
            
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
            
            // Async PDF Thumbnail Rendering
            if (doc.type === 'pdf') {
                const canvas = document.createElement('canvas');
                canvas.style.maxWidth = '100%';
                canvas.style.maxHeight = '100%';
                canvas.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
                canvas.style.border = '1px solid rgba(255,255,255,0.1)';
                
                renderPDFThumbnail(doc.file, canvas).then(success => {
                    if (success) {
                        const container = card.querySelector(`#${thumbContainerId}`);
                        if (container) {
                            container.innerHTML = '';
                            container.appendChild(canvas);
                        }
                    }
                });
            }

            // Add click to the whole top area
            card.querySelector('div:first-child').addEventListener('click', () => {
                openFile(doc);
            });
            
            // Add click to the button
            card.querySelector('.btn-visit').addEventListener('click', () => {
                openFile(doc);
            });

            mainFileGrid.appendChild(card);
        }
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

