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
                if (video) video.pause(); // Pausar video al cambiar

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
   2. LÓGICA DEL LIGHTBOX (ZOOM CON CARRUSEL)
   ========================================= */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

let currentLbIndex = 0;
let currentLbMedia = []; // Aquí guardaremos las imágenes/videos del proyecto actual

// Función para abrir el Lightbox
function openLightbox(element) {
    // 1. Encontrar el contenedor del proyecto padre
    const projectCard = element.closest('.group\\/carousel');
    
    if (!projectCard) return;

    // 2. Recolectar todas las imágenes y videos de ESTE proyecto
    currentLbMedia = [];
    const slides = projectCard.querySelectorAll('.carousel-slide');
    
    slides.forEach((slide) => {
        const img = slide.querySelector('img');
        const video = slide.querySelector('video source');
        
        if (img) {
            currentLbMedia.push({ type: 'image', src: img.src });
        } else if (video) {
            currentLbMedia.push({ type: 'video', src: video.src });
        }
    });

    // 3. Encontrar el índice de la imagen que se clickeó
    const clickedSrc = element.src;
    currentLbIndex = currentLbMedia.findIndex(media => media.src === clickedSrc);
    if (currentLbIndex === -1) currentLbIndex = 0;

    // 4. Mostrar el Lightbox
    updateLightboxContent();
    lightbox.classList.remove('hidden');
    setTimeout(() => lightbox.classList.add('opacity-100'), 10);
    document.body.style.overflow = 'hidden'; // Bloquear scroll
}

// Función para cerrar
function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxContent.innerHTML = ''; // Limpiar contenido
    }, 300);
    document.body.style.overflow = 'auto';
}

// Función para actualizar el contenido (Imagen o Video)
function updateLightboxContent() {
    const media = currentLbMedia[currentLbIndex];
    lightboxContent.innerHTML = ''; // Limpiar anterior

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

// Navegación Siguiente
lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLbIndex = (currentLbIndex + 1) % currentLbMedia.length;
    updateLightboxContent();
});

// Navegación Anterior
lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentLbIndex = (currentLbIndex - 1 + currentLbMedia.length) % currentLbMedia.length;
    updateLightboxContent();
});

// Cerrar al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('#lightbox-content') === null) {
        // Si el clic no fue en los botones ni en el contenido
        if(e.target !== lbNext && e.target !== lbPrev) {
            closeLightbox();
        }
    }
});

// Navegación con Teclado
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') lbNext.click();
    if (e.key === 'ArrowLeft') lbPrev.click();
});