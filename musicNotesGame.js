export function initMusicNotesGame() {
    const musicStaff = document.querySelector('.music-staff');
    const musicKeyboard = document.querySelector('.music-keyboard');
    const playButton = document.querySelector('.music-play');
    const checkButton = document.querySelector('.music-check');
    const scoreDisplay = document.querySelector('.music-score');
    let score = 0;
    let currentMelody = [];
    let playerMelody = [];

    const notes = [
        { name: 'До', frequency: 261.63, color: '#ff0000' },
        { name: 'Ре', frequency: 293.66, color: '#ff7f00' },
        { name: 'Ми', frequency: 329.63, color: '#ffff00' },
        { name: 'Фа', frequency: 349.23, color: '#00ff00' },
        { name: 'Соль', frequency: 392.00, color: '#0000ff' },
        { name: 'Ля', frequency: 440.00, color: '#4b0082' },
        { name: 'Си', frequency: 493.88, color: '#9400d3' }
    ];

    function createKeyboard() {
        musicKeyboard.innerHTML = '';
        notes.forEach((note, index) => {
            const key = document.createElement('div');
            key.className = 'music-key';
            key.style.backgroundColor = note.color;
            key.dataset.note = index;
            key.textContent = note.name;

            key.addEventListener('click', () => playNote(index));
            musicKeyboard.appendChild(key);
        });
    }

    function createStaff() {
        musicStaff.innerHTML = `
            <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
                <line x1="10" y1="20" x2="290" y2="20" stroke="black" />
                <line x1="10" y1="35" x2="290" y2="35" stroke="black" />
                <line x1="10" y1="50" x2="290" y2="50" stroke="black" />
                <line x1="10" y1="65" x2="290" y2="65" stroke="black" />
                <line x1="10" y1="80" x2="290" y2="80" stroke="black" />
            </svg>
        `;
    }

    function generateMelody() {
        currentMelody = [];
        playerMelody = [];
        const length = 4 + Math.floor(score / 50); // Длина мелодии увеличивается с ростом очков

        for (let i = 0; i < length; i++) {
            currentMelody.push(Math.floor(Math.random() * notes.length));
        }

        displayMelody();
    }

    function displayMelody() {
        const svg = musicStaff.querySelector('svg');
        svg.innerHTML = `
            <line x1="10" y1="20" x2="290" y2="20" stroke="black" />
            <line x1="10" y1="35" x2="290" y2="35" stroke="black" />
            <line x1="10" y1="50" x2="290" y2="50" stroke="black" />
            <line x1="10" y1="65" x2="290" y2="65" stroke="black" />
            <line x1="10" y1="80" x2="290" y2="80" stroke="black" />
        `;

        currentMelody.forEach((noteIndex, i) => {
            const noteElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            noteElement.setAttribute('cx', 50 + i * 60);
            noteElement.setAttribute('cy', 80 - noteIndex * 10);
            noteElement.setAttribute('r', '5');
            noteElement.setAttribute('fill', notes[noteIndex].color);
            svg.appendChild(noteElement);
        });
    }

    function playNote(noteIndex) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = notes[noteIndex].frequency;

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);

        playerMelody.push(noteIndex);

        // Подсветка нажатой клавиши
        const key = musicKeyboard.children[noteIndex];
        key.style.transform = 'scale(0.95)';
        setTimeout(() => key.style.transform = 'scale(1)', 200);
    }

    function playMelody() {
        let i = 0;
        playerMelody = [];

        const playInterval = setInterval(() => {
            if (i < currentMelody.length) {
                playNote(currentMelody[i]);
                i++;
            } else {
                clearInterval(playInterval);
            }
        }, 1000);
    }

    function checkMelody() {
        if (playerMelody.length !== currentMelody.length) {
            alert('Попробуйте еще раз!');
            return;
        }

        const correct = playerMelody.every((note, index) => note === currentMelody[index]);
        if (correct) {
            score += 10;
            scoreDisplay.textContent = `Очки: ${score}`;
            alert('Правильно! +10 очков');
            generateMelody();
        } else {
            alert('Попробуйте еще раз!');
        }
        playerMelody = [];
    }

    playButton.addEventListener('click', playMelody);
    checkButton.addEventListener('click', checkMelody);

    // Инициализация игры
    createKeyboard();
    createStaff();
    generateMelody();
}