document.addEventListener('DOMContentLoaded', () => {
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

    // Add ripple effect to buttons (excluding join-team-button)
    const buttons = document.querySelectorAll('.btn, .team-card, .stat-item');
    buttons.forEach(button => {
        if (button.id !== 'join-team-button') {
            button.addEventListener('click', createRipple);
        }
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
            const teamsSection = document.getElementById('teams');
            if (teamsSection) {
                teamsSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add pulsing effect on click for team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add('pulse-click');
            card.addEventListener('animationend', () => {
                card.classList.remove('pulse-click');
            }, { once: true });
        });
    });
});
