export class MainHeading {
    constructor(container) {
        this.container = container;
        this.init();
        this.initParallax();
    }

    init() {
        const template = `
            <div class="heading-container">
                <div class="heading-content">
                    <div class="heading-line parallax" data-speed="0.05">Crafting Digital</div>
                    <div class="heading-line highlight parallax" data-speed="0.08">Experiences</div>
                    <div class="heading-description parallax" data-speed="0.03">
                        We create immersive solutions that inspire and engage
                    </div>
                </div>
            </div>
        `;

        this.container.innerHTML = template;
        this.initializeAnimation();
    }

    initializeAnimation() {
        const lines = this.container.querySelectorAll('.heading-line');
        lines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.2}s`;
        });

        const description = this.container.querySelector('.heading-description');
        description.style.animationDelay = '0.4s';
    }

    initParallax() {
        const container = this.container;
        const elements = container.querySelectorAll('.parallax');
        let mouseX = 0, mouseY = 0;
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        // Update mouse position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            elements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed'));
                const x = (windowWidth / 2 - mouseX) * speed;
                const y = (windowHeight / 2 - mouseY) * speed;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });

        // Update window size on resize
        window.addEventListener('resize', () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        });

        // Add smooth transition on mouse enter/leave
        container.addEventListener('mouseenter', () => {
            elements.forEach(element => {
                element.style.transition = 'transform 0.2s ease-out';
            });
        });

        container.addEventListener('mouseleave', () => {
            elements.forEach(element => {
                element.style.transition = 'transform 0.5s ease-out';
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
} 