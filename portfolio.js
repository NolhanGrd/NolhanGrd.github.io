// Navigation fluide et gestion de la navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Vérification des éléments
    if (!navbar || !hamburger || !navMenu) {
        console.error('Éléments de navigation non trouvés');
        return;
    }

    console.log('Navigation initialisée avec succès');

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Menu hamburger pour mobile - Version améliorée
hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Clic sur hamburger détecté');
    console.log('Largeur actuelle:', window.innerWidth);
    
    // Toggle des classes
    const isActive = hamburger.classList.contains('active');
    
    if (isActive) {
        // Fermer le menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        console.log('Menu fermé');
    } else {
        // Ouvrir le menu
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        console.log('Menu ouvert');
    }
    
    // Debug - Log des classes
    console.log('Classes hamburger:', hamburger.className);
    console.log('Classes menu:', navMenu.className);
    
    // Debug - Vérifier les styles calculés
    const menuStyles = window.getComputedStyle(navMenu);
    console.log('Position menu:', menuStyles.left);
    console.log('Visibilité menu:', menuStyles.visibility);
    console.log('Opacity menu:', menuStyles.opacity);
    console.log('Z-index menu:', menuStyles.zIndex);
});

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Fermer le menu quand on redimensionne vers desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navigation fluide vers les sections
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Navigation vers:', targetId);
            
            if (targetSection) {
                // Fermer le menu mobile si ouvert
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Scroll fluide vers la section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Mise à jour du lien actif
                updateActiveLink(this);
            } else {
                console.error('Section non trouvée:', targetId);
            }
        });
    });

    // Détection de la section active pendant le scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.trail-post .direction-panel');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Mettre à jour le lien actif
        if (current) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Fonction pour mettre à jour le lien actif
    function updateActiveLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Animation d'apparition des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.8s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observer tous les panneaux
    const panels = document.querySelectorAll('.direction-panel, .sub-panel');
    panels.forEach(panel => {
        observer.observe(panel);
    });

    // Effet parallaxe léger sur les montagnes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const mountains = document.querySelector('.mountains');
        if (mountains) {
            mountains.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Initialisation : définir le premier lien comme actif
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }

    console.log('Script chargé complètement');
});

// Fonction pour forcer l'ouverture du menu (pour test)
window.forceOpenMenu = function() {
    console.log('Force ouverture du menu');
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    navMenu.style.left = '0px';
    navMenu.style.opacity = '1';
    navMenu.style.visibility = 'visible';
};