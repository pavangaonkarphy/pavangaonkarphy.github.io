
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
function openArticlePage(articleId) {
    // Sample article content - replace with your actual content
    const articles = {
        'quantum-mechanics-intro': {
            title: 'Ideas that i found interesting',
            date: 'July 12, 2025',
            category: 'Physics',
            readTime: '4 min read',
            content: `
                <p>I have always liked the general theory of relativity., initially because it was, of course, mind-bending—you have time travel, extremely strange counterintuitive concepts, and obviously the thought experiments of Einstein. But that is not why I like the theory anymore. At least, there is more to the theory beyond all these things—that is, mathematics. While these ideas are very cool, there is an underlying beauty to the theory itself: that is, Riemannian geometry and the idea of describing space-time with Riemannian geometry. The Riemannian geometry was not described by Einstein; instead, when Einstein was establishing the GTR, he found out that the mathematics he needed to describe it was established by Bernhard Riemann a few decades ago.</p>

                <p>This is not unusual in physics. There are many times in history when the math needed to explain physical theories already existed. And often, that math fits so perfectly that it feels like it was made just for that theory—even though it wasn't. There's a famous article that talks about this amazing connection between math and physics. It's called The <a href="https://webhomes.maths.ed.ac.uk/~v1ranick/papers/wigner.pdf" target="_blank">Unreasonable Effectiveness of Mathematics in the Natural Sciences.</a></p>
                
                <p>There is this idea that the coolest thing about physics is all about black holes, general relativity, and quantum mechanics. There are two different paths that one can take in physics: those are high energy physics and condensed matter physics. For many students, the reason to do physics is to describe the fundamental nature of the universe. Many physicists describe themselves as trying to understand the mind of God. Is that really true? If you understand the fundamental properties of the particles that describe the universe, can you understand every phenomenon? Read the following article by Paul Anderson (one of the greatest physicist on 20th century) to find out.
               <a href="https://cse-robotics.engr.tamu.edu/dshell/cs689/papers/anderson72more_is_different.pdf" target="_blank">More is different</a></p>
            `
        }
    };
    
    const article = articles[articleId];
    if (article) {
        const articleContent = document.getElementById('article-content');
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
        
        // Hide blog section and show article page
        showSection('article-page');
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(nav => nav.classList.remove('active'));
    }
}

function backToBlog() {
    showSection('blog');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="blog"]').classList.add('active');
}
