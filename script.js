document.addEventListener('DOMContentLoaded', () => {
    // Universal background container approach - works on all devices
    function createBackgroundContainer(targetElement, imageUrl, isHero = false) {
        // Remove any existing background containers
        const existingContainer = targetElement.querySelector(isHero ? '.hero-bg-container' : '.parallax-bg-container');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        // Create container for background
        const bgContainer = document.createElement('div');
        bgContainer.className = isHero ? 'hero-bg-container' : 'parallax-bg-container';
        
        // Create image element
        const bgImg = document.createElement('img');
        bgImg.className = isHero ? 'hero-bg-img' : 'parallax-bg-img';
        bgImg.src = imageUrl;
        bgImg.alt = '';
        bgImg.loading = isHero ? 'eager' : 'lazy';
        
        // Ensure image loads properly
        bgImg.onload = () => {
            console.log(`Background image loaded: ${isHero ? 'Hero' : 'Parallax'}`);
        };
        
        bgImg.onerror = () => {
            console.warn(`Failed to load background image: ${imageUrl}`);
            // Fallback: set a solid color background
            bgContainer.style.background = 'linear-gradient(135deg, #1B5E3F, #2E865F)';
        };
        
        // Append image to container
        bgContainer.appendChild(bgImg);
        
        // Insert container as first child of target element
        targetElement.insertBefore(bgContainer, targetElement.firstChild);
        
        return { container: bgContainer, image: bgImg };
    }
    
    // Setup hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroBg = createBackgroundContainer(hero, 'https://picsum.photos/1920/1080?random=1', true);
        
        // Add parallax effect - lighter version for mobile
        const isDesktop = window.innerWidth >= 1024 && window.matchMedia('(hover: hover)').matches;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        // Enable parallax on both desktop and mobile, but with different intensities
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            // Different rates for different devices - much more subtle for iOS
            let rate;
            if (isDesktop) {
                rate = scrolled * 0.0005; // Desktop gets more pronounced effect
            } else if (isIOS) {
                rate = scrolled * 0.0008; // Very subtle for iOS to prevent abrupt zoom
            } else {
                rate = scrolled * 0.0015; // Android mobile gets moderate effect
            }
            
            // Only apply transform if element is visible
            if (scrolled < window.innerHeight * 1.5) {
                // Use transform3d for better performance and smoother animation
                heroBg.container.style.transform = `translate3d(0, ${rate}px, 0)`;
                heroBg.container.style.webkitTransform = `translate3d(0, ${rate}px, 0)`;
            }
            ticking = false;
        }
         function requestParallaxUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        // iOS-specific optimizations for smoother scrolling
        if (isIOS) {
            // Throttle scroll events more aggressively on iOS
            let iosScrollTimeout;
            window.addEventListener('scroll', () => {
                clearTimeout(iosScrollTimeout);
                iosScrollTimeout = setTimeout(requestParallaxUpdate, 8); // 8ms throttle for iOS
            }, { passive: true });
        } else {
            // Use regular RAF for other devices
            window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
        }
        window.addEventListener('resize', () => {
            // Reset transform on resize with iOS-specific handling
            heroBg.container.style.transform = 'translate3d(0, 0, 0)';
            heroBg.container.style.webkitTransform = 'translate3d(0, 0, 0)';
            
            // Force a repaint on iOS to prevent visual glitches
            if (isIOS) {
                heroBg.container.style.display = 'none';
                heroBg.container.offsetHeight; // Trigger reflow
                heroBg.container.style.display = '';
            }
        }, { passive: true });
        
        if (isDesktop) {
            console.log('Desktop parallax enabled (rate: 0.05)');
        } else if (isIOS) {
            console.log('iOS parallax enabled (rate: 0.008 - very subtle)');
        } else {
            console.log('Mobile parallax enabled (rate: 0.015)');
        }
    }
    
    // Setup parallax sections if they exist
    const parallaxSections = document.querySelectorAll('.parallax-section');
    parallaxSections.forEach((section, index) => {
        createBackgroundContainer(section, `https://picsum.photos/1920/1080?random=${index + 2}`, false);
    });
    
    // Remove any old parallax elements that might exist
    const oldParallaxBgs = document.querySelectorAll('.parallax-bg');
    oldParallaxBgs.forEach(bg => bg.remove());

    // Ripple effect for buttons and interactive elements
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - rect.left - radius}px`;
        circle.style.top = `${event.clientY - rect.top - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        // Remove ripple after animation
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    // Add ripple effect to buttons and stat items (excluding join-team-button)
    const rippleElements = document.querySelectorAll('.btn, .stat-item');
    rippleElements.forEach(element => {
        if (element.id !== 'join-team-button') {
            element.addEventListener('click', createRipple);
        }
    });

    // Get team cards for both ripple and pulse effects
    const teamCards = document.querySelectorAll('.team-card');
    
    // Add ripple effect to team cards
    teamCards.forEach(card => {
        card.addEventListener('click', createRipple);
    });

    // Number counting animation for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        const hasPlus = element.dataset.plus === 'true';
        
        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNumber = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = hasPlus ? currentNumber + '+' : currentNumber;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = hasPlus ? target + '+' : target; // Ensure final number is exact
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Start animations when page loads
    statNumbers.forEach((stat, index) => {
        const targetNumber = parseInt(stat.dataset.target, 10);
        // Add a delay for each stat to create a staggered effect
        setTimeout(() => {
            animateNumber(stat, targetNumber);
        }, index * 200);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scroll for the "Join a Team" button
    const joinTeamButton = document.getElementById('join-team-button');
    if (joinTeamButton) {
        joinTeamButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add pulse effect
            joinTeamButton.classList.add('pulse-click');
            joinTeamButton.addEventListener('animationend', () => {
                joinTeamButton.classList.remove('pulse-click');
            }, { once: true });
            
            // Smooth scroll after a brief delay to let the animation start
            setTimeout(() => {
                const teamsSection = document.getElementById('teams');
                if (teamsSection) {
                    teamsSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    }

    // Add pulsing effect on click for team cards
    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('pulse-click');
            card.addEventListener('animationend', () => {
                card.classList.remove('pulse-click');
            }, { once: true });
        });
    });
});
