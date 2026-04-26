/* Lógica del menú hamburguesa */
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

// Si el DOM ya cargó, ejecutamos. Si no, esperamos al evento.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMenu);
} else {
    setupMenu();
}