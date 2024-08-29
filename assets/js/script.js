document.addEventListener('DOMContentLoaded', function() {
    const starsContainers = document.querySelectorAll('.stars');
    const navLinks = document.querySelectorAll('.navbar ul li a');
    const navbar = document.querySelector('.navbar');
    const navbarIndicator = document.querySelector('.navbar-indicator');
    let isNavbarVisible = false;

    // Añade un evento de clic a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Evita el comportamiento por defecto del enlace
            event.preventDefault();

            // Obtiene el id del enlace
            const targetId = this.getAttribute('href').substring(1);

            // Selecciona la sección objetivo por su id
            const targetSection = document.getElementById(targetId);

            // Desplaza suavemente hacia la sección objetivo
            smoothScrollTo(targetSection, 1500); // 1500 ms para la duración
        });
    });

    // Función de desplazamiento suave personalizada
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

    // Crear estrellas de manera discontinua
    starsContainers.forEach(container => {
        const numStars = 100; // Número total de estrellas que quieres

        for (let i = 0; i < numStars; i++) {
            // Crear un nuevo elemento de estrella
            const star = document.createElement('div');
            star.classList.add('star');

            // Establecer un tamaño aleatorio para la estrella
            const size = Math.random() * 3 + 1; // Tamaño entre 1px y 4px
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // Posicionar la estrella en una posición aleatoria dentro del contenedor
            const x = Math.random() * 100; // % de la posición horizontal
            const y = Math.random() * 100; // % de la posición vertical
            star.style.top = `${y}%`;
            star.style.left = `${x}%`;

            // Establecer un retardo aleatorio para la animación de la estrella
            const delay = Math.random() * 5; // Retardo entre 0s y 5s
            star.style.animationDelay = `${delay}s`;

            // Añadir la estrella al contenedor
            container.appendChild(star);
        }
    });

    // Funciones para mostrar y ocultar el navbar
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

    // Mostrar el navbar al mover el mouse cerca
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

    // Mostrar el navbar al hacer hover sobre el navbar
    navbar.addEventListener('mouseenter', showNavbar);
    navbar.addEventListener('mouseleave', hideNavbar);

    // Mostrar el navbar al hacer clic en el indicador
    navbarIndicator.addEventListener('click', showNavbar);
});
