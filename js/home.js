document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const links = mobileMenu.querySelectorAll('a');

    // 1. Abrir / Cerrar el menú al tocar el botón hamburguesa
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // 2. Cerrar el menú automáticamente al hacer clic en cualquier enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
});