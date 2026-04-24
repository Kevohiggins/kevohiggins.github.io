const setupAudioLogic = () => {
    const audios = document.querySelectorAll('audio');
    const autoPlayCheck = document.getElementById('autoPlayCheck');

    audios.forEach((audio, index) => {
        // 1. Volumen inicial al 50%
        audio.volume = 0.5;

        // 2. Interferencia: Si uno arranca, los demás se callan
        audio.addEventListener('play', () => {
            audios.forEach(other => {
                if (other !== audio) {
                    other.pause();
                    other.currentTime = 0; 
                }
            });
        });

        // 3. Reproducción continua condicionada
        audio.addEventListener('ended', () => {
            if (autoPlayCheck && autoPlayCheck.checked) {
                const siguiente = audios[index + 1];
                if (siguiente) {
                    setTimeout(() => {
                        siguiente.play();
                        siguiente.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 1000);
                }
            }
        });
    });
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAudioLogic);
} else {
    setupAudioLogic();
}