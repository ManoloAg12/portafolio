// ==========================================
// LIGHTBOX MEJORADO CON ANIMACIONES
// ==========================================

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

let currentLbIndex = 0;
let currentLbMedia = [];

function openLightbox(element) {
    currentLbMedia = [];

    const projectCard = element.closest('.project-card');
    
    if (projectCard) {
        // Proyecto con carrusel
        lbPrev.classList.remove('hidden');
        lbNext.classList.remove('hidden');
        
        const slides = projectCard.querySelectorAll('.carousel-slide');
        slides.forEach((slide) => {
            const img = slide.querySelector('img');
            const video = slide.querySelector('video source');
            if (img) {
                currentLbMedia.push({ type: 'image', src: img.src, alt: img.alt });
            } else if (video) {
                currentLbMedia.push({ type: 'video', src: video.src });
            }
        });
    } else {
        // Imagen individual (certificados)
        lbPrev.classList.add('hidden');
        lbNext.classList.add('hidden');
        currentLbMedia.push({ type: 'image', src: element.src });
    }

    const clickedSrc = element.src;
    currentLbIndex = currentLbMedia.findIndex(media => media.src === clickedSrc);
    if (currentLbIndex === -1) currentLbIndex = 0;

    updateLightboxContent();
    lightbox.classList.remove('hidden');
    setTimeout(() => {
        lightbox.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxContent.innerHTML = '';
        // Pausar video si existe
        const video = lightboxContent.querySelector('video');
        if (video) video.pause();
    }, 300);
    document.body.style.overflow = 'auto';
}

function updateLightboxContent() {
    const media = currentLbMedia[currentLbIndex];
    lightboxContent.innerHTML = '';

    if (media.type === 'image') {
        const img = document.createElement('img');
        img.src = media.src;
        img.className = "max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg animate-fade-in";
        img.style.animation = 'fadeIn 0.4s ease-out';
        lightboxContent.appendChild(img);
    } else if (media.type === 'video') {
        const video = document.createElement('video');
        video.className = "max-w-full max-h-[85vh] shadow-2xl rounded-lg";
        video.controls = true;
        video.autoplay = true;
        video.style.animation = 'fadeIn 0.4s ease-out';
        const source = document.createElement('source');
        source.src = media.src;
        source.type = "video/mp4";
        video.appendChild(source);
        lightboxContent.appendChild(video);
    }
}

// Navegación con botones
lbNext.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    currentLbIndex = (currentLbIndex + 1) % currentLbMedia.length; 
    updateLightboxContent(); 
});

lbPrev.addEventListener('click', (e) => { 
    e.stopPropagation(); 
    currentLbIndex = (currentLbIndex - 1 + currentLbMedia.length) % currentLbMedia.length; 
    updateLightboxContent(); 
});

// Cerrar al hacer clic fuera
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    }
    
    if (currentLbMedia.length > 1) {
        if (e.key === 'ArrowRight') {
            currentLbIndex = (currentLbIndex + 1) % currentLbMedia.length;
            updateLightboxContent();
        }
        if (e.key === 'ArrowLeft') {
            currentLbIndex = (currentLbIndex - 1 + currentLbMedia.length) % currentLbMedia.length;
            updateLightboxContent();
        }
    }
});

// Touch swipe para lightbox
let lbTouchStart = 0;
lightbox.addEventListener('touchstart', (e) => {
    lbTouchStart = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
    const lbTouchEnd = e.changedTouches[0].clientX;
    const diff = lbTouchStart - lbTouchEnd;
    
    if (Math.abs(diff) > 50 && currentLbMedia.length > 1) {
        if (diff > 0) {
            currentLbIndex = (currentLbIndex + 1) % currentLbMedia.length;
        } else {
            currentLbIndex = (currentLbIndex - 1 + currentLbMedia.length) % currentLbMedia.length;
        }
        updateLightboxContent();
    }
});