const setupAudioLogic = () => {
    const audios = document.querySelectorAll('audio');
    const autoPlayCheck = document.getElementById('autoPlayCheck');
    if (!audios.length) return;

    let globalVolume = 0.5;

    const formatTime = (secs) => {
        if (isNaN(secs) || secs === Infinity) return "00:00";
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    audios.forEach((audio, index) => {
        audio.volume = globalVolume;
        let lastVolume = globalVolume;

        audio.removeAttribute('controls');
        audio.style.display = 'none';

        const player = document.createElement('div');
        player.className = 'custom-player';
        player.tabIndex = 0;
        player.setAttribute('aria-label', 'Reproductor de audio');

        player.innerHTML = `
            <div class="player-controls">
                <button class="play-btn" aria-label="Reproducir (K o Espacio)">Play</button>
                <button class="mute-btn" aria-label="Silenciar (M)">Silenciar</button>
                <input type="range" class="volume-slider" min="0" max="100" value="${globalVolume * 100}" aria-label="Volumen (Flechas arriba y abajo)" />
            </div>
            <div class="progress-container">
                <span class="current-time" aria-hidden="true">00:00</span>
                <input type="range" class="progress-slider" min="0" max="100" value="0" role="slider" aria-label="Progreso de tiempo (Flechas izquierda y derecha, J o L para saltos mayores, 0 a 9 para porcentajes)" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" />
                <span class="total-duration" aria-hidden="true">00:00</span>
            </div>
        `;

        audio.parentNode.insertBefore(player, audio.nextSibling);

        const playBtn = player.querySelector('.play-btn');
        const muteBtn = player.querySelector('.mute-btn');
        const volSlider = player.querySelector('.volume-slider');
        const progSlider = player.querySelector('.progress-slider');
        const curText = player.querySelector('.current-time');
        const durText = player.querySelector('.total-duration');

        const togglePlay = () => audio.paused ? audio.play().catch(console.warn) : audio.pause();

        const setVolume = (val) => {
            globalVolume = Math.max(0, Math.min(1, val));
            audio.volume = globalVolume;
            volSlider.value = globalVolume * 100;
            const isMuted = audio.volume === 0;
            muteBtn.textContent = isMuted ? 'Quitar Silencio' : 'Silenciar';
            muteBtn.setAttribute('aria-label', `${isMuted ? 'Quitar silencio' : 'Silenciar'} (M)`);
        };

        const toggleMute = () => {
            if (audio.volume > 0) {
                lastVolume = audio.volume;
                setVolume(0);
            } else {
                setVolume(lastVolume || 0.5);
            }
        };

        const updateProgressUI = () => {
            const cur = audio.currentTime, dur = audio.duration || 0;
            progSlider.max = dur > 0 ? dur : 100;
            progSlider.value = cur;
            progSlider.setAttribute('aria-valuenow', cur);
            progSlider.setAttribute('aria-valuemax', progSlider.max);

            const tCur = formatTime(cur), tDur = formatTime(dur);
            curText.textContent = tCur;
            durText.textContent = tDur;
            progSlider.setAttribute('aria-valuetext', `${tCur} de ${tDur}`);
        };

        playBtn.onclick = togglePlay;
        muteBtn.onclick = toggleMute;
        volSlider.oninput = () => setVolume(volSlider.value / 100);
        progSlider.oninput = () => { if (audio.duration) audio.currentTime = progSlider.value; updateProgressUI(); };

        player.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.type === 'text') return;
            const key = e.key.toLowerCase();
            let handled = true;

            if (key === 'k' || key === ' ') togglePlay();
            else if (key === 'm') toggleMute();
            else if (key === 'arrowleft' || key === 'j') audio.currentTime = Math.max(0, audio.currentTime - (key === 'j' ? 10 : 5));
            else if (key === 'arrowright' || key === 'l') audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + (key === 'l' ? 10 : 5));
            else if (key === 'arrowup') setVolume(audio.volume + 0.05);
            else if (key === 'arrowdown') setVolume(audio.volume - 0.05);
            else if (key >= '0' && key <= '9' && audio.duration) audio.currentTime = (parseInt(key) * 10 / 100) * audio.duration;
            else handled = false;

            if (handled) { e.preventDefault(); e.stopPropagation(); }
        });

        audio.addEventListener('play', () => {
            audios.forEach(other => { if (other !== audio) other.pause(); });
            setVolume(globalVolume);
            playBtn.textContent = 'Pausa';
            playBtn.setAttribute('aria-label', 'Pausar (K o Espacio)');
        });

        audio.addEventListener('pause', () => {
            playBtn.textContent = 'Play';
            playBtn.setAttribute('aria-label', 'Reproducir (K o Espacio)');
        });

        ['timeupdate', 'loadedmetadata', 'loadeddata'].forEach(evt => audio.addEventListener(evt, updateProgressUI));

        audio.addEventListener('ended', () => {
            if (autoPlayCheck?.checked && audios[index + 1]) {
                const nextAudio = audios[index + 1];
                nextAudio.volume = globalVolume;
                nextAudio.play().catch(console.warn);
                nextAudio.nextSibling?.focus();
            }
        });

        updateProgressUI();
    });
};

document.readyState === 'loading' 
    ? document.addEventListener('DOMContentLoaded', setupAudioLogic) 
    : setupAudioLogic();