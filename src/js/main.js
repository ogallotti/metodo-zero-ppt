
// Three.js Background (Ported from v9)
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    const uniforms = {
        uTime: { value: 1.0 },
        uResolution: { value: new THREE.Vector2() },
        uMouse: { value: new THREE.Vector2() }
    };

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec2 uMouse;
            uniform vec2 uResolution;
            varying vec2 vUv;

            // Simplex Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 st = vUv;
                
                // Mouse Interaction
                float dist = distance(st, uMouse);
                float interaction = smoothstep(0.4, 0.0, dist);
                
                // Fluid Motion
                float noise = snoise(vec2(st.x * 3.0 + uTime * 0.1, st.y * 3.0 + uTime * 0.2));
                float noise2 = snoise(vec2(st.x * 6.0 - uTime * 0.2 + interaction, st.y * 6.0));
                
                // Color Mixing
                vec3 color1 = vec3(0.05, 0.05, 0.08); // Dark Blue/Black
                vec3 color2 = vec3(0.0, 0.1, 0.3);    // Deep Tech Blue
                vec3 color3 = vec3(0.5, 0.1, 0.9);   // Purple/Violet Accent
                
                float mixVal = smoothstep(-1.0, 1.0, noise + noise2 * 0.5);
                vec3 finalColor = mix(color1, color2, mixVal);
                finalColor = mix(finalColor, color3, smoothstep(0.4, 0.8, noise * noise2 + interaction * 0.5));
                
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.uResolution.value.x = renderer.domElement.width;
        uniforms.uResolution.value.y = renderer.domElement.height;
    };

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    document.onmousemove = (e) => {
        uniforms.uMouse.value.x = e.pageX / window.innerWidth;
        uniforms.uMouse.value.y = 1.0 - e.pageY / window.innerHeight; // Invert Y
    };

    const animate = () => {
        requestAnimationFrame(animate);
        uniforms.uTime.value += 0.005;
        renderer.render(scene, camera);
    };

    animate();
};

// Slide System
const initSidebar = () => {
    const slides = document.querySelectorAll('.slide');
    const sidebar = document.createElement('nav');
    sidebar.id = 'sidebar-nav';
    document.body.appendChild(sidebar);

    // Create inner wrapper for typewriter centering
    const inner = document.createElement('div');
    inner.classList.add('sidebar-inner');
    sidebar.appendChild(inner);

    slides.forEach((slide, index) => {
        const level = slide.getAttribute('data-sidebar-level') || 'slide';
        const label = slide.getAttribute('data-sidebar-label') || `Slide ${index + 1}`;

        const item = document.createElement('div');
        item.classList.add('sidebar-item');
        item.setAttribute('data-level', level);
        item.setAttribute('data-index', index);

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('sidebar-tooltip');
        tooltip.textContent = label;
        item.appendChild(tooltip);

        item.addEventListener('click', (e) => {
            e.stopPropagation();
            document.dispatchEvent(new CustomEvent('requestSlide', { detail: { index } }));
        });

        inner.appendChild(item);
    });

    // Typewriter centering function
    const centerActiveItem = (activeIndex) => {
        const items = inner.querySelectorAll('.sidebar-item');
        if (!items[activeIndex]) return;

        const itemHeight = 22; // height + gap
        const containerHeight = sidebar.clientHeight;
        const centerOffset = containerHeight / 2;
        const itemOffset = activeIndex * itemHeight + (itemHeight / 2);
        const translateY = centerOffset - itemOffset;

        // Only apply transform when not hovering
        if (!sidebar.matches(':hover')) {
            inner.style.transform = `translateY(${translateY}px)`;
        }
    };

    // On hover, reset transform and scroll to active
    sidebar.addEventListener('mouseenter', () => {
        const activeItem = inner.querySelector('.sidebar-item.active');
        inner.style.transform = 'translateY(0)';
        if (activeItem) {
            const scrollOffset = activeItem.offsetTop - sidebar.clientHeight / 2 + activeItem.clientHeight / 2;
            sidebar.scrollTop = Math.max(0, scrollOffset);
        }
    });

    sidebar.addEventListener('mouseleave', () => {
        sidebar.scrollTop = 0;
        const activeItem = inner.querySelector('.sidebar-item.active');
        if (activeItem) {
            const activeIndex = parseInt(activeItem.getAttribute('data-index'));
            centerActiveItem(activeIndex);
        }
    });

    // Listen for updates
    document.addEventListener('slideChanged', (e) => {
        const activeIndex = e.detail.index;
        const items = inner.querySelectorAll('.sidebar-item');
        items.forEach(item => item.classList.remove('active'));
        if (items[activeIndex]) items[activeIndex].classList.add('active');

        // Update module indicator
        updateModuleIndicator(activeIndex);

        // Center the active item (typewriter style)
        centerActiveItem(activeIndex);
    });
};

// Module/Lesson Indicator
const updateModuleIndicator = (slideIndex) => {
    const slides = document.querySelectorAll('.slide');
    const currentSlide = slides[slideIndex];
    if (!currentSlide) return;

    let indicator = document.getElementById('module-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'module-indicator';
        indicator.className = 'module-indicator';
        document.body.appendChild(indicator);
    }

    // Find current module and lesson by walking backwards
    let currentModule = '';
    let currentLesson = '';

    for (let i = slideIndex; i >= 0; i--) {
        const slide = slides[i];
        const level = slide.getAttribute('data-sidebar-level');
        const label = slide.getAttribute('data-sidebar-label') || '';

        if (level === 'module' && !currentModule) {
            currentModule = label;
        }
        if (level === 'lesson' && !currentLesson) {
            currentLesson = label;
        }
        if (currentModule && currentLesson) break;
    }

    // If current slide is a module, clear lesson
    const currentLevel = currentSlide.getAttribute('data-sidebar-level');
    if (currentLevel === 'module') {
        currentLesson = '';
    }

    indicator.innerHTML = `
        <div class="module-name">${currentModule}</div>
        ${currentLesson ? `<div class="lesson-name">${currentLesson}</div>` : ''}
    `;
};

const initSlides = () => {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Restore from localStorage or start at 0
    let savedSlide = parseInt(localStorage.getItem('metodoZeroSlide') || '0');
    if (savedSlide >= totalSlides || savedSlide < 0) savedSlide = 0;
    let currentSlide = savedSlide;
    let isAnimating = false;

    // UI Elements
    const currentEl = document.getElementById('current-slide');
    const totalEl = document.getElementById('total-slides');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!currentEl || !totalEl) return;

    totalEl.textContent = totalSlides;

    // If restored slide is not 0, set it up immediately
    if (currentSlide > 0) {
        slides[0].classList.remove('active');
        slides[0].style.visibility = 'hidden';
        slides[0].style.opacity = '0';
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.visibility = 'visible';
        slides[currentSlide].style.opacity = '1';
        currentEl.textContent = currentSlide + 1;
    }

    const updateSlide = (newIndex, direction) => {
        if (isAnimating || newIndex < 0 || newIndex >= totalSlides) return;

        isAnimating = true;
        const outgoingSlide = slides[currentSlide];
        const incomingSlide = slides[newIndex];

        // Animate Out
        gsap.to(outgoingSlide, {
            opacity: 0,
            y: direction === 'next' ? -50 : 50,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                outgoingSlide.classList.remove('active');
                outgoingSlide.style.visibility = 'hidden';
            }
        });

        // Set initial state for incoming
        incomingSlide.style.visibility = 'visible';
        incomingSlide.classList.add('active'); // To ensure pointer events are ready

        gsap.fromTo(incomingSlide,
            { opacity: 0, y: direction === 'next' ? 50 : -50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.1,
                onComplete: () => {
                    isAnimating = false;
                    currentSlide = newIndex;
                    currentEl.textContent = currentSlide + 1;
                    // Save to localStorage
                    localStorage.setItem('metodoZeroSlide', currentSlide.toString());
                    // Dispatch change event
                    document.dispatchEvent(new CustomEvent('slideChanged', { detail: { index: currentSlide } }));
                }
            }
        );
    };

    // Listen for sidebar requests
    document.addEventListener('requestSlide', (e) => {
        const newIndex = e.detail.index;
        if (newIndex === currentSlide) return;
        const direction = newIndex > currentSlide ? 'next' : 'prev';
        updateSlide(newIndex, direction);
    });

    // Initial sync
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('slideChanged', { detail: { index: currentSlide } }));
    }, 100);

    // Controls
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSlide(currentSlide + 1, 'next');
    });
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSlide(currentSlide - 1, 'prev');
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') updateSlide(currentSlide + 1, 'next');
        if (e.key === 'ArrowLeft') updateSlide(currentSlide - 1, 'prev');
    });

    // Scroll Navigation (Wheel)
    let lastScrollTime = 0;
    const scrollCooldown = 800; // ms to prevent rapid skipping

    window.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) return;

        if (e.deltaY > 0) {
            updateSlide(currentSlide + 1, 'next');
            lastScrollTime = now;
        } else if (e.deltaY < 0) {
            updateSlide(currentSlide - 1, 'prev');
            lastScrollTime = now;
        }
    }, { passive: true });

    // Click Navigation
    document.addEventListener('click', (e) => {
        // Ignore clicks on buttons, links, or if text is being selected
        if (e.target.closest('button') || e.target.closest('a') || window.getSelection().toString().length > 0) return;

        updateSlide(currentSlide + 1, 'next');
    });

    // Right Click (Context Menu) Navigation
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevent context menu
        updateSlide(currentSlide - 1, 'prev');
    });

    // Touch Support (Simple Swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        if (touchEndX < touchStartX - 50) updateSlide(currentSlide + 1, 'next');
        if (touchEndX > touchStartX + 50) updateSlide(currentSlide - 1, 'prev');
    };
};

// Initialize
window.addEventListener('load', () => {
    initThreeJS();
    initSidebar(); // Initialize sidebar first
    initSlides();
    console.log('Método Zero Presentation Loaded');
});
