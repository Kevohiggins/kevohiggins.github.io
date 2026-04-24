/* Lógica del menú hamburguesa */
const btn = document.getElementById('menu-btn');
const list = document.getElementById('nav-list');

if (btn && list) {
    btn.onclick = () => {
        const esAbierto = list.classList.toggle('abierto');
        btn.setAttribute('aria-expanded', esAbierto);
        btn.innerHTML = esAbierto ? 'Cerrar Menú ✖' : 'Menú ☰';
    };
}