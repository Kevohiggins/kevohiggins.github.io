const setupUI = () => {
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('nav-list');

    if (menuBtn && navList) {
        menuBtn.onclick = () => {
            const isOpen = navList.classList.toggle('abierto');
            menuBtn.setAttribute('aria-expanded', isOpen);
        };
    }

    const contrastBtn = document.getElementById('contrast-btn');
    if (contrastBtn) {
        const isContrastActive = document.body.classList.contains('alto-contraste');
        contrastBtn.setAttribute('aria-pressed', isContrastActive);
        
        contrastBtn.onclick = () => {
            const newState = document.body.classList.toggle('alto-contraste');
            contrastBtn.setAttribute('aria-pressed', newState);
            localStorage.setItem('altoContraste', newState);
        };
    }

    const currentHost = window.location.hostname;
    const externalLinks = document.querySelectorAll('a[href^="http"]');

    externalLinks.forEach(link => {
        if (link.hostname !== currentHost) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            if (!link.getAttribute('aria-label')) {
                const currentText = link.textContent.trim();
                link.setAttribute('aria-label', `${currentText} (se abre en una nueva pestaña)`);
            }
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupUI);
} else {
    setupUI();
}