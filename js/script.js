// 1. PRELOADER
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
});

// 2. INICIALIZAR AOS
AOS.init({ duration: 1000, once: true });

// 3. EFEITO PARALLAX NO HERO
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    const heroBg = document.querySelector('.hero-bg');
    // Move a imagem de fundo mais devagar que o scroll (0.5x velocidade)
    heroBg.style.transform = `translateY(${scrollValue * 0.5}px)`;
    
    // Efeito na Navbar
    const header = document.querySelector('.navbar');
    if (scrollValue > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 4. LÓGICA DO BOTÃO "MOSTRAR MAIS" (CORRIGIDA)
const btnLoad = document.getElementById('btnLoad');

btnLoad.addEventListener('click', () => {
    // Seleciona a próxima linha de fotos escondidas
    const hiddenRows = document.querySelectorAll('.photo-card.hidden');
    
    // Mostramos as primeiras 6 que encontrarmos
    for (let i = 0; i < 6; i++) {
        if (hiddenRows[i]) {
            hiddenRows[i].classList.remove('hidden');
            // Adiciona animação de fade manual para suavidade extra
            hiddenRows[i].style.animation = "fadeScale 0.6s ease forwards";
        }
    }

    // Se não sobrarem fotos escondidas, o botão some
    const remaining = document.querySelectorAll('.photo-card.hidden');
    if (remaining.length === 0) {
        btnLoad.style.scale = "0";
        setTimeout(() => btnLoad.style.display = "none", 400);
    } else {
        btnLoad.innerText = "MOSTRAR ÚLTIMOS TRABALHOS";
    }
    
    AOS.refresh(); // Avisa o AOS que novos elementos surgiram
});

// Animação CSS via JS para as novas fotos
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeScale {
        from { opacity: 0; transform: scale(0.9) translateY(30px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
`;
document.head.appendChild(style);

// 5. MENU MOBILE TOGGLE
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li a');

mobileMenuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuIcon.classList.toggle('active');
    // Trava o scroll do corpo quando o menu está aberto
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
});

// Fecha o menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuIcon.classList.remove('active');
        document.body.style.overflow = 'initial';
    });
});
