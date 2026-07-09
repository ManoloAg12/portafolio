document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // CARRUSEL DE TARJETAS DE PROYECTOS
    // ==========================================
    const projectCarousels = document.querySelectorAll('.project-carousel');

    projectCarousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.closest('.project-card').querySelector('.carousel-prev');
        const nextBtn = carousel.closest('.project-card').querySelector('.carousel-next');
        let currentIndex = 0;
        let autoPlayInterval;

        function showSlide(index) {
            // Pausar videos
            slides.forEach(slide => {
                const video = slide.querySelector('video');
                if (video) video.pause();
            });

            // Transición suave
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'z-0');
                    slide.classList.add('opacity-100', 'z-10');
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.classList.remove('opacity-100', 'z-10');
                    slide.classList.add('opacity-0', 'z-0');
                    slide.style.transform = 'scale(0.95)';
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Eventos de botones
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }

        // Hover pausa/reanuda
        carousel.closest('.project-card').addEventListener('mouseenter', stopAutoPlay);
        carousel.closest('.project-card').addEventListener('mouseleave', startAutoPlay);

        // Touch swipe para móviles
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                stopAutoPlay();
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                startAutoPlay();
            }
        });

        // Iniciar autoplay
        startAutoPlay();
    });
});