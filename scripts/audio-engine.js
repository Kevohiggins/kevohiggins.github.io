const setupAudioLogic = () => {
    const audios = document.querySelectorAll('audio');
    const autoPlayCheck = document.getElementById('autoPlayCheck');

    if (audios.length === 0) return;

    audios.forEach((audio, index) => {
        audio.volume = 0.5;
        let lastVolume = 0.5;
        
        audio.removeAttribute('controls');
        audio.style.display = 'none';

        const playerContainer = document.createElement('div');
        playerContainer.className = 'custom-player';
        playerContainer.tabIndex = 0; 
        playerContainer.setAttribute('aria-label', `Reproductor de audio`);

        playerContainer.innerHTML = `
            <div class="player-controls">
                <button class="play-btn" aria-label="Reproducir (K o Espacio)">Play</button>
                <button class="mute-btn" aria-label="Silenciar (M)">Silenciar</button>
                <input type="range" class="volume-slider" min="0" max="100" value="50" aria-label="Volumen (Flechas arriba y abajo)" />
            </div>
            <div class="progress-container">
                <span class="current-time" aria-hidden="true">00:00</span>
                <input type="range" class="progress-slider" min="0" max="100" value="0" role="slider" aria-label="Progreso de tiempo (Flechas izquierda y derecha, J o L para saltos mayores, 0 a 9 para porcentajes)" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" />
                <span class="total-duration" aria-hidden="true">00:00</span>
            </div>
        `;

        audio.parentNode.insertBefore(playerContainer, audio.nextSibling);

        const playBtn = playerContainer.querySelector('.play-btn');
        const muteBtn = playerContainer.querySelector('.mute-btn');
        const volumeSlider = playerContainer.querySelector('.volume-slider');
        const progressSlider = playerContainer.querySelector('.progress-slider');
        const currentTimeText = playerContainer.querySelector('.current-time');
        const totalDurationText = playerContainer.querySelector('.total-duration');

        const formatTime = (secs) => {
            if (isNaN(secs) || secs === Infinity) return "00:00";
            const m = Math.floor(secs / 60).toString().padStart(2, '0');
            const s = Math.floor(secs % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        const togglePlay = () => {
            if (audio.paused) {
                audio.play().catch(err => console.warn(err));
            } else {
                audio.pause();
            }
        };

        const toggleMute = () => {
            if (audio.volume > 0) {
                lastVolume = audio.volume;
                audio.volume = 0;
                volumeSlider.value = 0;
            } else {
                audio.volume = lastVolume;
                volumeSlider.value = lastVolume * 100;
            }
            updateMuteButtonUI();
        };

        const updateMuteButtonUI = () => {
            if (audio.volume === 0) {
                muteBtn.textContent = 'Quitar Silencio';
                muteBtn.setAttribute('aria-label', 'Quitar silencio (M)');
            } else {
                muteBtn.textContent = 'Silenciar';
                muteBtn.setAttribute('aria-label', 'Silenciar (M)');
            }
        };

        const updateProgressUI = () => {
            const current = audio.currentTime;
            const duration = audio.duration || 0;

            progressSlider.max = duration > 0 ? duration : 100;
            progressSlider.value = current;

            progressSlider.setAttribute('aria-valuenow', current);
            progressSlider.setAttribute('aria-valuemax', duration > 0 ? duration : 100);

            const tiempoActualStr = formatTime(current);
            const tiempoTotalStr = formatTime(duration);

            currentTimeText.textContent = tiempoActualStr;
            totalDurationText.textContent = tiempoTotalStr;

            progressSlider.setAttribute('aria-valuetext', `${tiempoActualStr} de ${tiempoTotalStr}`);
        };

        playBtn.onclick = togglePlay;
        muteBtn.onclick = toggleMute;

        volumeSlider.oninput = () => {
            audio.volume = volumeSlider.value / 100;
            updateMuteButtonUI();
        };

        progressSlider.oninput = () => {
            if (!audio.duration) return;
            audio.currentTime = progressSlider.value;
            updateProgressUI();
        };

        playerContainer.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.type === 'text') return;

            let handled = true;

            if (e.key === 'k' || e.key === 'K' || e.key === ' ') {
                togglePlay();
            } 
            else if (e.key === 'm' || e.key === 'M') {
                toggleMute();
            }
            else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'J') {
                const step = (e.key === 'ArrowLeft') ? 5 : 10;
                audio.currentTime = Math.max(0, audio.currentTime - step);
                updateProgressUI();
            } 
            else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
                const step = (e.key === 'ArrowRight') ? 5 : 10;
                audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + step);
                updateProgressUI();
            } 
            else if (e.key === 'ArrowUp') {
                e.preventDefault();
                audio.volume = Math.min(1, audio.volume + 0.05);
                volumeSlider.value = audio.volume * 100;
                updateMuteButtonUI();
            } 
            else if (e.key === 'ArrowDown') {
                e.preventDefault();
                audio.volume = Math.max(0, audio.volume - 0.05);
                volumeSlider.value = audio.volume * 100;
                updateMuteButtonUI();
            } 
            else if (e.key >= '0' && e.key <= '9') {
                if (audio.duration) {
                    const porcentaje = parseInt(e.key) * 10;
                    audio.currentTime = (porcentaje / 100) * audio.duration;
                    updateProgressUI();
                }
            } 
            else {
                handled = false;
            }

            if (handled) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        audio.addEventListener('play', () => {
            audios.forEach(other => {
                if (other !== audio) other.pause();
            });
            playBtn.textContent = 'Pausa';
            playBtn.setAttribute('aria-label', 'Pausar (K o Espacio)');
        });

        audio.addEventListener('pause', () => {
            playBtn.textContent = 'Play';
            playBtn.setAttribute('aria-label', 'Reproducir (K o Espacio)');
        });

        audio.addEventListener('timeupdate', updateProgressUI);
        audio.addEventListener('loadedmetadata', updateProgressUI);
        audio.addEventListener('loadeddata', updateProgressUI);
        
        audio.addEventListener('ended', () => {
            if (autoPlayCheck && autoPlayCheck.checked) {
                const siguienteAudio = audios[index + 1];
                if (siguienteAudio) {
                    siguienteAudio.play().catch(err => console.warn(err));
                    const siguientePlayer = siguienteAudio.nextSibling;
                    if (siguientePlayer && siguientePlayer.classList.contains('custom-player')) {
                        siguientePlayer.focus();
                    }
                }
            }
        });

        updateProgressUI();
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAudioLogic);
} else {
    setupAudioLogic();
}