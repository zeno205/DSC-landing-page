document.addEventListener('DOMContentLoaded', () => {
    // Stat counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.dataset.target, 10);
                let currentNumber = 0;
                const increment = Math.ceil(targetNumber / 100);

                const updateNumber = () => {
                    if (currentNumber < targetNumber) {
                        currentNumber += increment;
                        if (currentNumber > targetNumber) {
                            currentNumber = targetNumber;
                        }
                        target.textContent = currentNumber;
                        requestAnimationFrame(updateNumber);
                    } else {
                        target.textContent = targetNumber; // Ensure it ends exactly on the target
                    }
                };
                updateNumber();
                observer.unobserve(target); // Animate only once
            }
        });
    }, {
        threshold: 0.5
    });

    statNumbers.forEach(stat => {
        observer.observe(stat);
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
});
