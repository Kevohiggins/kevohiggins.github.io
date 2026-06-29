const setupMenu = () => {
    const btn = document.getElementById('menu-btn');
    const list = document.getElementById('nav-list');

    if (btn && list) {
        btn.onclick = () => {
            const esAbierto = list.classList.toggle('abierto');
            btn.setAttribute('aria-expanded', esAbierto);
            btn.innerHTML = esAbierto ? 'Cerrar Menú ✖' : 'Menú ☰';
        };
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMenu);
} else {
    setupMenu();
}

const setupGlobalBehaviors = () => {
    const contrastBtn = document.getElementById('contrast-btn');
    if (contrastBtn) {
        const isContrastActive = document.body.classList.contains('alto-contraste');
        contrastBtn.setAttribute('aria-pressed', isContrastActive ? 'true' : 'false');
        contrastBtn.onclick = () => {
            const newState = document.body.classList.toggle('alto-contraste');
            contrastBtn.setAttribute('aria-pressed', newState);
            localStorage.setItem('altoContraste', newState);
        };
    }

    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setupMenu();
        setupGlobalBehaviors();
    });
} else {
    setupMenu();
    setupGlobalBehaviors();
}