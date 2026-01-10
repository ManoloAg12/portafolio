document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. LÓGICA DEL CARRUSEL PEQUEÑO (TARJETAS)
       ========================================= */
    const carousels = document.querySelectorAll('.group\\/carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                const video = slide.querySelector('video');
                if (video) video.pause();

                if (i === index) {
                    slide.classList.remove('opacity-0', 'z-0');
                    slide.classList.add('opacity-100', 'z-10');
                } else {
                    slide.classList.remove('opacity-100', 'z-10');
                    slide.classList.add('opacity-0', 'z-0');
                }
            });
        }

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            });

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            });
        }
    });
});

/* =========================================
   2. LÓGICA DEL LIGHTBOX (ZOOM INTELIGENTE)
   ========================================= */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

let currentLbIndex = 0;
let currentLbMedia = [];

// Función para abrir el Lightbox
function openLightbox(element) {
    currentLbMedia = []; // Resetear lista

    // 1. Verificar si la imagen pertenece a un grupo (carrusel)
    const projectCard = element.closest('.group\\/carousel');
    
    if (projectCard) {
        // --- ES UN CARRUSEL (PROYECTOS) ---
        // Mostrar flechas de navegación
        lbPrev.classList.remove('hidden'); lbPrev.classList.add('md:block');
        lbNext.classList.remove('hidden'); lbNext.classList.add('md:block');

        // Recolectar todas las imágenes/videos del grupo
        const slides = projectCard.querySelectorAll('.carousel-slide');
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            const video = slide.querySelector('video source');
            if (img) currentLbMedia.push({ type: 'image', src: img.src });
            else if (video) currentLbMedia.push({ type: 'video', src: video.src });
        });

    } else {
        // --- ES UNA IMAGEN INDIVIDUAL (CERTIFICADOS) ---
        // Ocultar flechas de navegación
        lbPrev.classList.remove('md:block'); lbPrev.classList.add('hidden');
        lbNext.classList.remove('md:block'); lbNext.classList.add('hidden');

        // Solo agregar la imagen clickeada
        currentLbMedia.push({ type: 'image', src: element.src });
    }

    // 2. Encontrar índice y mostrar
    const clickedSrc = element.src;
    currentLbIndex = currentLbMedia.findIndex(media => media.src === clickedSrc);
    if (currentLbIndex === -1) currentLbIndex = 0;

    updateLightboxContent();
    lightbox.classList.remove('hidden');
    setTimeout(() => lightbox.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden';
}

// Función para cerrar
function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxContent.innerHTML = '';
    }, 300);
    document.body.style.overflow = 'auto';
}

// Función para actualizar el contenido
function updateLightboxContent() {
    const media = currentLbMedia[currentLbIndex];
    lightboxContent.innerHTML = '';

    if (media.type === 'image') {
        const img = document.createElement('img');
        img.src = media.src;
        img.className = "max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm animate-fade-in";
        lightboxContent.appendChild(img);
    } else if (media.type === 'video') {
        const video = document.createElement('video');
        video.className = "max-w-full max-h-[85vh] shadow-2xl rounded-sm animate-fade-in";
        video.controls = true;
        video.autoplay = true;
        const source = document.createElement('source');
        source.src = media.src;
        source.type = "video/mp4";
        video.appendChild(source);
        lightboxContent.appendChild(video);
    }
}

// Eventos de Navegación
lbNext.addEventListener('click', (e) => { e.stopPropagation(); currentLbIndex = (currentLbIndex + 1) % currentLbMedia.length; updateLightboxContent(); });
lbPrev.addEventListener('click', (e) => { e.stopPropagation(); currentLbIndex = (currentLbIndex - 1 + currentLbMedia.length) % currentLbMedia.length; updateLightboxContent(); });

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('#lightbox-content') === null) {
        if(e.target !== lbNext && e.target !== lbPrev) closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    // Solo permitir navegación con teclado si hay más de un elemento
    if (currentLbMedia.length > 1) {
        if (e.key === 'ArrowRight') lbNext.click();
        if (e.key === 'ArrowLeft') lbPrev.click();
    }
});