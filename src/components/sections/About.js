import '../../styles/About.css';

export class About {
    constructor(container) {
        this.container = container;
        this.categoryContent = {
            'sci-fi': {
                text: 'INITIATING PROTOCOL: <span class="highlight">TECH-FUSION</span> // ENGAGING <span class="highlight">NEURAL-LINK</span> // DEPLOYING FUTURE-TECH SIMULATIONS.',
                icon: '🚀',
                color: '#9333ea'
            },
            'immersive': {
                text: 'LOADING ENVIRONMENT: <span class="highlight">DEEP-DIVE</span> // CALIBRATING <span class="highlight">REALITY-ENGINES</span> // SYNCHRONIZING DIGITAL REALMS.',
                icon: '🎮',
                color: '#a855f7'
            },
            'interactive': {
                text: 'ESTABLISHING LINK: <span class="highlight">HUMAN</span> >< <span class="highlight">MACHINE</span> // OPTIMIZING RESPONSE PATTERNS // ENHANCING FEEDBACK LOOPS.',
                icon: '⚡',
                color: '#c084fc'
            },
            'gaming': {
                text: 'INITIALIZING WORLD: <span class="highlight">GAME-CORE</span> // LOADING <span class="highlight">PHYSICS-ENGINE</span> // RENDERING VIRTUAL LANDSCAPES.',
                icon: '🎯',
                color: '#d8b4fe'
            },
            'design': {
                text: 'EXECUTING DESIGN: <span class="highlight">NEURAL-NET</span> // PROCESSING <span class="highlight">AESTHETIC-DATA</span> // GENERATING VISUAL MATRICES.',
                icon: '✨',
                color: '#e9d5ff'
            }
        };
        this.audioContext = null;
        this.activeCategory = null;
        this.init();
        this.setupIntersectionObserver();
        this.setupInteractions();
        this.setupParticles();
        this.setupScrollParallax();
        this.setupGameEffects();
        this.setupAudio();
    }

    init() {
        this.container.innerHTML = `
            <section class="section4" id="about">
                <div class="game-overlay"></div>
                <div class="particles"></div>
                <div class="scan-line"></div>
                <div class="about-content">
                    <div class="category-grid">
                        ${Object.entries(this.categoryContent).map(([category, content], index) => `
                            <div class="category-item" data-category="${category}" style="animation-delay: ${index * 0.1}s">
                                <div class="category-icon">${content.icon}</div>
                                <span>${category.toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="text-content">
                        <div class="text-frame">
                            <div class="sec4text">
                                <div class="text-header">// SYSTEM BRIEFING</div>
                                <p class="game-text">
                                    INITIALIZING SYSTEM: <span class="highlight">CORE-MATRIX</span> // LOADING <span class="highlight">MISSION-DATA</span> // ESTABLISHING NEURAL-LINK.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    setupGameEffects() {
        const section = this.container.querySelector('.section4');
        const scanLine = this.container.querySelector('.scan-line');
        
        // Enhanced scan line animation
        const animateScanLine = () => {
            scanLine.animate([
                { transform: 'translateY(-100%)', opacity: 0 },
                { transform: 'translateY(50vh)', opacity: 0.7 },
                { transform: 'translateY(100vh)', opacity: 0 }
            ], {
                duration: 2000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });
        };
        
        animateScanLine();

        // Optimize hover effects
        const items = this.container.querySelectorAll('.category-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    requestAnimationFrame(() => {
                        this.playHoverSound();
                        this.glitchEffect(item);
                    });
                }
            });
        });

        // Add ambient particle effect
        this.createAmbientParticles();
    }

    createAmbientParticles() {
        const particlesContainer = this.container.querySelector('.particles');
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 15000);
        };

        setInterval(createParticle, 1000);
    }

    glitchEffect(element) {
        const duration = 300; // Reduced from 500
        const steps = 3; // Reduced from 5
        const originalTransform = element.style.transform;
        const colors = ['#9333ea', '#a855f7', '#c084fc'];
        
        for (let i = 0; i < steps; i++) {
            setTimeout(() => {
                const glitchX = (Math.random() - 0.5) * 8;
                const glitchY = (Math.random() - 0.5) * 8;
                const skewX = (Math.random() - 0.5) * 3;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                element.style.transform = `translate(${glitchX}px, ${glitchY}px) skew(${skewX}deg)`;
                element.style.borderColor = color;
                
                if (i === steps - 1) {
                    requestAnimationFrame(() => {
                        element.style.transform = originalTransform;
                        element.style.borderColor = '';
                    });
                }
            }, (duration / steps) * i);
        }
    }

    setupAudio() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playHoverSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(2000, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1800, this.audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    playSelectSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    updateContent(category) {
        if (this.activeCategory === category) return;
        
        const textElement = this.container.querySelector('.sec4text p');
        const textHeader = this.container.querySelector('.text-header');
        const content = this.categoryContent[category];
        
        // Quick fade out
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(10px)';
        
        // Faster content update
        setTimeout(() => {
            textElement.innerHTML = content.text;
            textHeader.textContent = `// ${category.toUpperCase()} PROTOCOL`;
            
            // Update color scheme
            document.documentElement.style.setProperty('--category-color', content.color);
            
            requestAnimationFrame(() => {
                textElement.style.opacity = '1';
                textElement.style.transform = 'translateY(0)';
                
                // Animate highlights immediately
                const highlights = textElement.querySelectorAll('.highlight');
                highlights.forEach((highlight, index) => {
                    highlight.style.transitionDelay = `${index * 0.05}s`;
                    highlight.classList.add('active');
                    this.createGlowParticles(highlight);
                });
            });
        }, 150); // Reduced from 300

        this.activeCategory = category;
    }

    createGlowParticles(element) {
        const rect = element.getBoundingClientRect();
        const particlesContainer = this.container.querySelector('.particles');
        const numParticles = 5;
        
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'highlight-particle';
            
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.animation = `float-particle ${3 + Math.random() * 2}s ease-out forwards`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }
    }

    setupParticles() {
        const particlesContainer = this.container.querySelector('.particles');
        const numParticles = 20;

        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particlesContainer.appendChild(particle);
        }
    }

    setupScrollParallax() {
        const section = this.container.querySelector('.section4');
        const content = this.container.querySelector('.about-content');
        const text = this.container.querySelector('.sec4text p');
        const highlights = this.container.querySelectorAll('.highlight');
        const categoryItems = this.container.querySelectorAll('.category-item');

        window.addEventListener('scroll', () => {
            const rect = section.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

            if (scrollProgress > 0 && scrollProgress < 1) {
                const translateY = scrollProgress * 50;
                const opacity = Math.min(1, scrollProgress * 2);

                content.style.transform = `translateY(${translateY * 0.5}px)`;
                text.style.transform = `translateY(${-translateY * 0.3}px)`;
                
                highlights.forEach(highlight => {
                    highlight.style.transform = `translateY(${-translateY * 0.4}px)`;
                });

                categoryItems.forEach((item, index) => {
                    const delay = index * 0.1;
                    item.style.transform = `translateY(${-translateY * (0.2 + delay)}px)`;
                    item.style.opacity = opacity;
                });
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateCategoryItems();
                }
            });
        }, {
            threshold: 0.1
        });

        const text = this.container.querySelector('.sec4text p');
        observer.observe(text);
    }

    animateCategoryItems() {
        const items = this.container.querySelectorAll('.category-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupInteractions() {
        const categoryItems = this.container.querySelectorAll('.category-item');
        
        categoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    requestAnimationFrame(() => {
                        categoryItems.forEach(i => i.classList.remove('hover'));
                        item.classList.add('hover');
                    });
                }
            });

            item.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    item.classList.remove('hover');
                });
            });

            item.addEventListener('click', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Play sound immediately
                this.playSelectSound();
                
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                item.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);

                // Update active state and content
                requestAnimationFrame(() => {
                    const category = item.dataset.category;
                    categoryItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    this.updateContent(category);
                });
            });
        });
    }

    setupMouseEffect() {
        const section = this.container.querySelector('.section4');
        const items = this.container.querySelectorAll('.category-item');
        const text = this.container.querySelector('.sec4text');
        const highlights = this.container.querySelectorAll('.highlight');
        
        let isHovering = false;
        
        section.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = section.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            items.forEach(item => {
                if (!item.classList.contains('active')) {
                    const box = item.getBoundingClientRect();
                    const boxCenterX = box.left + box.width / 2;
                    const boxCenterY = box.top + box.height / 2;
                    
                    const deltaX = (e.clientX - boxCenterX) * 0.03;
                    const deltaY = (e.clientY - boxCenterY) * 0.03;
                    
                    item.style.transform = `
                        perspective(1000px)
                        rotateX(${y * 3}deg)
                        rotateY(${x * 3}deg)
                        translateX(${deltaX}px)
                        translateY(${deltaY}px)
                    `;
                }
            });

            // Subtle movement for text
            text.style.transform = `
                perspective(1000px)
                rotateX(${y * 1}deg)
                rotateY(${x * 1}deg)
                translateZ(0)
            `;

            highlights.forEach(highlight => {
                highlight.style.transform = `
                    perspective(1000px)
                    rotateX(${y * 2}deg)
                    rotateY(${x * 2}deg)
                    translateZ(10px)
                `;
            });
        });

        section.addEventListener('mouseleave', () => {
            items.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.style.transform = '';
                }
            });
            text.style.transform = '';
            highlights.forEach(highlight => {
                highlight.style.transform = '';
            });
        });
    }
}
