document.addEventListener('DOMContentLoaded', function() {
    const starsContainers = document.querySelectorAll('.stars');
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const navbar = document.querySelector('.navbar');
    const navbarIndicator = document.querySelector('.navbar-indicator');
    let isNavbarVisible = false;

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            smoothScrollTo(targetSection, 1500);
        });
    });

    function smoothScrollTo(targetElement, duration) {
        const start = window.scrollY;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const distance = targetPosition - start;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easing = easeInOutQuad(progress);

            window.scrollTo(0, start + distance * easing);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        requestAnimationFrame(animation);
    }

    starsContainers.forEach(container => {
        const numStars = 100;

        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            star.style.top = `${y}%`;
            star.style.left = `${x}%`;

            const delay = Math.random() * 5;
            star.style.animationDelay = `${delay}s`;

            container.appendChild(star);
        }
    });

    function showNavbar() {
        navbar.classList.remove('hidden');
        navbar.classList.add('visible');
        isNavbarVisible = true;
    }

    function hideNavbar() {
        navbar.classList.remove('visible');
        navbar.classList.add('hidden');
        isNavbarVisible = false;
    }

    document.addEventListener('mousemove', function(event) {
        const rect = navbar.getBoundingClientRect();
        if (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
        ) {
            if (!isNavbarVisible) {
                showNavbar();
            }
        } else {
            if (isNavbarVisible) {
                hideNavbar();
            }
        }
    });

    navbar.addEventListener('mouseenter', showNavbar);
    navbar.addEventListener('mouseleave', hideNavbar);
    navbarIndicator.addEventListener('click', showNavbar);
});
