document.addEventListener('DOMContentLoaded', () => {
    // Initialize Rellax.js for smooth parallax effects
    if (typeof Rellax !== 'undefined') {
        var rellax = new Rellax('[data-rellax-speed]', {
            speed: -7,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });
        console.log('Rellax.js initialized successfully');
    } else {
        console.warn('Rellax.js library not loaded');
    }

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
