// Interactive 2D Canvas Space Background - Upgraded High-Level Visuals (No Three.js)
(function() {
    const container = document.querySelector('.galaxy-bg');
    if (!container) return;

    // Remove static spiral container if present
    const spiral = container.querySelector('.spiral-container');
    if (spiral) spiral.remove();

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Resize Handling
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
        initCrystals();
    });

    // Color definitions
    const colors = [
        'rgba(0, 217, 255, ',  // Cyan
        'rgba(112, 0, 255, ',  // Purple
        'rgba(255, 0, 187, '   // Pink
    ];

    // Star configuration
    const starCount = 200;
    let stars = [];

    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const r = Math.random() * 1.8 + 0.5;
            const alpha = Math.random() * 0.6 + 0.2;
            const colorPrefix = colors[Math.floor(Math.random() * colors.length)];
            
            stars.push({
                x: x,
                y: y,
                origX: x,
                origY: y,
                r: r,
                alpha: alpha,
                pulseSpeed: 0.01 + Math.random() * 0.02,
                pulsePhase: Math.random() * Math.PI * 2,
                colorPrefix: colorPrefix,
                driftX: (Math.random() - 0.5) * 0.15,
                driftY: (Math.random() - 0.5) * 0.15
            });
        }
    }

    // Spark Particles (Cursor Trail)
    const sparks = [];
    const maxSparks = 60;

    function spawnSpark(x, y, colorPrefix) {
        if (sparks.length >= maxSparks) {
            sparks.shift();
        }
        sparks.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 3 + 2,
            age: 0,
            maxAge: 30 + Math.random() * 20,
            colorPrefix: colorPrefix
        });
    }

    // Floating 2D Wireframe Crystals
    let crystals = [];
    function initCrystals() {
        crystals = [
            {
                baseX: width * 0.15,
                baseY: height * 0.3,
                x: width * 0.15,
                y: height * 0.3,
                size: 32,
                sides: 8,
                rotation: 0,
                rotSpeed: 0.006,
                color: '#00d9ff',
                hoverSpin: 0,
                phase: 0
            },
            {
                baseX: width * 0.85,
                baseY: height * 0.7,
                x: width * 0.85,
                y: height * 0.7,
                size: 26,
                sides: 6,
                rotation: Math.PI / 4,
                rotSpeed: -0.008,
                color: '#7000ff',
                hoverSpin: 0,
                phase: Math.PI
            }
        ];
    }

    // Interactive Parameters
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    // Click Ripple Parameter
    let rippleCenter = { x: 0, y: 0 };
    let rippleRadius = 0;
    let rippleActive = false;
    const rippleMaxRadius = 400;
    const rippleSpeed = 12;

    // Listeners
    document.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX;
        targetMouseY = e.clientY;

        // Spawn spark cursor trail
        if (Math.random() > 0.4) {
            const colorPrefix = Math.random() > 0.5 ? 'rgba(0, 217, 255, ' : 'rgba(255, 0, 187, ';
            spawnSpark(targetMouseX, targetMouseY, colorPrefix);
        }
    });

    document.addEventListener('mousedown', (e) => {
        rippleCenter.x = e.clientX;
        rippleCenter.y = e.clientY;
        rippleRadius = 0;
        rippleActive = true;
    });

    // Scroll parallax depth factor
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
    });

    // Draw 2D Gem Crystal Wireframe function
    function drawCrystal(ctx, x, y, size, sides, rotation, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;

        // Draw outer polygon outline
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const px = size * Math.cos(angle);
            const py = size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw inner concentric crystal facets
        ctx.strokeStyle = color + '44'; // semi-transparent
        ctx.shadowBlur = 0;
        ctx.beginPath();
        const innerSize = size * 0.45;
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const px = innerSize * Math.cos(angle);
            const py = innerSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw facet connection lines from center to outer vertices
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const outerX = size * Math.cos(angle);
            const outerY = size * Math.sin(angle);
            const innerX = innerSize * Math.cos(angle);
            const innerY = innerSize * Math.sin(angle);
            
            ctx.moveTo(outerX, outerY);
            ctx.lineTo(innerX, innerY);
            
            ctx.moveTo(innerX, innerY);
            ctx.lineTo(0, 0);
        }
        ctx.stroke();

        ctx.restore();
    }

    // Initialize
    initStars();
    initCrystals();

    // Main animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Smooth Mouse drift
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
        
        // Smooth Scroll drift
        scrollY += (targetScrollY - scrollY) * 0.08;

        // Render & Update Click Ripple
        if (rippleActive) {
            rippleRadius += rippleSpeed;
            if (rippleRadius > rippleMaxRadius) {
                rippleActive = false;
            } else {
                ctx.save();
                ctx.strokeStyle = 'rgba(0, 217, 255, ' + (1.0 - rippleRadius / rippleMaxRadius) * 0.3 + ')';
                ctx.lineWidth = 2;
                ctx.shadowColor = 'rgba(0, 217, 255, 0.4)';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(rippleCenter.x, rippleCenter.y, rippleRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }
        }

        // Mouse Parallax factor
        const parallaxX = (mouseX - width / 2) * 0.035;
        const parallaxY = (mouseY - height / 2) * 0.035;

        // Update and Render Stars
        stars.forEach(star => {
            // Pulse opacity
            star.pulsePhase += star.pulseSpeed;
            const currentAlpha = Math.max(0.05, star.alpha + Math.sin(star.pulsePhase) * 0.15);

            // Apply drift animation
            star.origX += star.driftX;
            star.origY += star.driftY;

            // Screen wrap around for drift
            if (star.origX < 0) star.origX = width;
            if (star.origX > width) star.origX = 0;
            if (star.origY < 0) star.origY = height;
            if (star.origY > height) star.origY = 0;

            // Restoring spring physics
            let targetX = star.origX;
            let targetY = star.origY;

            // Push stars if clicked ripple is active
            if (rippleActive) {
                const dx = star.origX - rippleCenter.x;
                const dy = star.origY - rippleCenter.y;
                const d = Math.sqrt(dx * dx + dy * dy);

                if (d > 10 && d < rippleRadius && d > rippleRadius - 80) {
                    const factor = (1.0 - (rippleRadius - d) / 80);
                    const pushForce = factor * 45;
                    star.x += (dx / d) * pushForce;
                    star.y += (dy / d) * pushForce;
                }
            }

            // Interpolate back to original place
            star.x += (targetX - star.x) * 0.08;
            star.y += (targetY - star.y) * 0.08;

            // Parallax offset applied dynamically
            const drawX = star.x + parallaxX * (star.r * 0.6);
            const drawY = star.y + parallaxY * (star.r * 0.6) - scrollY * (star.r * 0.05);

            // Draw star
            ctx.fillStyle = star.colorPrefix + currentAlpha + ')';
            ctx.beginPath();
            ctx.arc(drawX, drawY, star.r, 0, Math.PI * 2);
            ctx.fill();
        });

        // Update and Render Spark Trail
        for (let i = sparks.length - 1; i >= 0; i--) {
            const s = sparks[i];
            s.age++;
            if (s.age >= s.maxAge) {
                sparks.splice(i, 1);
                continue;
            }

            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.96;
            s.vy *= 0.96;

            const ratio = 1 - (s.age / s.maxAge);
            ctx.fillStyle = s.colorPrefix + ratio * 0.8 + ')';
            ctx.beginPath();
            ctx.arc(s.x, s.y - scrollY * 0.1, s.size * ratio, 0, Math.PI * 2);
            ctx.fill();
        }

        // Update and Render 2D Crystals
        const time = Date.now() * 0.0015;
        crystals.forEach((c, idx) => {
            // Hover check proximity
            const drawX = c.baseX + Math.sin(time + c.phase) * 20 + parallaxX * 1.5;
            const drawY = c.baseY + Math.cos(time + c.phase) * 20 + parallaxY * 1.5 - scrollY * 0.2;

            const dx = mouseX - drawX;
            const dy = mouseY - drawY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
                // Spin faster when mouse is close
                c.hoverSpin += (180 - dist) * 0.0006;
            }

            c.rotation += c.rotSpeed + c.hoverSpin;
            c.hoverSpin *= 0.92; // damp spin rate

            c.x = drawX;
            c.y = drawY;

            drawCrystal(ctx, c.x, c.y, c.size, c.sides, c.rotation, c.color);
        });
    }

    animate();
})();
