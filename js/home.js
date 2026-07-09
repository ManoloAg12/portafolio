// =============================================
// 🔒 SISTEMA DE PROTECCIÓN ANTI-INSPECCIÓN
// =============================================
(function() {
    'use strict';
    
    // Bloquear clic derecho en todo el documento
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Bloquear teclas de desarrollador
    document.addEventListener('keydown', function(e) {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (Element Inspector)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (Ver código fuente)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Guardar página)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+K (Firefox DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+F (Buscar en DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 70) {
            e.preventDefault();
            return false;
        }
    });
    
    // Detectar si DevTools está abierto (método avanzado)
    let devtoolsOpen = false;
    
    const threshold = 160;
    
    const detectDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // Puedes mostrar un mensaje o redirigir
                console.clear();
                console.log('%c⚠️ Área restringida', 'color: red; font-size: 30px; font-weight: bold;');
                console.log('%cPor favor, cierra las herramientas de desarrollador.', 'color: white; font-size: 16px;');
            }
        } else {
            devtoolsOpen = false;
        }
    };
    
    setInterval(detectDevTools, 1000);
    
    // Prevenir arrastrar imágenes
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });
    
    // Prevenir selección de texto (opcional, comenta si quieres permitirlo)
    /*
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    */
    
    // Limpiar consola periódicamente
    setInterval(function() {
        console.clear();
    }, 2000);
    
    // Mensaje de advertencia en consola
    console.log('%c🛑 ¡ALTO!', 'color: #ef4444; font-size: 40px; font-weight: bold;');
    console.log('%cEsta área es para uso exclusivo del desarrollador.', 'color: #f59e0b; font-size: 18px;');
    console.log('%cSi te han indicado que copies algo aquí, ten cuidado con posibles estafas.', 'color: #f59e0b; font-size: 18px;');
    console.log('%cNunca pegues código desconocido en esta consola.', 'color: #ef4444; font-size: 16px; font-weight: bold;');
    
})();

// ==========================================
// INICIO DE LA APLICACIÓN PRINCIPAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // MENÚ MÓVIL
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const links = mobileMenu.querySelectorAll('a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // REVEAL ON SCROLL
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursorDot.style.left = e.clientX - 3 + 'px';
            cursorDot.style.top = e.clientY - 3 + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(1.5)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });

        // Hover sobre enlaces y botones
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = '#34d399';
                cursorDot.style.transform = 'scale(0)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#10b981';
                cursorDot.style.transform = 'scale(1)';
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL PARA LINKS INTERNOS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // CONTADOR DE PROYECTOS (Animación)
    // ==========================================
    const projectsCount = document.getElementById('projects-count');
    if (projectsCount) {
        const target = 7;
        let current = 0;
        const increment = target / 50;
        
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        projectsCount.textContent = target;
                        clearInterval(timer);
                    } else {
                        projectsCount.textContent = Math.floor(current);
                    }
                }, 40);
                counterObserver.unobserve(projectsCount);
            }
        }, { threshold: 0.5 });
        
        counterObserver.observe(projectsCount);
    }

    console.log('✨ Portafolio de Manolo Aguilar - Protegido y listo');
});