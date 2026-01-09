document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los contenedores de carrusel
    const carousels = document.querySelectorAll('.group\\/carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentIndex = 0;

        // Función para mostrar el slide actual
        function showSlide(index) {
            // Ocultar todos
            slides.forEach((slide, i) => {
                slide.classList.remove('opacity-100', 'z-10');
                slide.classList.add('opacity-0', 'z-0');
                
                // Pausar video si el slide oculto era un video
                const video = slide.querySelector('video');
                if (video) {
                    video.pause();
                }
            });

            // Mostrar el actual
            slides[index].classList.remove('opacity-0', 'z-0');
            slides[index].classList.add('opacity-100', 'z-10');
        }

        // Evento Botón Siguiente
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte
            currentIndex = (currentIndex + 1) % slides.length; // Ciclo infinito
            showSlide(currentIndex);
        });

        // Evento Botón Anterior
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    });
});