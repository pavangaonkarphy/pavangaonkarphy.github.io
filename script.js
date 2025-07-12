// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const hamburgerBtn = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Mobile menu toggle
    hamburgerBtn.addEventListener('click', function() {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // Section navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu after navigation
            closeMobileMenu();
        });
    });
    
    function showSection(targetId) {
        // Hide all sections with slide-out animation
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                section.classList.add('slide-out');
                section.classList.remove('slide-in');
                
                setTimeout(() => {
                    section.classList.remove('active', 'slide-out');
                }, 300);
            }
        });
        
        // Show target section with slide-in animation
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active', 'slide-in');
                targetSection.classList.remove('slide-out');
                
                // Trigger section-specific animations only for about section
                if (targetId === 'about') {
                    setTimeout(() => {
                        animateAboutSection();
                    }, 100);
                }
            }
        }, 300);
    }
    
    // About section text reveal animation (keep this one)
    function animateAboutSection() {
        const revealTexts = document.querySelectorAll('.reveal-text');
        
        revealTexts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('visible');
            }, index * 200);
        });
    }
    
    // Simple button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });
    
    // Update current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Enhanced keyboard navigation
    navLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Performance optimization: Reduce animations on slower devices
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion(e) {
        if (e.matches) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
    }
    
    reduceMotionQuery.addEventListener('change', handleReducedMotion);
    handleReducedMotion(reduceMotionQuery);
    
    // Image loading handling
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.alt = 'Image not available';
        });
    });
    
    // Initialize the about section with text animations
    setTimeout(() => {
        animateAboutSection();
    }, 500);
    
    console.log('Website initialized successfully! 🚀');
});
// Blog Article Functions
function openArticle(articleId) {
    const modal = document.getElementById('article-modal');
    const articleContent = document.getElementById('article-content');
    
    // Sample article content - replace with your actual content
    const articles = {
        'quantum-mechanics-intro': {
            title: 'Introduction to Quantum Mechanics',
            date: 'July 12, 2025',
            category: 'Physics',
            readTime: '8 min read',
            content: `
                <p>Quantum mechanics stands as one of the most revolutionary theories in physics, fundamentally changing our understanding of nature at its most basic level. Unlike classical physics, which deals with predictable, deterministic systems, quantum mechanics introduces probability and uncertainty as fundamental features of reality.</p>
                
                <h3>The Quantum Revolution</h3>
                <p>The development of quantum mechanics began in the early 20th century when physicists like Max Planck, Albert Einstein, and Niels Bohr discovered that energy comes in discrete packets called "quanta." This was a radical departure from the continuous nature of classical physics.</p>
                
                <p>One of the most fascinating aspects of quantum mechanics is the concept of <strong>superposition</strong> - the idea that particles can exist in multiple states simultaneously until observed. This is famously illustrated by Schrödinger's cat thought experiment.</p>
                
                <h3>Mathematical Foundations</h3>
                <p>The mathematical framework of quantum mechanics relies heavily on linear algebra, particularly complex vector spaces called Hilbert spaces. As I mentioned in my about section, it's remarkable how abstract mathematical concepts like linear algebra become essential tools for understanding physical reality.</p>
                
                <p>The Schrödinger equation, which governs the evolution of quantum systems, is a beautiful example of how mathematics describes the probabilistic nature of quantum phenomena:</p>
                
                <p style="text-align: center; font-style: italic; color: var(--accent-color);">iℏ ∂|ψ⟩/∂t = Ĥ|ψ⟩</p>
                
                <h3>Philosophical Implications</h3>
                <p>Quantum mechanics raises profound questions about the nature of reality. The <a href="https://en.wikipedia.org/wiki/Measurement_problem" target="_blank">measurement problem</a> and various interpretations like the <a href="https://en.wikipedia.org/wiki/Many-worlds_interpretation" target="_blank">Many-worlds interpretation</a> continue to spark debates among physicists and philosophers.</p>
                
                <p>What fascinates me most is how quantum mechanics challenges our classical intuition about reality, suggesting that the universe might be fundamentally different from what we experience in our everyday lives.</p>
                
                <p>This is just the beginning of our quantum journey. In future articles, I plan to explore specific phenomena like entanglement, quantum tunneling, and the connections between quantum mechanics and general relativity.</p>
            `
        }
    };
    
    const article = articles[articleId];
    if (article) {
        articleContent.innerHTML = `
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span>📅 ${article.date}</span>
                <span>📚 ${article.category}</span>
                <span>⏱️ ${article.readTime}</span>
            </div>
            <div class="article-body">
                ${article.content}
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeArticle() {
    const modal = document.getElementById('article-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('article-modal');
    if (e.target === modal) {
        closeArticle();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeArticle();
    }
});
