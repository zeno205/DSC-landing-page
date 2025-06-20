// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Counter animation for hero stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(heroSection);

// Team card hover effects with enhanced interactivity
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        
        // Add subtle glow effect
        this.style.boxShadow = '0 30px 60px rgba(99, 102, 241, 0.15)';
        
        // Animate the overlay icon
        const overlay = this.querySelector('.card-overlay');
        if (overlay) {
            overlay.style.transform = 'scale(1.1) rotate(10deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        
        const overlay = this.querySelector('.card-overlay');
        if (overlay) {
            overlay.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    
    // Add click tracking and ripple effect
    card.addEventListener('click', function(e) {
        const teamName = this.getAttribute('data-team');
        console.log(`User clicked on ${teamName} team`);
        
        // Create ripple effect
        const ripple = document.createElement('div');
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
            background: rgba(99, 102, 241, 0.1);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.team-card, .feature-item, .about-image');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in', 'visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initial check for elements already in view
revealOnScroll();

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        heroImg.style.transform = `translateY(${rate}px)`;
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Enhanced scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#teams').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Add subtle mouse follow effect for hero section
document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;
    
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
});

// Reset hero position when mouse leaves
document.querySelector('.hero').addEventListener('mouseleave', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.transform = 'translate(0, 0)';
});

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

console.log('🚀 EliteClub landing page loaded successfully!');
console.log('👨‍💻 Created by zeno205');
