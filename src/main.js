// Modern Portfolio JavaScript - Enhanced Version

// Global Variables
let isLoading = true;
let scrollProgress = 0;
let currentSection = 'hero';
let currentTheme = 'dark';
let soundEnabled = true;
let terminalActive = false;

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

// Sound effects
let hoverSound, clickSound;

// Terminal commands
const terminalCommands = {
    'help': 'Available commands: about, skills, projects, contact, clear, exit, whoami, date, ls',
    'about': 'Cybersecurity Specialist & Data Analyst passionate about ethical hacking and data science.',
    'skills': 'Python, Java, SQL, Cybersecurity, Data Analysis, Machine Learning, Ethical Hacking',
    'projects': 'Customer Churn Prediction, Buy & Sell System, Personal Finance Dashboard, Network Security Analysis',
    'contact': 'Email: iambhavesh55@gmail.com | Phone: +61 468 538 615 | LinkedIn: bhavesh-chaudhary',
    'whoami': 'bhavesh_chaudhary',
    'date': () => new Date().toString(),
    'ls': 'portfolio.html  resume.pdf  projects/  skills/  contact.txt',
    'clear': 'CLEAR_TERMINAL',
    'exit': 'EXIT_TERMINAL'
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced portfolio...');
    
    // Initialize theme
    initializeTheme();
    
    // Initialize sound
    initializeSound();
    
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
    const savedSound = localStorage.getItem('portfolio-sound') !== 'false';
    currentTheme = savedTheme;
    soundEnabled = savedSound;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Initialize theme selector
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
        const themeButtons = themeSelector.querySelectorAll('.theme-btn');
        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                setTheme(theme);
                playSound('click');
            });
            
            if (btn.getAttribute('data-theme') === currentTheme) {
                btn.classList.add('active');
            }
        });
    }
    
    // Initialize sound toggle
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', toggleSound);
        updateSoundIcon();
    }
}

// Set theme
function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('portfolio-theme', currentTheme);
    
    // Update active button
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-theme') === currentTheme) {
            btn.classList.add('active');
        }
    });
    
    // Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Toggle sound
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('portfolio-sound', soundEnabled);
    updateSoundIcon();
    
    if (soundEnabled) {
        playSound('click');
    }
}

// Update sound icon
function updateSoundIcon() {
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        const icon = soundToggle.querySelector('i');
        if (soundEnabled) {
            icon.className = 'fas fa-volume-up';
            soundToggle.classList.remove('muted');
        } else {
            icon.className = 'fas fa-volume-mute';
            soundToggle.classList.add('muted');
        }
    }
}

// Initialize sound effects
function initializeSound() {
    hoverSound = document.getElementById('hoverSound');
    clickSound = document.getElementById('clickSound');
}

// Play sound effect
function playSound(type) {
    if (!soundEnabled) return;
    
    try {
        let audio;
        if (type === 'hover' && hoverSound) {
            audio = hoverSound.cloneNode();
        } else if (type === 'click' && clickSound) {
            audio = clickSound.cloneNode();
        }
        
        if (audio) {
            audio.volume = 0.1; // Very subtle
            audio.play().catch(() => {}); // Ignore errors
        }
    } catch (error) {
        // Silently ignore sound errors
    }
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
        initializeSkillBars();
        initializeTerminal();
        initializeEnhancedEffects();
        startAnimations();
        initializeTypedJS();
        initializeAOS();
        console.log('Enhanced portfolio initialization complete!');
    } catch (error) {
        console.error('Error starting portfolio:', error);
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }
}

// Initialize AOS (Animate On Scroll)
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0
        });
        console.log('AOS initialized successfully');
    } else {
        console.warn('AOS library not loaded');
    }
}

// Initialize Typed.js for typing effect
function initializeTypedJS() {
    const typedElement = document.getElementById('typedText');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typedText', {
            strings: typingTexts,
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '_',
            autoInsertCss: true
        });
        console.log('Typed.js initialized successfully');
    } else {
        console.warn('Typed.js library not loaded or element not found');
        // Fallback to original typing animation
        startTypingAnimation();
    }
}

// Fallback typing animation
function startTypingAnimation() {
    const typingElement = document.getElementById('typedText');
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
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            typeSpeed = 500;
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
            
            playSound('click');
            
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

// Initialize skill progress bars
function initializeSkillBars() {
    const skillCategories = document.querySelectorAll('.skills-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                        bar.parentElement.parentElement.classList.add('animate');
                        
                        // Play sound for each skill bar
                        setTimeout(() => {
                            playSound('hover');
                        }, 1500);
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    skillCategories.forEach(category => {
        observer.observe(category);
    });
}

// Initialize terminal easter egg
function initializeTerminal() {
    const terminalOverlay = document.getElementById('terminalOverlay');
    const terminalClose = document.getElementById('terminalClose');
    const terminalBody = document.getElementById('terminalBody');
    
    // Key combination to open terminal (Ctrl + `)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            openTerminal();
        }
        
        // Escape to close terminal
        if (e.key === 'Escape' && terminalActive) {
            closeTerminal();
        }
    });
    
    // Close button
    if (terminalClose) {
        terminalClose.addEventListener('click', closeTerminal);
    }
    
    // Click outside to close
    if (terminalOverlay) {
        terminalOverlay.addEventListener('click', (e) => {
            if (e.target === terminalOverlay) {
                closeTerminal();
            }
        });
    }
    
    function openTerminal() {
        if (terminalOverlay) {
            terminalActive = true;
            terminalOverlay.classList.add('active');
            playSound('click');
            
            // Add welcome message
            addTerminalLine('Welcome to Bhavesh\'s Portfolio Terminal!');
            addTerminalLine('Type "help" for available commands.');
            addTerminalLine('');
        }
    }
    
    function closeTerminal() {
        if (terminalOverlay) {
            terminalActive = false;
            terminalOverlay.classList.remove('active');
            
            // Clear terminal content
            setTimeout(() => {
                if (terminalBody) {
                    terminalBody.innerHTML = `
                        <div class="terminal-line">
                            <span class="terminal-prompt">bhavesh@portfolio:~$</span>
                            <span class="terminal-cursor">_</span>
                        </div>
                    `;
                }
            }, 300);
        }
    }
    
    function addTerminalLine(text, type = 'output') {
        if (!terminalBody) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line terminal-${type}`;
        line.textContent = text;
        
        // Insert before the cursor line
        const cursorLine = terminalBody.querySelector('.terminal-line:last-child');
        terminalBody.insertBefore(line, cursorLine);
        
        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    // Simulate terminal input (for demo purposes)
    let commandIndex = 0;
    const demoCommands = ['help', 'whoami', 'skills', 'projects'];
    
    function simulateCommand() {
        if (!terminalActive || commandIndex >= demoCommands.length) return;
        
        const command = demoCommands[commandIndex];
        addTerminalLine(`bhavesh@portfolio:~$ ${command}`, 'input');
        
        setTimeout(() => {
            const response = terminalCommands[command];
            if (typeof response === 'function') {
                addTerminalLine(response());
            } else {
                addTerminalLine(response);
            }
            addTerminalLine('');
            commandIndex++;
            
            if (commandIndex < demoCommands.length) {
                setTimeout(simulateCommand, 2000);
            }
        }, 1000);
    }
    
    // Start demo after terminal opens
    setTimeout(() => {
        if (terminalActive) {
            simulateCommand();
        }
    }, 1000);
}

// Initialize enhanced effects
function initializeEnhancedEffects() {
    // Add hover sound effects to interactive elements
    const interactiveElements = document.querySelectorAll(
        '.btn, .nav-link, .skill-item, .project-card, .about-card, .contact-item, .filter-btn, .theme-btn'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            playSound('hover');
        });
        
        element.addEventListener('click', () => {
            playSound('click');
        });
    });
    
    // Enhanced scroll effects
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax background elements
        const bgElements = document.querySelectorAll('.bg-effects > *');
        bgElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
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
                playSound('click');
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
    } catch (error) {
        console.error('Error initializing animations:', error);
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
        
    } catch (error) {
        console.error('Error starting animations:', error);
    }
}

// Enhanced animated counters
function initializeCounters() {
    console.log('Initializing enhanced counters...');
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
            playSound('click');
            handleFormSubmission(this);
        });
        
        // Enhanced input animations
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                playSound('hover');
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
            playSound('click');
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