// Sage-Green Claymorphism Canvas Background – Floating Clay Drops
(function () {
    const container = document.querySelector('.galaxy-bg');
    if (!container) return;

    const spiral = container.querySelector('.spiral-container');
    if (spiral) spiral.remove();

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;`;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        initBlobs(); initDust();
    });

    const isDark = () => !document.body.classList.contains('light-mode');

    // ── Neomorphic custom color palette blobs ──
    const LIGHT_PALETTES = [
        ['#B5BAFF', '#9FA1FF'],  // lavender → purple
        ['#AEE2FF', '#B5BAFF'],  // sky blue → lavender
        ['#D9F9DF', '#AEE2FF'],  // mint green → sky blue
        ['#9FA1FF', '#AEE2FF'],  // purple → sky blue
        ['#B5BAFF', '#D9F9DF'],  // lavender → mint green
        ['#AEE2FF', '#9FA1FF'],  // sky blue → purple
    ];

    const DARK_PALETTES = [
        ['#1b1c30', '#10111e'],  // deep indigo/purple
        ['#172335', '#0f1724'],  // deep slate blue
        ['#182e20', '#0e1d14'],  // deep forest green
        ['#1e1f38', '#121324'],  // deep violet/lavender
        ['#142a22', '#0a1a14'],  // deep teal/mint
    ];

    let blobs = [];
    const BLOB_COUNT = 10;
    function rand(a, b) { return a + Math.random() * (b - a); }

    function initBlobs() {
        blobs = [];
        const pal = isDark() ? DARK_PALETTES : LIGHT_PALETTES;
        for (let i = 0; i < BLOB_COUNT; i++) {
            const p = pal[i % pal.length];
            blobs.push({
                x: rand(W * 0.05, W * 0.95), y: rand(H * 0.05, H * 0.95),
                vx: rand(-0.18, 0.18),  vy: rand(-0.16, 0.16),
                baseR: rand(W * 0.06, W * 0.14), r: 0,
                phase: Math.random() * Math.PI * 2,
                phaseSpd: rand(0.004, 0.009),
                wobbleAmp: rand(0.06, 0.13),
                c0: p[0], c1: p[1],
                opacity: isDark() ? rand(0.10, 0.18) : rand(0.25, 0.42),
                rot: Math.random() * Math.PI * 2,
                rotSpd: rand(-0.0014, 0.0014),
                svx: 0, svy: 0,
            });
            blobs[i].r = blobs[i].baseR;
        }
    }

    let dust = [];
    const DUST_N = 60;
    function initDust() {
        dust = [];
        for (let i = 0; i < DUST_N; i++) {
            dust.push({
                x: Math.random() * W, y: Math.random() * H,
                r: rand(1.5, 4.5),
                alpha: isDark() ? rand(0.04, 0.10) : rand(0.08, 0.20),
                speed: rand(0.10, 0.35), drift: rand(-0.10, 0.10),
                phase: Math.random() * Math.PI * 2, phaseSpd: rand(0.008, 0.018),
                col: ['rgba(159,161,255,', 'rgba(181,186,255,', 'rgba(174,226,255,', 'rgba(217,249,223,'][Math.floor(Math.random() * 4)],
            });
        }
    }

    let ripples = [];
    document.addEventListener('mousedown', (e) => {
        ripples.push({
            x: e.clientX, y: e.clientY, r: 0,
            maxR: 280 + Math.random() * 200, speed: 7 + Math.random() * 5,
            col: isDark() ? 'rgba(159,161,255,' : 'rgba(159,161,255,',
        });
    });

    let mx = W/2, my = H/2, tmx = W/2, tmy = H/2;
    let scrollY = 0, tScrollY = 0;
    document.addEventListener('mousemove', (e) => { tmx = e.clientX; tmy = e.clientY; });
    window.addEventListener('scroll', () => { tScrollY = window.scrollY; });

    function lighten(hex, a) {
        const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
        return `rgb(${Math.min(255,r+Math.round(255*a))},${Math.min(255,g+Math.round(255*a))},${Math.min(255,b+Math.round(255*a))})`;
    }
    function darken(hex, a) {
        const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
        return `rgb(${Math.max(0,r-Math.round(255*a))},${Math.max(0,g-Math.round(255*a))},${Math.max(0,b-Math.round(255*a))})`;
    }

    function drawBlob(b) {
        ctx.save();
        ctx.globalAlpha = b.opacity;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        const wobble = 1 + Math.sin(b.phase) * b.wobbleAmp;
        const rx = b.r * wobble, ry = b.r * (2 - wobble);

        const grd = ctx.createRadialGradient(-rx*0.3,-ry*0.3,rx*0.05,0,0,rx*1.2);
        grd.addColorStop(0.0, lighten(b.c0, 0.42));
        grd.addColorStop(0.45, b.c0);
        grd.addColorStop(0.85, b.c1);
        grd.addColorStop(1.0, darken(b.c1, 0.22));

        ctx.beginPath();
        const pts = 7, jitter = 0.22;
        for (let i = 0; i < pts; i++) {
            const a0 = (i/pts)*Math.PI*2, a1 = ((i+1)/pts)*Math.PI*2;
            const n0 = 1+Math.sin(b.phase+i*1.7)*jitter, n1 = 1+Math.sin(b.phase+(i+1)*1.7)*jitter;
            const px=Math.cos(a0)*rx*n0, py=Math.sin(a0)*ry*n0;
            const npx=Math.cos(a1)*rx*n1, npy=Math.sin(a1)*ry*n1;
            const cp1x=px+Math.cos(a0+Math.PI/2)*rx*0.35, cp1y=py+Math.sin(a0+Math.PI/2)*ry*0.35;
            const cp2x=npx-Math.cos(a1+Math.PI/2)*rx*0.35, cp2y=npy-Math.sin(a1+Math.PI/2)*ry*0.35;
            if (i===0) ctx.moveTo(px,py);
            ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,npx,npy);
        }
        ctx.closePath();
        ctx.fillStyle = grd;
        ctx.shadowColor = isDark() ? 'rgba(0,0,0,0.35)' : 'rgba(159,161,255,0.22)';
        ctx.shadowBlur = isDark() ? 28 : 20;
        ctx.shadowOffsetX = 4; ctx.shadowOffsetY = 7;
        ctx.fill();

        // Specular highlight (top-left)
        ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
        const hl = ctx.createRadialGradient(-rx*0.38,-ry*0.38,0,-rx*0.2,-ry*0.2,rx*0.55);
        hl.addColorStop(0, 'rgba(255,255,255,0.55)');
        hl.addColorStop(1, 'rgba(255,255,255,0.00)');
        ctx.fillStyle = hl;
        ctx.fill();
        ctx.restore();
    }

    function drawDust(d) {
        ctx.save();
        ctx.globalAlpha = d.alpha * (0.7 + 0.3*Math.sin(d.phase));
        ctx.beginPath();
        ctx.arc(d.x, d.y - scrollY*0.06, d.r, 0, Math.PI*2);
        ctx.fillStyle = d.col + d.alpha + ')';
        ctx.shadowColor = d.col + '0.5)'; ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }

    initBlobs(); initDust();
    let t = 0;

    function animate() {
        requestAnimationFrame(animate);
        t += 0.012;
        ctx.clearRect(0, 0, W, H);

        mx += (tmx-mx)*0.06; my += (tmy-my)*0.06;
        scrollY += (tScrollY-scrollY)*0.07;

        blobs.forEach(b => {
            b.phase += b.phaseSpd; b.rot += b.rotSpd;
            b.x += b.vx; b.y += b.vy;
            if (b.x < -b.r*1.5) b.x = W+b.r*1.5;
            if (b.x > W+b.r*1.5) b.x = -b.r*1.5;
            if (b.y < -b.r*1.5) b.y = H+b.r*1.5;
            if (b.y > H+b.r*1.5) b.y = -b.r*1.5;

            const dx=b.x-mx, dy=b.y-my, dist=Math.sqrt(dx*dx+dy*dy);
            const repR = b.r*1.4;
            if (dist < repR && dist > 1) {
                const f = (repR-dist)/repR*0.010;
                b.svx += (dx/dist)*f; b.svy += (dy/dist)*f;
            }
            b.svx *= 0.90; b.svy *= 0.90;
            b.x += b.svx; b.y += b.svy;

            drawBlob(b);
        });

        for (let i = ripples.length-1; i >= 0; i--) {
            const rip = ripples[i]; rip.r += rip.speed;
            const prog = rip.r/rip.maxR;
            if (prog >= 1) { ripples.splice(i,1); continue; }
            ctx.save();
            ctx.beginPath(); ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI*2);
            ctx.strokeStyle = rip.col + (1-prog)*0.30 + ')';
            ctx.lineWidth = 2.5;
            ctx.shadowColor = rip.col + '0.35)'; ctx.shadowBlur = 10;
            ctx.stroke(); ctx.restore();
        }

        dust.forEach(d => {
            d.y -= d.speed; d.x += d.drift; d.phase += d.phaseSpd;
            if (d.y < -d.r*2) d.y = H+d.r*2;
            if (d.x < -d.r*2) d.x = W+d.r*2;
            if (d.x > W+d.r*2) d.x = -d.r*2;
            drawDust(d);
        });
    }

    animate();

    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', () => setTimeout(() => { initBlobs(); initDust(); }, 120));
})();
