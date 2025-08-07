 
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
function openArticlePage(articleId) {
    // Hide the blog section
    const blogSection = document.getElementById('blog');
    blogSection.classList.remove('active');
    
    // Show the article page
    const articlePage = document.getElementById('article-page');
    articlePage.classList.add('active');
    
    // Update navigation to show blog is still active
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="blog"]').classList.add('active');
}

function backToBlog() {
    // Hide the article page
    const articlePage = document.getElementById('article-page');
    articlePage.classList.remove('active');
    
    // Show the blog section
    const blogSection = document.getElementById('blog');
    blogSection.classList.add('active');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="blog"]').classList.add('active');
}
