// Interactive Three.js Space Background - Upgraded High-Level Visuals
(function() {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded. Falling back.');
        return;
    }

    const container = document.querySelector('.galaxy-bg');
    if (!container) return;

    // Remove static spiral container if present
    const spiral = container.querySelector('.spiral-container');
    if (spiral) spiral.remove();

    // Create WebGL Canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    container.appendChild(canvas);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Galaxy configuration
    const count = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Color definitions
    const colorCyan = new THREE.Color('#00d9ff');
    const colorPurple = new THREE.Color('#7000ff');
    const colorPink = new THREE.Color('#ff00bb');

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Spherical distribution with spiral branch influence
        const r = Math.pow(Math.random(), 2.2) * 14; 
        const branches = 3;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const spinAngle = r * 0.45;

        // Position coordinates
        const x = Math.cos(branchAngle + spinAngle) * r + (Math.random() - 0.5) * 0.45 * r;
        const y = (Math.random() - 0.5) * 0.25 * (14 - r) + (Math.random() - 0.5) * 0.15;
        const z = Math.sin(branchAngle + spinAngle) * r + (Math.random() - 0.5) * 0.45 * r;

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        // Color interpolation
        const mixedColor = colorCyan.clone();
        if (r < 3) {
            mixedColor.lerp(colorPink, r / 3);
        } else {
            mixedColor.lerp(colorPurple, (r - 3) / 11);
        }

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    // Keep a record of the original positions for elastic restoring force
    const originalPositions = new Float32Array(positions);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular particle texture
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const ctx = particleCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.5, 'rgba(0, 217, 255, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    
    const texture = new THREE.CanvasTexture(particleCanvas);

    const material = new THREE.PointsMaterial({
        size: 0.09,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        map: texture,
        transparent: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Dynamic Spark Particles (Cursor Trail)
    const sparkCount = 200;
    const sparkGeometry = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);

    for(let i=0; i<sparkCount; i++) {
        sparkPositions[i*3] = 9999;
        sparkPositions[i*3+1] = 9999;
        sparkPositions[i*3+2] = 9999;
    }

    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeometry.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

    const sparkMaterial = new THREE.PointsMaterial({
        size: 0.12,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        map: texture,
        transparent: true
    });

    const sparksPoints = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparksPoints);

    // Sparks data tracking
    const sparks = [];
    for(let i=0; i<sparkCount; i++) {
        sparks.push({
            active: false,
            age: 0,
            maxAge: 40 + Math.random() * 30,
            x: 0, y: 0, z: 0,
            vx: 0, vy: 0, vz: 0,
            r: 1, g: 1, b: 1
        });
    }
    let lastSparkIdx = 0;

    function spawnSpark(x, y, z, color) {
        const s = sparks[lastSparkIdx];
        s.active = true;
        s.age = 0;
        s.x = x;
        s.y = y;
        s.z = z;
        s.vx = (Math.random() - 0.5) * 0.035;
        s.vy = (Math.random() - 0.5) * 0.035;
        s.vz = (Math.random() - 0.5) * 0.035;
        s.r = color.r;
        s.g = color.g;
        s.b = color.b;

        lastSparkIdx = (lastSparkIdx + 1) % sparkCount;
    }

    // Floating Glass Crystals
    const crystalsGroup = new THREE.Group();
    scene.add(crystalsGroup);

    const crystalColors = [new THREE.Color('#00d9ff'), new THREE.Color('#7000ff')];
    const crystalObjects = [];

    const geo1 = new THREE.IcosahedronGeometry(0.4, 0);
    const geo2 = new THREE.OctahedronGeometry(0.35, 0);
    const geos = [geo1, geo2];

    for (let i = 0; i < 2; i++) {
        const wireMat = new THREE.MeshBasicMaterial({
            color: crystalColors[i],
            wireframe: true,
            transparent: true,
            opacity: 0.75
        });
        const faceMat = new THREE.MeshBasicMaterial({
            color: crystalColors[i],
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending
        });

        const meshWire = new THREE.Mesh(geos[i], wireMat);
        const meshFace = new THREE.Mesh(geos[i], faceMat);
        meshFace.scale.setScalar(0.97);

        const crystal = new THREE.Group();
        crystal.add(meshWire);
        crystal.add(meshFace);

        // Position coordinates
        if (i === 0) {
            crystal.position.set(-2.2, 1.2, 1);
        } else {
            crystal.position.set(2.2, -1.2, 0.5);
        }

        crystalsGroup.add(crystal);
        crystalObjects.push({
            group: crystal,
            basePos: crystal.position.clone(),
            rotSpeedX: 0.008 + Math.random() * 0.008,
            rotSpeedY: 0.008 + Math.random() * 0.008,
            hoverSpin: 0
        });
    }

    // Interaction Parameters
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let mouse3D = new THREE.Vector3(0, 0, 0);

    // Click gravity wave displacement parameters
    let rippleCenter = new THREE.Vector3(0, 0, 0);
    let rippleRadius = 0;
    let rippleActive = false;
    let rippleMaxRadius = 16;
    let rippleStrength = 0.55;

    // Track cursor movement & project into 3D world space
    document.addEventListener('mousemove', (event) => {
        targetMouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetMouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

        // Project onto 3D plane
        const vector = new THREE.Vector3(targetMouseX, -targetMouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z; 
        mouse3D.copy(camera.position).add(dir.multiplyScalar(distance));

        // Spawn spark trail particles
        if (Math.random() > 0.4) {
            const sparkColor = Math.random() > 0.5 ? colorCyan : colorPink;
            spawnSpark(mouse3D.x + (Math.random() - 0.5) * 0.05, mouse3D.y + (Math.random() - 0.5) * 0.05, mouse3D.z, sparkColor);
        }
    });

    // Spawn click gravity wave on click
    document.addEventListener('mousedown', () => {
        rippleCenter.copy(mouse3D);
        rippleRadius = 0;
        rippleActive = true;
    });

    // Scroll tracking
    let scrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        targetScrollY = window.scrollY;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Smooth cursor drift (inertia)
        mouseX += (targetMouseX - mouseX) * 0.045;
        mouseY += (targetMouseY - mouseY) * 0.045;
        
        points.rotation.y = elapsedTime * 0.03 + mouseX * 0.15;
        points.rotation.x = elapsedTime * 0.01 + mouseY * 0.08;

        // Ripple displacement logic and original state restoration (Spring-back physics)
        if (rippleActive) {
            rippleRadius += 0.28;
            if (rippleRadius > rippleMaxRadius) {
                rippleActive = false;
            }
        }

        const posArray = points.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            
            const origX = originalPositions[i3];
            const origY = originalPositions[i3 + 1];
            const origZ = originalPositions[i3 + 2];
            
            let curX = posArray[i3];
            let curY = posArray[i3 + 1];
            let curZ = posArray[i3 + 2];
            
            // Restoring spring force towards base position
            curX += (origX - curX) * 0.07;
            curY += (origY - curY) * 0.07;
            curZ += (origZ - curZ) * 0.07;

            // Apply gravity wave displacement
            if (rippleActive) {
                const dx = curX - rippleCenter.x;
                const dy = curY - rippleCenter.y;
                const dz = curZ - rippleCenter.z;
                const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                
                if (dist > 0.1) {
                    if (dist < rippleRadius && dist > rippleRadius - 1.8) {
                        const strength = (1.0 - (rippleRadius - dist) / 1.8) * rippleStrength;
                        curX += (dx / dist) * strength;
                        curY += (dy / dist) * strength;
                        curZ += (dz / dist) * strength;
                    }
                }
            }

            posArray[i3] = curX;
            posArray[i3 + 1] = curY;
            posArray[i3 + 2] = curZ;
        }
        points.geometry.attributes.position.needsUpdate = true;

        // Update active sparks
        const sparkPosArr = sparksPoints.geometry.attributes.position.array;
        const sparkColArr = sparksPoints.geometry.attributes.color.array;

        for (let i = 0; i < sparkCount; i++) {
            const s = sparks[i];
            const i3 = i * 3;
            if (s.active) {
                s.age++;
                s.x += s.vx;
                s.y += s.vy;
                s.z += s.vz;
                
                s.vx *= 0.95;
                s.vy *= 0.95;
                s.vz *= 0.95;

                if (s.age >= s.maxAge) {
                    s.active = false;
                    sparkPosArr[i3] = 9999;
                    sparkPosArr[i3 + 1] = 9999;
                    sparkPosArr[i3 + 2] = 9999;
                } else {
                    sparkPosArr[i3] = s.x;
                    sparkPosArr[i3 + 1] = s.y;
                    sparkPosArr[i3 + 2] = s.z;
                    
                    const ratio = 1 - (s.age / s.maxAge);
                    sparkColArr[i3] = s.r * ratio;
                    sparkColArr[i3 + 1] = s.g * ratio;
                    sparkColArr[i3 + 2] = s.b * ratio;
                }
            } else {
                sparkPosArr[i3] = 9999;
                sparkPosArr[i3 + 1] = 9999;
                sparkPosArr[i3 + 2] = 9999;
            }
        }
        sparksPoints.geometry.attributes.position.needsUpdate = true;
        sparksPoints.geometry.attributes.color.needsUpdate = true;

        // Hover spinning proximity for Glass Crystals
        crystalObjects.forEach(c => {
            const dist = c.group.position.distanceTo(mouse3D);
            if (dist < 1.6) {
                c.hoverSpin += (1.6 - dist) * 0.008;
            }
            
            c.group.rotation.x += c.rotSpeedX + c.hoverSpin;
            c.group.rotation.y += c.rotSpeedY + c.hoverSpin;
            c.hoverSpin *= 0.93; // damp spin rate

            // Floating drift motion
            c.group.position.x = c.basePos.x + Math.sin(elapsedTime * 0.4 + c.basePos.x) * 0.12 + mouseX * 0.25;
            c.group.position.y = c.basePos.y + Math.cos(elapsedTime * 0.4 + c.basePos.y) * 0.12 - mouseY * 0.25;
        });

        // Smooth camera scroll depth translation
        scrollY += (targetScrollY - scrollY) * 0.055;
        camera.position.z = 5.2 + (scrollY * 0.0025);
        camera.position.x = mouseX * 0.5;
        camera.position.y = -mouseY * 0.5 - (scrollY * 0.0003);
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
