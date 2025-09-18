export class Features {
    constructor(container) {
        this.container = container;
        this.init();
        this.setupIntersectionObserver();
        this.setupMouseEffects();
        this.setupParallaxEffect();
        this.setupScrollProgress();
        this.showInitialElements();
    }

    init() {
        this.container.innerHTML = `
            <section class="features-section">
                <div class="cyber-grid"></div>
                <div class="features-container">
                    <div class="section-title">
                        <div class="title-decoration"></div>
                        <h2>Our Expertise</h2>
                        <p>Discover how we blend technology and creativity to deliver exceptional digital experiences</p>
                    </div>
                    <div class="features-grid">
                        <div class="feature-card" data-category="design">
                            <div class="card-frame"></div>
                            <div class="feature-content">
                                <div class="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 class="feature-title">Interactive Design</h3>
                                <p class="feature-description">Creating engaging user experiences through innovative interaction design and seamless animations.</p>
                                <div class="feature-stats">
                                    <div class="stat">
                                        <span class="stat-value">100+</span>
                                        <span class="stat-label">Projects</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-value">95%</span>
                                        <span class="stat-label">Success Rate</span>
                                    </div>
                                </div>
                                <a href="#" class="feature-link">
                                    Explore More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="feature-card" data-category="immersive">
                            <div class="card-frame"></div>
                            <div class="feature-content">
                                <div class="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <h3 class="feature-title">Immersive Experiences</h3>
                                <p class="feature-description">Building captivating digital worlds that merge reality with cutting-edge technology.</p>
                                <div class="feature-stats">
                                    <div class="stat">
                                        <span class="stat-value">50+</span>
                                        <span class="stat-label">VR/AR Apps</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-value">4.9</span>
                                        <span class="stat-label">User Rating</span>
                                    </div>
                                </div>
                                <a href="#" class="feature-link">
                                    Explore More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div class="feature-card" data-category="gaming">
                            <div class="card-frame"></div>
                            <div class="feature-content">
                                <div class="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                </div>
                                <h3 class="feature-title">Game Development</h3>
                                <p class="feature-description">Crafting engaging gaming experiences with advanced mechanics and stunning visuals.</p>
                                <div class="feature-stats">
                                    <div class="stat">
                                        <span class="stat-value">30+</span>
                                        <span class="stat-label">Games</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-value">1M+</span>
                                        <span class="stat-label">Players</span>
                                    </div>
                                </div>
                                <a href="#" class="feature-link">
                                    Explore More
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    showInitialElements() {
        // Make sure section is visible
        const section = this.container.querySelector('.features-section');
        if (section) {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        }

        // Show title immediately
        const title = this.container.querySelector('.section-title');
        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }

        // Animate cards with delay
        const cards = this.container.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: Array.from({ length: 41 }, (_, i) => i * 0.025) // More granular thresholds
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const ratio = entry.intersectionRatio;
                    
                    if (element.classList.contains('feature-card')) {
                        // Calculate dynamic delay based on position and scroll direction
                        const index = Array.from(element.parentNode.children).indexOf(element);
                        const delay = this.getStaggeredDelay(index);
                        
                        // Apply progressive animations based on intersection ratio
                        const progress = Math.min(ratio * 2, 1);
                        const translateY = 50 * (1 - progress);
                        const scale = 0.95 + (0.05 * progress);
                        const opacity = progress;

                        element.style.transform = `translateY(${translateY}px) scale(${scale})`;
                        element.style.opacity = opacity;

                        // Animate card contents with staggered delays
                        this.animateCardContents(element, delay, progress);
                        
                        // Trigger stats animation when card is 50% visible
                        if (progress > 0.5 && !element.dataset.statsAnimated) {
                            this.animateStats(element);
                            element.dataset.statsAnimated = 'true';
                        }
                    } else if (element.classList.contains('section-title')) {
                        element.style.opacity = ratio;
                        element.style.transform = `translateY(${30 * (1 - ratio)}px)`;
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elements = this.container.querySelectorAll('.feature-card, .section-title');
        elements.forEach(element => observer.observe(element));
    }

    getStaggeredDelay(index) {
        const baseDelay = 100;
        const staggerDelay = 150;
        return baseDelay + (index * staggerDelay);
    }

    animateCardContents(card, baseDelay, progress) {
        const elements = [
            card.querySelector('.feature-icon'),
            card.querySelector('.feature-title'),
            card.querySelector('.feature-description'),
            card.querySelector('.feature-stats'),
            card.querySelector('.feature-link')
        ];

        elements.forEach((element, index) => {
            if (element) {
                const delay = baseDelay + (index * 100);
                const elementProgress = Math.max(0, (progress - 0.2) * 1.25);
                
                element.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
                element.style.opacity = elementProgress;
                element.style.transform = `translateY(${20 * (1 - elementProgress)}px)`;
            }
        });

        if (progress > 0.5) {
            this.animateStats(card);
        }
    }

    animateStats(card) {
        const stats = card.querySelectorAll('.stat');
        stats.forEach(stat => {
            const valueElement = stat.querySelector('.stat-value');
            const labelElement = stat.querySelector('.stat-label');
            
            // Skip if already animated
            if (valueElement.dataset.animated === 'true') return;
            
            const value = valueElement.textContent;
            const isPercentage = value.includes('%');
            const number = parseFloat(value);
            let currentNumber = 0;
            
            // Mark as animated
            valueElement.dataset.animated = 'true';
            
            const duration = 1500; // Animation duration in ms
            const steps = 30; // Number of steps
            const stepDuration = duration / steps;
            const increment = number / steps;
            
            // Start with 0 opacity for both elements
            valueElement.style.opacity = '0';
            labelElement.style.opacity = '0';
            
            // Show elements with animation
            setTimeout(() => {
                valueElement.style.opacity = '1';
                valueElement.style.transform = 'translateY(0)';
                
                // Animate label after value starts animating
                setTimeout(() => {
                    labelElement.style.opacity = '1';
                    labelElement.style.transform = 'translateY(0)';
                }, 200);
            }, 100);
            
            const interval = setInterval(() => {
                if (currentNumber >= number) {
                    clearInterval(interval);
                    valueElement.textContent = value;
                    return;
                }
                currentNumber += increment;
                valueElement.textContent = Math.floor(currentNumber) + (isPercentage ? '%' : '+');
            }, stepDuration);
        });
    }

    setupMouseEffects() {
        const cards = this.container.querySelectorAll('.feature-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${((y / rect.height) - 0.5) * 10}deg)
                    rotateY(${((x / rect.width) - 0.5) * 10}deg)
                    translateZ(10px)
                `;

                const cardFrame = card.querySelector('.card-frame');
                if (cardFrame) {
                    cardFrame.style.setProperty('--mouse-x', `${x}px`);
                    cardFrame.style.setProperty('--mouse-y', `${y}px`);
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateZ(0)';
            });
        });
    }

    setupParallaxEffect() {
        const section = this.container.querySelector('.features-section');
        const grid = this.container.querySelector('.cyber-grid');
        const cards = this.container.querySelectorAll('.feature-card');
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    const scrollDirection = scrollY > lastScrollY ? 1 : -1;
                    const sectionRect = section.getBoundingClientRect();
                    
                    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                        // Parallax for cyber grid
                        const gridProgress = (window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height);
                        this.updateGridParallax(grid, gridProgress, scrollDirection);

                        // Parallax for cards
                        cards.forEach((card, index) => {
                            const cardRect = card.getBoundingClientRect();
                            const cardProgress = (window.innerHeight - cardRect.top) / (window.innerHeight + cardRect.height);
                            this.updateCardParallax(card, cardProgress, index, scrollDirection);
                        });
                    }

                    lastScrollY = scrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateGridParallax(grid, progress, direction) {
        if (grid) {
            const rotateX = 60 + (progress * 5 * direction);
            const translateZ = -100 + (progress * 20);
            const translateY = progress * -50;
            grid.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                translateZ(${translateZ}px)
                translateY(${translateY}px)
            `;
        }
    }

    updateCardParallax(card, progress, index, direction) {
        const translateY = (progress * -20) * direction;
        const rotateX = (progress * 5) * direction;
        const translateZ = progress * 10;
        const xOffset = Math.sin((progress + index) * Math.PI) * 15;
        
        card.style.transform = `
            perspective(1000px)
            translateY(${translateY}px)
            rotateX(${rotateX}deg)
            translateZ(${translateZ}px)
            translateX(${xOffset}px)
        `;
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        this.container.querySelector('.features-section').appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const section = this.container.querySelector('.features-section');
            const rect = section.getBoundingClientRect();
            const total = rect.height;
            const current = window.innerHeight - rect.top;
            const progress = (current / total) * 100;
            
            if (progress >= 0 && progress <= 100) {
                progressBar.style.width = `${progress}%`;
                progressBar.style.opacity = progress > 5 ? 1 : 0;
            }
        });
    }
} 