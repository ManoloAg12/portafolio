        const translations = {
            es: {
                nav_inicio: "Inicio",
                nav_habilidades: "Habilidades",
                nav_proyectos: "Proyectos",
                nav_formacion: "Formación",
                nav_contacto: "Contacto",
                hero_greeting: "Hola, soy Manolo Aguilar",
                hero_title: "Desarrollador de Software <br><span class='text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-green-400'>Full Stack & Backend</span>",
                hero_desc: "Enfocado en el desarrollo de software y en la creación de soluciones full-stack utilizando <strong class='text-brand-accent'>Java (Spring Boot, JPA)</strong> y <strong class='text-brand-accent'>.NET (C#, ASP.NET)</strong>. Actualmente curso el 5.º año de Licenciatura en Informática y poseo sólidos conocimientos en la gestión de bases de datos SQL (<strong class='text-brand-accent'>SQL Server, MySQL, PostgreSQL</strong>). Busco integrarme a un equipo de desarrollo dinámico para aplicar mis conocimientos, enfrentar nuevos retos y mantener un aprendizaje continuo.",
                hero_btn: "Ver Proyectos",
                skills_title: "Habilidades Técnicas",
                projects_title: "Proyectos Académicos",
                projects_sub: "Aplicando teoría a soluciones reales.",
                btn_code: "Ver Código <i class='fa-solid fa-arrow-right ml-1'></i>",
                siar_desc: "Sistema IoT de riego inteligente con ESP32 y Python. Optimiza el consumo de agua integrando APIs climáticas para decisiones en tiempo real.",
                super_desc: "Prototipo de e-commerce ligero en Flask. Gestiona pedidos y envía notificaciones automáticas por correo con comprobantes QR dinámicos.",
                micompra_desc: "Aplicación completa para administración de tiendas. Permite a los clientes gestionar pedidos y a los administradores controlar el flujo de productos.",
                pict_desc: "Catálogo interactivo de smartphones. Interfaz moderna con Bootstrap y gestión de datos con SQL.",
                tutor_desc: "Plataforma educativa dinámica. Manipulación de datos en cliente utilizando estructuras JSON.",
                certs_title: "Certificaciones y Logros",
                cert_git_title: "Curso de Git y GitHub",
                cert_git_desc: "Gestión de versiones y colaboración en equipo. Control de ramas, pull requests, releases y flujos de trabajo seguros (CI/CD).",
                cert_cisco_title: "Introducción a la Ciberseguridad",
                cert_cisco_desc: "Comprensión de vulnerabilidades y vectores de ataque. Estrategias para proteger aplicaciones y datos sensibles contra amenazas comunes en entornos digitales.",
                link_linkedin: "Ver perfil completo en LinkedIn <i class='fa-solid fa-arrow-up-right-from-square ml-2 text-xs'></i>",
                footer_title: "¿Trabajamos juntos?",
                footer_desc: "Estoy listo para iniciar mi carrera profesional y aportar valor a tu equipo.",
                footer_copy: "© 2026 Manolo Aguilar. Desarrollado con HTML + Tailwind CSS."
            },
            en: {
                nav_inicio: "Home",
                nav_habilidades: "Skills",
                nav_proyectos: "Projects",
                nav_formacion: "Education",
                nav_contacto: "Contact",
                hero_greeting: "Hi, I'm Manolo Aguilar",
                hero_title: "Software Developer <br><span class='text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-green-400'>Full Stack & Backend</span>",
                hero_desc: "Focused on software development and building full-stack solutions using <strong class='text-brand-accent'>Java (Spring Boot, JPA)</strong> and <strong class='text-brand-accent'>.NET (C#, ASP.NET)</strong>. I am currently in my 5th year of a Computer Science degree and possess solid knowledge in SQL database management (<strong class='text-brand-accent'>SQL Server, MySQL, PostgreSQL</strong>). I am looking to join a dynamic development team to apply my knowledge, face new challenges, and maintain continuous learning.",
                hero_btn: "View Projects",
                skills_title: "Technical Skills",
                projects_title: "Academic Projects",
                projects_sub: "Applying theory to real-world solutions.",
                btn_code: "View Code <i class='fa-solid fa-arrow-right ml-1'></i>",
                siar_desc: "Smart IoT irrigation system with ESP32 and Python. Optimizes water consumption by integrating climate APIs for real-time decisions.",
                super_desc: "Lightweight e-commerce prototype in Flask. Manages orders and sends automatic email notifications with dynamic QR receipts.",
                micompra_desc: "Complete application for store management. Allows customers to manage orders and administrators to control product flow.",
                pict_desc: "Interactive smartphone catalog. Modern interface with Bootstrap and data management with SQL.",
                tutor_desc: "Dynamic educational platform. Client-side data manipulation using JSON structures.",
                certs_title: "Certifications & Achievements",
                cert_git_title: "Git and GitHub Course",
                cert_git_desc: "Version control and team collaboration. Branch management, pull requests, releases, and secure workflows (CI/CD).",
                cert_cisco_title: "Introduction to Cybersecurity",
                cert_cisco_desc: "Understanding vulnerabilities and attack vectors. Strategies to protect applications and sensitive data against common threats in digital environments.",
                link_linkedin: "View full profile on LinkedIn <i class='fa-solid fa-arrow-up-right-from-square ml-2 text-xs'></i>",
                footer_title: "Let's work together?",
                footer_desc: "I'm ready to start my professional career and add value to your team.",
                footer_copy: "© 2026 Manolo Aguilar. Developed with HTML + Tailwind CSS."
            }
        };

        let currentLang = 'es';
        const langBtnDesktop = document.getElementById('lang-toggle-desktop');
        const langBtnMobile = document.getElementById('lang-toggle-mobile');

        function toggleLanguage() {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            
            const btnText = currentLang === 'es' ? 'EN' : 'ES';
            if (langBtnDesktop) langBtnDesktop.innerText = btnText;
            if (langBtnMobile) langBtnMobile.innerText = btnText;
            
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[currentLang][key]) {
                    element.innerHTML = translations[currentLang][key];
                }
            });
        }

        if (langBtnDesktop) langBtnDesktop.addEventListener('click', toggleLanguage);
        if (langBtnMobile) langBtnMobile.addEventListener('click', toggleLanguage);