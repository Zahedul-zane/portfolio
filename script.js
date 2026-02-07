// Neon Core System

// DOM Elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const magneticElems = document.querySelectorAll('[data-magnetic]');
const scrollElements = document.querySelectorAll('.scroll-reveal');
const counters = document.querySelectorAll('.num');

// 1. Cyber Cursor
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
