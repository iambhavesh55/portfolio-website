// Modern Portfolio JavaScript - Fixed Version

// Global Variables
let isLoading = true;
let scrollProgress = 0;
let currentSection = 'hero';

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing portfolio...');
    
    // Force remove loading screen immediately if it exists
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        console.log('Found loading screen, removing it...');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            isLoading = false;
            console.log('Loading screen removed, starting portfolio...');
            startPortfolio();
        }, 1000); // Show loading for 1 second
    } else {
        console.log('No loading screen found, starting portfolio directly...');
        isLoading = false;
        startPortfolio();
    }
});

// Start the main portfolio functionality
function startPortfolio() {
    console.log('Starting portfolio functionality...');
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeCounters();
    initializeContactForm();
    initializeBackToTop();
    initializeParticles();
    startAnimations();
}

// Navigation
function initializeNavigation() {
    console.log('Initializing navigation...');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) {
        console.error('Navbar not found');
        return;
    }
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                smoothScrollTo(offsetTop, 800);
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    console.log('Navigation initialized successfully');
}

// Smooth scroll function
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
    
    currentSection = current;
}

// Scroll Effects
function initializeScrollEffects() {
    console.log('Initializing scroll effects...');
    const scrollProgressBar = document.querySelector('.scroll-progress');
    
    if (!scrollProgressBar) {
        console.error('Scroll progress bar not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = (scrollTop / docHeight) * 100;
        scrollProgressBar.style.width = scrollProgress + '%';
    });
    
    console.log('Scroll effects initialized');
}

// Animations
function initializeAnimations() {
    console.log('Initializing animations...');
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    console.log(`Found ${animatedElements.length} elements to animate`);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Start animations after loading
function startAnimations() {
    console.log('Starting animations...');
    
    // Hero title animation
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Start counter animations
    setTimeout(() => {
        animateCounters();
    }, 1000);
}

// Animated counters
function initializeCounters() {
    console.log('Initializing counters...');
    // This will be called from startAnimations
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    if (counters.length === 0) {
        console.error('No counter elements found');
        return;
    }
    
    console.log(`Found ${counters.length} counters to animate`);
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);

            counter.textContent = current + (current < target ? '' : '+');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Contact Form
function initializeContactForm() {
    console.log('Initializing contact form...');
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
    
    // Input animations
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    console.log('Contact form initialized');
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }

    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:iambhavesh55@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form and show success message
    form.reset();
    showNotification('Thank you for your message! Your email client should open with the message ready to send.', 'success');

    // Animate submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Message Sent!</span>';
    submitBtn.style.background = 'var(--gradient-secondary)';

    setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
    }, 3000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--danger)' : 'var(--success)'};
        color: white;
        padding: var(--space-md) var(--space-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-strong);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Back to Top
function initializeBackToTop() {
    console.log('Initializing back to top...');
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) {
        console.log('Back to top button not found');
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        smoothScrollTo(0, 800);
    });
    
    console.log('Back to top initialized');
}

// Particles
function initializeParticles() {
    console.log('Initializing particles...');
    createFloatingParticles();
    createMatrixEffect();
}

function createFloatingParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) {
        console.log('Particle container not found');
        return;
    }

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 245, 255, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
}

function createMatrixEffect() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) {
        console.log('Matrix container not found');
        return;
    }

    // Create matrix columns
    for (let i = 0; i < 20; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 5}%;
            top: -100%;
            width: 2px;
            height: 100px;
            background: linear-gradient(transparent, rgba(0, 245, 255, 0.5), transparent);
            animation: matrixDrop ${3 + Math.random() * 3}s linear infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
        matrixContainer.appendChild(column);
    }
}

// Button Effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const particles = this.querySelector('.btn-particles');
            if (particles) {
                createButtonParticles(particles);
            }
        });
    });
});

function createButtonParticles(container) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: buttonParticle 0.6s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 600);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS animations for notifications and particles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes particleFloat {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6;
        }
        50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1;
        }
    }
    
    @keyframes matrixDrop {
        0% { 
            transform: translateY(-100vh); 
            opacity: 0;
        }
        10% { 
            opacity: 1;
        }
        90% { 
            opacity: 1;
        }
        100% { 
            transform: translateY(100vh); 
            opacity: 0;
        }
    }
    
    @keyframes buttonParticle {
        0% { 
            transform: scale(0) translateY(0); 
            opacity: 1;
        }
        100% { 
            transform: scale(1) translateY(-20px); 
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Don't hide the image, just log the error
        });
        
        img.addEventListener('load', function() {
            console.log('Image loaded successfully:', this.src);
        });
    });
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow. Consider optimizing assets.');
        }
    }
});

// Reduced motion preference detection
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Force loading screen to disappear if it takes too long (fallback)
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        console.log('Force removing loading screen (fallback)...');
        loadingScreen.classList.add('hidden');
        isLoading = false;
        if (typeof startPortfolio === 'function') {
            startPortfolio();
        }
    }
}, 3000); // 3 second fallback

console.log('Portfolio JavaScript loaded successfully');