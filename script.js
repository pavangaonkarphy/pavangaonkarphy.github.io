// Website Controller - Enhanced Version with Smooth Navigation
class WebsiteController {
    constructor() {
        this.elements = {};
        this.isAnimating = false;
        this.animationDuration = 300;
        this.currentSection = 'about'; // Default section
        this.isInArticleView = false; // Track if we're viewing an article
        this.cvRendered = false; // Track if the CV PDF has been rendered yet
        
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
            // If we're in article view and navigating away, clean up first
            if (this.isInArticleView && targetSection !== 'blog') {
                this.cleanupArticleView();
            }
            
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
    
    // Enhanced section switching with proper cleanup
    showSection(targetId) {
        if (this.isAnimating || (this.currentSection === targetId && !this.isInArticleView)) return;
        
        this.isAnimating = true;
        
        // Clean up any active states
        this.cleanupAllSections();
        
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
            this.isAnimating = false;
            return;
        }
        
        // Hide current section with smooth transition
        const currentSectionEl = document.getElementById(this.currentSection);
        if (currentSectionEl?.classList.contains('active')) {
            this.hideSection(currentSectionEl);
        }
        
        // Show new section after animation
        setTimeout(() => {
            this.displaySection(targetSection, targetId);
            this.currentSection = targetId;
            this.isInArticleView = false;
            this.isAnimating = false;
        }, this.animationDuration);
    }
    
    // Clean up all sections
    cleanupAllSections() {
        this.elements.sections.forEach(section => {
            section.classList.remove('active', 'slide-in', 'slide-out');
        });
        
        // Reset article view state
        if (this.elements.articlePage) {
            this.elements.articlePage.classList.remove('active');
        }
    }
    
    // Clean up article view specifically
    cleanupArticleView() {
        if (this.elements.articlePage) {
            this.elements.articlePage.classList.remove('active');
        }
        if (this.elements.blogSection) {
            this.elements.blogSection.classList.remove('active');
        }
        this.isInArticleView = false;
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
        // Ensure clean state
        section.classList.remove('slide-out');
        section.classList.add('active', 'slide-in');
        
        // Trigger section-specific animations
        if (sectionId === 'about') {
            setTimeout(() => this.animateAboutSection(), 100);
        }
        
        if (sectionId === 'cv' && !this.cvRendered) {
            this.renderCV();
        }
        
        // Reset scroll position to top
        section.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Render the CV PDF inline as canvas pages, so it always shows in-page
    // instead of downloading or relying on the browser's PDF plugin.
    async renderCV() {
        this.cvRendered = true;
        const loadingEl = document.getElementById('cv-loading');
        const pagesContainer = document.getElementById('cv-pages');

        if (!pagesContainer || typeof pdfjsLib === 'undefined') {
            if (loadingEl) loadingEl.textContent = 'Could not load CV viewer.';
            return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js';

        try {
            const pdf = await pdfjsLib.getDocument('pavan_cv.pdf').promise;
            const containerWidth = pagesContainer.clientWidth || 850;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);

                // Scale so the rendered page matches the container width at a
                // sharp resolution (extra factor for crispness on retina screens).
                const unscaledViewport = page.getViewport({ scale: 1 });
                const scale = (containerWidth / unscaledViewport.width) * 2;
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext('2d');

                await page.render({ canvasContext: context, viewport }).promise;
                pagesContainer.appendChild(canvas);
            }

            if (loadingEl) loadingEl.classList.add('hidden');
        } catch (err) {
            console.error('Failed to render CV:', err);
            if (loadingEl) loadingEl.textContent = 'Could not load CV. Please try again later.';
        }
    }

    // Update active navigation link
    updateActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(nav => nav.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    // About section animation (optimized and smooth)
animateAboutSection() {
    // First, ensure all texts are reset
    this.elements.revealTexts.forEach(text => {
        text.classList.remove('visible');
        // Force reflow to ensure the browser registers the removal
        void text.offsetWidth;
    });
    
    // Then animate them in with proper timing
    this.elements.revealTexts.forEach((text, index) => {
        setTimeout(() => {
            text.classList.add('visible');
        }, index * 200 + 100);
    });
}
    
    // Optimized button animations
    animateButton(btn, state) {
        if (!btn) return;
        
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
        
        // Improve focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }
    
    // Setup performance optimizations
    setupPerformanceOptimizations() {
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle any resize-specific logic here
                this.handleResize();
            }, 250);
        });
        
        // Optimize scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 16); // ~60fps
        }, { passive: true });
    }
    
    // Handle resize events
    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
    
    // Handle scroll events
    handleScroll() {
        // Add any scroll-based functionality here if needed
    }
    
    // Update current year
    updateCurrentYear() {
        if (this.elements.currentYear) {
            this.elements.currentYear.textContent = new Date().getFullYear();
        }
    }
    
    // Initialize default section
    initializeDefaultSection() {
        // Ensure clean state on load
        this.cleanupAllSections();
        
        // Show about section by default
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.classList.add('active');
            this.currentSection = 'about';
        }
        
        // Animate after a short delay
        setTimeout(() => {
            this.animateAboutSection();
        }, 300);
    }
    
    // Enhanced article page navigation
    openArticlePage(articleId) {
        if (this.isAnimating) return;
        
        const { blogSection, articlePage } = this.elements;
        if (!blogSection || !articlePage) return;
        
        this.isAnimating = true;
        this.isInArticleView = true;
        
        // Clean transition to article
        this.cleanupAllSections();
        
        // Show article page
        setTimeout(() => {
            articlePage.classList.add('active', 'slide-in');
            this.updateActiveNavLink(document.querySelector('[data-section="blog"]'));
            
            // Scroll to top of article
            articlePage.scrollTop = 0;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            this.isAnimating = false;
        }, 50);
    }
    
    // Enhanced back to blog navigation
    backToBlog() {
        if (this.isAnimating) return;
        
        const { blogSection, articlePage } = this.elements;
        if (!blogSection || !articlePage) return;
        
        this.isAnimating = true;
        
        // Smooth transition back to blog
        articlePage.classList.add('slide-out');
        
        setTimeout(() => {
            articlePage.classList.remove('active', 'slide-out');
            blogSection.classList.add('active', 'slide-in');
            
            this.currentSection = 'blog';
            this.isInArticleView = false;
            this.updateActiveNavLink(document.querySelector('[data-section="blog"]'));
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            this.isAnimating = false;
        }, this.animationDuration);
    }
    
    // Public method to get current state
    getCurrentState() {
        return {
            currentSection: this.currentSection,
            isInArticleView: this.isInArticleView,
            isAnimating: this.isAnimating
        };
    }
    
    // Method to force reset if needed
    forceReset() {
        this.isAnimating = false;
        this.isInArticleView = false;
        this.cleanupAllSections();
        this.showSection('about');
        this.updateActiveNavLink(document.querySelector('[data-section="about"]'));
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

// Debug function (can be removed in production)
function debugWebsite() {
    console.log('Website State:', window.websiteController?.getCurrentState());
}
