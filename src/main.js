// Modern Portfolio JavaScript - Enhanced Version

// Global Variables
let isLoading = true;
let scrollProgress = 0;
let currentSection = 'hero';
let currentTheme = 'dark';

// Typing animation texts
const typingTexts = [
    'Cybersecurity Specialist',
    'Data Analyst',
    'Ethical Hacker',
    'Problem Solver'
];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced portfolio...');
    
    // Initialize theme
    initializeTheme();
    
    // Force remove loading screen with multiple fallbacks
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        console.log('Found loading screen, removing it...');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            isLoading = false;
            console.log('Loading screen removed, starting portfolio...');
            startPortfolio();
        }, 1000);
    } else {
        console.log('No loading screen found, starting portfolio directly...');
        isLoading = false;
        startPortfolio();
    }
});

// Initialize theme system
function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio-theme', currentTheme);
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Start the main portfolio functionality
function startPortfolio() {
    console.log('Starting enhanced portfolio functionality...');
    try {
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeCounters();
        initializeContactForm();
        initializeBackToTop();
        initializeParticles();
        initializeProjectFilters();
        initializeTooltips();
        startAnimations();
        startTypingAnimation();
        console.log('Enhanced portfolio initialization complete!');
    } catch (error) {
        console.error('Error starting portfolio:', error);
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }
}

// Typing animation
function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    function type() {
        const currentText = typingTexts[currentTextIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentCharIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Tooltip system
function initializeTooltips() {
    const tooltip = document.getElementById('tooltip');
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const text = element.getAttribute('data-tooltip');
            tooltip.textContent = text;
            tooltip.classList.add('visible');
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });

        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
}

// Enhanced navigation
function initializeNavigation() {
    console.log('Initializing enhanced navigation...');
    try {
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
        
        // Enhanced navbar scroll effect with parallax
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            updateActiveNavLink();
        });
        
        console.log('Enhanced navigation initialized successfully');
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Enhanced smooth scroll function with easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Update active navigation link with enhanced detection
function updateActiveNavLink() {
    try {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
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
    } catch (error) {
        console.error('Error updating active nav link:', error);
    }
}

// Enhanced scroll effects with parallax
function initializeScrollEffects() {
    console.log('Initializing enhanced scroll effects...');
    try {
        const scrollProgressBar = document.querySelector('.scroll-progress');
        
        if (!scrollProgressBar) {
            console.error('Scroll progress bar not found');
            return;
        }
        
        window.addEventListener('scroll', throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrollProgress + '%';
            
            // Parallax effects
            const parallaxElements = document.querySelectorAll('.bg-effects > *');
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
        
        console.log('Enhanced scroll effects initialized');
    } catch (error) {
        console.error('Error initializing scroll effects:', error);
    }
}

// Enhanced animations with intersection observer
function initializeAnimations() {
    console.log('Initializing enhanced animations...');
    try {
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
                        
                        // Trigger counter animation for stats
                        if (entry.target.classList.contains('hero-stats')) {
                            animateCounters();
                        }
                        
                        // Trigger skills animations
                        if (entry.target.classList.contains('skills-container')) {
                            animateSkillsSection();
                        }
                    }, delay);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('[data-aos]');
        console.log(`Found ${animatedElements.length} elements to animate`);
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Add stats to observer
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
        
        // Add skills section to observer
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer) {
            observer.observe(skillsContainer);
        }
        
        // Initialize skill items with staggered animation
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.9)';
        });
        
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
}

// Enhanced Skills Section Animations
function animateSkillsSection() {
    try {
        // Add staggered animation to skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 50);
        });
        
    } catch (error) {
        console.error('Error animating skills section:', error);
    }
}

function createSkillsParticles() {
    try {
        const particleContainer = document.querySelector('.skills-particles');
        if (!particleContainer) return;
        
        // Clear existing particles
        particleContainer.innerHTML = '';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'skills-particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 6}s;
                animation-duration: ${6 + Math.random() * 4}s;
            `;
            particleContainer.appendChild(particle);
        }
    } catch (error) {
        console.error('Error creating skills particles:', error);
    }
}

// Enhanced 3D Tilt Effect for Skill Cards
function initializeSkillCardTilt() {
    try {
        const skillCards = document.querySelectorAll('.skills-category');
        
        skillCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    translateY(-15px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });
    } catch (error) {
        console.error('Error initializing skill card tilt:', error);
    }
}

// Enhanced start animations
function startAnimations() {
    console.log('Starting enhanced animations...');
    try {
        // Hero title animation with stagger
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 300);
        });
        
        // Animate profile frame
        setTimeout(() => {
            const profileFrame = document.querySelector('.profile-frame');
            if (profileFrame) {
                profileFrame.style.transform = 'translateY(0) rotateY(0) scale(1)';
                profileFrame.style.opacity = '1';
            }
        }, 800);
        
        // Initialize skill card tilt effects
        initializeSkillCardTilt();
        
    } catch (error) {
        console.error('Error starting animations:', error);
    }
}

// Enhanced animated counters
function initializeCounters() {
    console.log('Initializing enhanced counters...');
    
    // Initialize CTA counter animation
    initializeCTACounters();
}

function initializeCTACounters() {
    const ctaSection = document.getElementById('cta');
    if (!ctaSection) return;
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCTACounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(ctaSection);
}

function animateCTACounters() {
    const counters = [
        { element: document.querySelector('.cta-stat:nth-child(1) .stat-number'), target: 24, suffix: '/7' },
        { element: document.querySelector('.cta-stat:nth-child(2) .stat-number'), target: 48, suffix: 'h' },
        { element: document.querySelector('.cta-stat:nth-child(3) .stat-number'), target: 100, suffix: '%' }
    ];
    
    counters.forEach((counter, index) => {
        if (!counter.element) return;
        
        const duration = 1500 + (index * 200);
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(counter.target * easeOutQuart);
            
            counter.element.textContent = current + (progress === 1 ? counter.suffix : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                // Add completion animation
                counter.element.style.transform = 'scale(1.2)';
                counter.element.style.textShadow = '0 0 20px rgba(0, 245, 255, 0.8)';
                setTimeout(() => {
                    counter.element.style.transform = 'scale(1)';
                    counter.element.style.textShadow = '0 0 10px rgba(0, 245, 255, 0.5)';
                }, 300);
            }
        }
        
        // Delay each counter
        setTimeout(() => {
            requestAnimationFrame(updateCounter);
        }, index * 300);
    });
}

function animateCounters() {
    try {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        if (counters.length === 0) {
            console.error('No counter elements found');
            return;
        }
        
        console.log(`Found ${counters.length} counters to animate`);
        
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000 + (index * 200); // Stagger animation
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
                    // Add completion animation
                    counter.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        counter.style.transform = 'scale(1)';
                    }, 200);
                }
            }

            // Delay each counter
            setTimeout(() => {
                requestAnimationFrame(updateCounter);
            }, index * 200);
        });
    } catch (error) {
        console.error('Error animating counters:', error);
    }
}

// Enhanced contact form
function initializeContactForm() {
    console.log('Initializing enhanced contact form...');
    try {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) {
            console.log('Contact form not found');
            return;
        }

        // Form submission with enhanced validation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Enhanced input animations
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.transform = 'scale(1.02)';
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                this.style.transform = 'scale(1)';
            });

            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        console.log('Enhanced contact form initialized');
    } catch (error) {
        console.error('Error initializing contact form:', error);
    }
}

// Field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    field.classList.remove('error', 'success');
    
    if (value === '') return;
    
    if (fieldType === 'email') {
        if (isValidEmail(value)) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
        }
    } else if (value.length > 0) {
        field.classList.add('success');
    }
}

// Enhanced form submission
function handleFormSubmission(form) {
    try {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Enhanced validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        if (message.length < 10) {
            showNotification('Please enter a more detailed message.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="btn-text"><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Submit form using fetch API
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // Success
                form.reset();
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Success button animation
                submitBtn.innerHTML = '<span class="btn-text"><i class="fas fa-check"></i> Message Sent!</span>';
                submitBtn.style.background = 'var(--gradient-secondary)';
                submitBtn.style.transform = 'scale(1.05)';
                submitBtn.style.opacity = '1';
                
                // Reset form labels
                const formGroups = form.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.classList.remove('focused');
                });
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.transform = 'scale(1)';
                    submitBtn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            showNotification('There was an error sending your message. Please try again.', 'error');
            
            // Reset button on error
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        });

    } catch (error) {
        console.error('Error handling form submission:', error);
        showNotification('There was an error sending your message. Please try again.', 'error');
        
        // Reset button on error
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span>';
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    try {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'error' ? 'fas fa-exclamation-circle' : 
                    type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
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
            max-width: 350px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: var(--space-sm);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Enhanced back to top
function initializeBackToTop() {
    console.log('Initializing enhanced back to top...');
    try {
        const backToTop = document.getElementById('backToTop');
        
        if (!backToTop) {
            console.log('Back to top button not found');
            return;
        }
        
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));

        backToTop.addEventListener('click', () => {
            smoothScrollTo(0, 1000);
            
            // Add click animation
            backToTop.style.transform = 'scale(0.9)';
            setTimeout(() => {
                backToTop.style.transform = 'scale(1)';
            }, 150);
        });
        
        console.log('Enhanced back to top initialized');
    } catch (error) {
        console.error('Error initializing back to top:', error);
    }
}

// Enhanced particles system
function initializeParticles() {
    console.log('Initializing enhanced particles...');
    try {
        createFloatingParticles();
        createMatrixEffect();
        createInteractiveParticles();
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
}

function createFloatingParticles() {
    try {
        const particleContainer = document.querySelector('.floating-particles');
        if (!particleContainer) {
            console.log('Particle container not found');
            return;
        }

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(0, 245, 255, ${Math.random() * 0.5 + 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    } catch (error) {
        console.error('Error creating floating particles:', error);
    }
}

function createMatrixEffect() {
    try {
        const matrixContainer = document.querySelector('.matrix-rain');
        if (!matrixContainer) {
            console.log('Matrix container not found');
            return;
        }

        for (let i = 0; i < 30; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                left: ${i * 3.33}%;
                top: -100%;
                width: 1px;
                height: ${50 + Math.random() * 100}px;
                background: linear-gradient(transparent, rgba(0, 245, 255, ${Math.random() * 0.5 + 0.2}), transparent);
                animation: matrixDrop ${3 + Math.random() * 4}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            matrixContainer.appendChild(column);
        }
    } catch (error) {
        console.error('Error creating matrix effect:', error);
    }
}

function createInteractiveParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: 0, y: 0 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01
        };
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = '#00f5ff';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(updateParticles);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        if (Math.random() < 0.1) {
            particles.push(createParticle(mouse.x, mouse.y));
        }
    });

    resizeCanvas();
    updateParticles();
}

// Enhanced button effects
document.addEventListener('DOMContentLoaded', function() {
    try {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                const particles = this.querySelector('.btn-particles');
                if (particles) {
                    createButtonParticles(particles);
                }
                
                // Add ripple effect
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });

            btn.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    } catch (error) {
        console.error('Error initializing button effects:', error);
    }
});

function createButtonParticles(container) {
    try {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: buttonParticle 0.8s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    } catch (error) {
        console.error('Error creating button particles:', error);
    }
}

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

// Enhanced CSS animations
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
            transform: translateY(-30px) rotate(180deg); 
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
            transform: scale(1) translateY(-30px); 
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group input.success,
    .form-group textarea.success {
        border-color: var(--success);
        box-shadow: 0 0 0 3px rgba(0, 255, 136, 0.1);
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--danger);
        box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
    }
`;
document.head.appendChild(style);

// Enhanced error handling for images
document.addEventListener('DOMContentLoaded', function() {
    try {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                this.style.opacity = '0.5';
                this.style.filter = 'grayscale(100%)';
            });
            
            img.addEventListener('load', function() {
                console.log('Image loaded successfully:', this.src);
                this.style.opacity = '1';
                this.style.filter = 'none';
            });
        });
    } catch (error) {
        console.error('Error setting up image error handling:', error);
    }
});

// Enhanced performance monitoring
window.addEventListener('load', () => {
    try {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
            
            if (loadTime > 3000) {
                console.warn('Page load time is slow. Consider optimizing assets.');
            }
            
            // Log performance metrics
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Performance metrics:', {
                DNS: perfData.domainLookupEnd - perfData.domainLookupStart,
                TCP: perfData.connectEnd - perfData.connectStart,
                Request: perfData.responseStart - perfData.requestStart,
                Response: perfData.responseEnd - perfData.responseStart,
                DOM: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
            });
        }
    } catch (error) {
        console.error('Error monitoring performance:', error);
    }
});

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Reduced motion preference detection
try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
        console.log('Reduced motion preferences detected');
    }
} catch (error) {
    console.error('Error checking motion preferences:', error);
}

// Ultimate fallback
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
        console.log('Ultimate fallback: Force removing loading screen...');
        loadingScreen.classList.add('hidden');
        loadingScreen.style.display = 'none';
        isLoading = false;
        if (typeof startPortfolio === 'function') {
            startPortfolio();
        }
    }
}, 3000);

console.log('Enhanced Portfolio JavaScript loaded successfully');