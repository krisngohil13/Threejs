import '../../styles/Projects.css';

export class Projects {
    constructor(container) {
        this.container = container;
        this.audioContext = null;
        this.init();
        this.setupIntersectionObserver();
        this.setupParallax();
        this.setupAudio();
        this.setupHoverEffects();
        this.setupMouseEffects();
        this.setupParallaxEffect();
        this.setupScrollProgress();
        this.showInitialElements();
    }

    init() {
        this.container.innerHTML = `
            <section class="section2">
                <div class="parallax-bg"></div>
                <div class="scroll-progress"></div>
                <div class="container">
                    <div class="section-title">
                        <h2>Trusted Partners</h2>
                        <p>Empowering Global Innovation Through Strategic Partnerships</p>
                    </div>
                    <div class="partners-showcase">
                        <div class="partners-grid">
                            ${this.generatePartnerCards()}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    generatePartnerCards() {
        const partners = [
            { name: '24/7 AI', image: '/assets/images/clients/24:7.png', category: 'Technology' },
            { name: 'Google', image: '/assets/images/clients/google.png', category: 'Technology' },
            { name: 'Microsoft', image: '/assets/images/clients/microsoft.png', category: 'Technology' },
            { name: 'PayPal', image: '/assets/images/clients/paypal.png', category: 'Fintech' },
            { name: 'HSBC', image: '/assets/images/clients/hsbc.png', category: 'Banking' },
            { name: 'SBI', image: '/assets/images/clients/sbi.png', category: 'Banking' },
            { name: 'Zomato', image: '/assets/images/clients/zomato.png', category: 'Food Tech' },
            { name: 'Swiggy', image: '/assets/images/clients/swiggy.png', category: 'Food Tech' },
            { name: 'AstraZeneca', image: '/assets/images/clients/AstraZeneca.png', category: 'Healthcare' },
            { name: 'Canon', image: '/assets/images/clients/canon.png', category: 'Technology' },
            { name: 'Upwork', image: '/assets/images/clients/upwork.png', category: 'Technology' },
            { name: 'Yokohama', image: '/assets/images/clients/yokohama.png', category: 'Automotive' }
        ];

        // Group partners into rows of 3
        const rows = [];
        for (let i = 0; i < partners.length; i += 3) {
            rows.push(partners.slice(i, i + 3));
        }

        return rows.map((row, rowIndex) => `
            <div class="partners-grid-row" data-row="${rowIndex}">
                ${row.map(partner => `
                    <div class="partner-card" data-category="${partner.category}">
                        <div class="partner-overlay"></div>
                        <div class="partner-content">
                            <div class="partner-image">
                                <img src="${partner.image}" alt="${partner.name}">
                            </div>
                            <div class="partner-info">
                                <h3>${partner.name}</h3>
                                <span class="partner-category">${partner.category}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    setupAudio() {
        const initAudio = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                document.removeEventListener('click', initAudio);
                document.removeEventListener('touchstart', initAudio);
            }
        };

        document.addEventListener('click', initAudio);
        document.addEventListener('touchstart', initAudio);
    }

    playHoverSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(2400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1800, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    setupParallax() {
        const section = this.container.querySelector('.section2');
        const parallaxBg = this.container.querySelector('.parallax-bg');
        const clients = this.container.querySelectorAll('.client');
        const title = this.container.querySelector('.section-title');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sectionRect = section.getBoundingClientRect();
            
            if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                const progress = (window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height);
                
                // Parallax background effect
                parallaxBg.style.transform = `translateY(${scrolled * 0.1}px) translateZ(-1px) scale(${2 + progress * 0.2})`;
                
                // Title parallax
                title.style.transform = `translateY(${progress * 30}px) translateZ(${progress * 50}px)`;
                
                // Clients staggered parallax
                clients.forEach((client, index) => {
                    if (!client.matches(':hover')) {
                        const row = Math.floor(index / 6);
                        const speed = 0.05 + (row % 3) * 0.02;
                        const yPos = -scrolled * speed;
                        const zPos = progress * (20 + index % 3 * 10);
                        
                        client.style.transform = `translateY(${yPos}px) translateZ(${zPos}px)`;
                    }
                });
            }
        });

        // Enhanced mouse move parallax effect
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        const updateParallax = () => {
            // Smooth transition for mouse movement
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
                clients.forEach((client, index) => {
                    if (!client.matches(':hover')) {
                        const row = Math.floor(index / 6);
                        const speed = 15 + (row % 3) * 5;
                        const xPos = currentX * speed;
                        const yPos = currentY * speed;
                        const zPos = Math.abs(currentX + currentY) * 20;
                        
                        client.style.transform = `
                            translate3d(${xPos}px, ${yPos}px, ${zPos}px)
                            rotateX(${-currentY * 5}deg)
                            rotateY(${currentX * 5}deg)
                        `;
                    }
                });

                // Parallax effect for title
                title.style.transform = `
                    translate3d(${currentX * 20}px, ${currentY * 20}px, 50px)
                    rotateX(${-currentY * 2}deg)
                    rotateY(${currentX * 2}deg)
                `;

                // Parallax effect for background
                parallaxBg.style.transform = `
                    translate3d(${-currentX * 50}px, ${-currentY * 50}px, 0)
                    scale(2.2)
                `;
            }

            requestAnimationFrame(updateParallax);
        };

        updateParallax();
    }

    setupHoverEffects() {
        const partnerCards = this.container.querySelectorAll('.partner-card');
        
        partnerCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.playHoverSound();
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: Array.from({ length: 41 }, (_, i) => i * 0.025)
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('partners-showcase')) {
                        element.classList.add('visible');
                        
                        // Animate rows with staggered delay and alternating directions
                        const rows = element.querySelectorAll('.partners-grid-row');
                        rows.forEach((row, index) => {
                            const isEven = index % 2 === 0;
                            
                            // Set initial state
                            row.style.opacity = '0';
                            row.style.transform = isEven ? 'translateX(-100px)' : 'translateX(100px)';
                            
                            // Trigger animation after a delay
                            setTimeout(() => {
                                row.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                                row.style.opacity = '1';
                                row.style.transform = 'translateX(0)';
                                row.classList.add('visible');
                                
                                // Animate cards within the row
                                const cards = row.querySelectorAll('.partner-card');
                                cards.forEach((card, cardIndex) => {
                                    // Reset card state
                                    card.style.opacity = '0';
                                    card.style.transform = isEven ? 
                                        'translateX(-50px) scale(0.8)' : 
                                        'translateX(50px) scale(0.8)';
                                    
                                    // Trigger card animation
                                    setTimeout(() => {
                                        card.style.animation = isEven ?
                                            'cardSlideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                                            'cardSlideInFromRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                                        card.classList.add('visible');
                                    }, cardIndex * 100 + 100); // Add 100ms base delay
                                });
                            }, index * 200);
                        });
                    }
                } else {
                    const element = entry.target;
                    if (element.classList.contains('partners-showcase')) {
                        // Handle exit animations
                        const rows = element.querySelectorAll('.partners-grid-row');
                        rows.forEach((row, index) => {
                            const isEven = index % 2 === 0;
                            const cards = row.querySelectorAll('.partner-card');
                            
                            // Animate cards out first
                            cards.forEach((card, cardIndex) => {
                                setTimeout(() => {
                                    card.style.animation = isEven ?
                                        'cardSlideOutToLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards' :
                                        'cardSlideOutToRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                                }, cardIndex * 100);
                            });
                            
                            // Then animate row out
                            setTimeout(() => {
                                row.style.opacity = '0';
                                row.style.transform = isEven ? 'translateX(-100px)' : 'translateX(100px)';
                            }, cards.length * 100 + 100);
                        });
                        
                        // Reset everything after animations complete
                        setTimeout(() => {
                            element.classList.remove('visible');
                            rows.forEach(row => {
                                row.classList.remove('visible');
                                row.style.animation = '';
                                const cards = row.querySelectorAll('.partner-card');
                                cards.forEach(card => {
                                    card.classList.remove('visible');
                                    card.style.animation = '';
                                });
                            });
                        }, 1000);
                    }
                }
            });
        }, observerOptions);

        // Observe the showcase section
        const showcase = this.container.querySelector('.partners-showcase');
        if (showcase) {
            observer.observe(showcase);
        }
    }

    setupMouseEffects() {
        const cards = this.container.querySelectorAll('.partner-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateX = ((y / rect.height) - 0.5) * 10;
                const rotateY = ((x / rect.width) - 0.5) * 10;
                
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateZ(10px)
                    scale(1.02)
                `;

                const overlay = card.querySelector('.partner-overlay');
                if (overlay) {
                    overlay.style.setProperty('--mouse-x', `${x}px`);
                    overlay.style.setProperty('--mouse-y', `${y}px`);
                    overlay.style.opacity = '1';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateZ(0)';
                const overlay = card.querySelector('.partner-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });
    }

    setupParallaxEffect() {
        const section = this.container.querySelector('.section2');
        const bg = this.container.querySelector('.parallax-bg');
        const cards = this.container.querySelectorAll('.partner-card');
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const sectionRect = section.getBoundingClientRect();
                    
                    if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                        const progress = (window.innerHeight - sectionRect.top) / (window.innerHeight + sectionRect.height);
                        
                        if (bg) {
                            bg.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + progress * 0.1})`;
                        }

                        cards.forEach((card, index) => {
                            const speed = 1 + (index % 3) * 0.1;
                            const yOffset = scrolled * speed * 0.02;
                            const xOffset = Math.sin(progress * Math.PI + index) * 15;
                            
                            card.style.transform = `
                                translateY(${-yOffset}px)
                                translateX(${xOffset}px)
                                translateZ(${progress * 20}px)
                            `;
                        });
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupScrollProgress() {
        const progressBar = this.container.querySelector('.scroll-progress');
        
        window.addEventListener('scroll', () => {
            const section = this.container.querySelector('.section2');
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

    showInitialElements() {
        const section = this.container.querySelector('.section2');
        const title = this.container.querySelector('.section-title');
        const showcase = this.container.querySelector('.partners-showcase');

        if (section) {
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        }

        if (title) {
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }

        if (showcase) {
            const rect = showcase.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                showcase.classList.add('visible');
                
                const rows = showcase.querySelectorAll('.partners-grid-row');
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.classList.add('visible');
                        
                        const cards = row.querySelectorAll('.partner-card');
                        cards.forEach((card, cardIndex) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                            }, cardIndex * 100);
                        });
                    }, index * 200);
                });
            }
        }
    }
}
