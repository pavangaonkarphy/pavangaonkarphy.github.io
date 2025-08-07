// Website Controller - Optimized Version
class WebsiteController {
    constructor() {
        this.elements = {};
        this.isAnimating = false;
        this.animationDuration = 300;
        this.currentSection = 'about'; // Default section
        
        this.init();
    }
    
    // Cache DOM elements once
    cacheElements() {
        this.elements = {
            hamburger: document.querySelector('.hamburger'),
            navMenu: document.querySelector('.nav-menu'),
            navLinks: document.querySelectorAll('.nav-link'),
            sections: document.querySelectorAll('.section'),
            buttons: document.querySelectorAll('.btn'),
            revealTexts: document.querySelectorAll('.reveal-text'),
            images: document.querySelectorAll('img[loading="lazy"]'),
            currentYear: document.getElementById('current-year'),
            blogSection: document.getElementById('blog'),
            articlePage: document.getElementById('article-page')
        };
    }
    
    // Initialize all functionality
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupAccessibility();
        this.setupPerformanceOptimizations();
        this.updateCurrentYear();
        this.initializeDefaultSection();
        
        console.log('Website initialized successfully! 🚀');
    }
    
    // Bind all event listeners
    bindEvents() {
        // Mobile menu events
        this.elements.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Global click handler (using event delegation)
        document.addEventListener('click', this.handleGlobalClick.bind(this));
        document.addEventListener('keydown', this.handleGlobalKeydown.bind(this));
        
        // Navigation events
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
            link.addEventListener('keydown', this.handleNavKeydown.bind(this));
        });
        
        // Button hover effects (optimized)
        this.elements.buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => this.animateButton(btn, 'hover'));
            btn.addEventListener('mouseleave', () => this.animateButton(btn, 'default'));
            btn.addEventListener('mousedown', () => this.animateButton(btn, 'active'));
            btn.addEventListener('mouseup', () => this.animateButton(btn, 'hover'));
        });
        
        // Image loading events
        this.elements.images.forEach(img => {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', this.handleImageError.bind(this));
        });
    }
    
    // Handle global clicks (event delegation)
    handleGlobalClick(e) {
        const { hamburger, navMenu } = this.elements;
        
        // Close mobile menu when clicking outside
        if (navMenu?.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger?.contains(e.target)) {
            this.closeMobileMenu();
        }
    }
    
    // Handle global keyboard events
    handleGlobalKeydown(e) {
        if (e.key === 'Escape' && this.elements.navMenu?.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }
    
    // Handle navigation clicks
    handleNavClick(e) {
        e.preventDefault();
        
        const targetSection = e.currentTarget.getAttribute('data-section');
        if (targetSection && !this.isAnimating) {
            this.showSection(targetSection);
            this.updateActiveNavLink(e.currentTarget);
            this.closeMobileMenu();
        }
    }
    
    // Handle navigation keyboard events
    handleNavKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.currentTarget.click();
        }
    }
    
    // Optimized mobile menu toggle
    toggleMobileMenu() {
        const { hamburger, navMenu } = this.elements;
        if (!hamburger || !navMenu) return;
        
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Control body scroll
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu
    closeMobileMenu() {
        const { hamburger, navMenu } = this.elements;
        if (!hamburger || !navMenu) return;
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // Optimized section switching with animation queue
    showSection(targetId) {
        if (this.isAnimating || this.currentSection === targetId) return;
        
        this.isAnimating = true;
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
            this.isAnimating = false;
            return;
        }
        
        // Hide current section
        const currentSectionEl = document.getElementById(this.currentSection);
        if (currentSectionEl?.classList.contains('active')) {
            this.hideSection(currentSectionEl);
        }
        
        // Show new section after animation
        setTimeout(() => {
            this.displaySection(targetSection, targetId);
            this.currentSection = targetId;
            this.isAnimating = false;
        }, this.animationDuration);
    }
    
    // Hide section with animation
    hideSection(section) {
        section.classList.add('slide-out');
        section.classList.remove('slide-in');
        
        setTimeout(() => {
            section.classList.remove('active', 'slide-out');
        }, this.animationDuration);
    }
    
    // Show section with animation
    displaySection(section, sectionId) {
        section.classList.add('active', 'slide-in');
        section.classList.remove('slide-out');
        
        // Trigger section-specific animations
        if (sectionId === 'about') {
            setTimeout(() => this.animateAboutSection(), 100);
        }
    }
    
    // Update active navigation link
    updateActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(nav => nav.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    // About section animation (optimized)
    animateAboutSection() {
        this.elements.revealTexts.forEach((text, index) => {
            setTimeout(() => text.classList.add('visible'), index * 200);
        });
    }
    
    // Optimized button animations
    animateButton(btn, state) {
        const transforms = {
            default: '',
            hover: 'translateY(-2px)',
            active: 'translateY(0)'
        };
        
        btn.style.transform = transforms[state] || transforms.default;
    }
    
    // Handle image loading errors
    handleImageError(e) {
        e.target.style.opacity = '0.5';
        e.target.alt = 'Image not available';
    }
    
    // Setup accessibility features
    setupAccessibility() {
        const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotion = (e) => {
            document.body.classList.toggle('reduce-motion', e.matches);
        };
        
        reduceMotionQuery.addEventListener('change', handleReducedMotion);
        handleReducedMotion(reduceMotionQuery);
    }
    
    // Setup performance optimizations
    setupPerformanceOptimizations() {
        // Debounce resize events if needed
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize logic here if needed
            }, 250);
        });
    }
    
    // Update current year
    updateCurrentYear() {
        if (this.elements.currentYear) {
            this.elements.currentYear.textContent = new Date().getFullYear();
        }
    }
    
    // Initialize default section
    initializeDefaultSection() {
        setTimeout(() => {
            this.animateAboutSection();
        }, 500);
    }
    
    // Public methods for blog functionality
    openArticlePage(articleId) {
        if (this.isAnimating) return;
        
        const { blogSection, articlePage } = this.elements;
        if (!blogSection || !articlePage) return;
        
        blogSection.classList.remove('active');
        articlePage.classList.add('active');
        
        this.updateActiveNavLink(document.querySelector('[data-section="blog"]'));
    }
    
    backToBlog() {
        if (this.isAnimating) return;
        
        const { blogSection, articlePage } = this.elements;
        if (!blogSection || !articlePage) return;
        
        articlePage.classList.remove('active');
        blogSection.classList.add('active');
        
        this.updateActiveNavLink(document.querySelector('[data-section="blog"]'));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.websiteController = new WebsiteController();
});

// Global functions for blog (backward compatibility)
function openArticlePage(articleId) {
    window.websiteController?.openArticlePage(articleId);
}

function backToBlog() {
    window.websiteController?.backToBlog();
}
