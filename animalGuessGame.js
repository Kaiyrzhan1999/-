export function initAnimalGuessGame() {
    const imageContainer = document.querySelector('.animal-image');
    const optionsContainer = document.querySelector('.animal-options');
    const soundButton = document.querySelector('.animal-sound-button');
    const scoreDisplay = document.querySelector('.animal-score');
    let score = 0;
    let currentAnimal = null;

    const animals = [
        { name: 'Лев', sound: 'roar', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#f4a460"/><circle cx="50" cy="45" r="25" fill="#8b4513"/></svg>' },
        { name: 'Слон', sound: 'trumpet', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="#808080"/><path d="M 80 50 Q 90 50 95 40" fill="none" stroke="#808080" stroke-width="5"/></svg>' },
        { name: 'Обезьяна', sound: 'ooh', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#8b4513"/><circle cx="40" cy="40" r="10" fill="#fff"/><circle cx="60" cy="40" r="10" fill="#fff"/></svg>' },
        { name: 'Волк', sound: 'howl', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M 20 80 L 50 20 L 80 80 Z" fill="#808080"/></svg>' },
        { name: 'Корова', sound: 'moo', image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="25" y="25" width="50" height="50" fill="#fff"/><circle cx="35" cy="45" r="5" fill="#000"/><circle cx="65" cy="45" r="5" fill="#000"/></svg>' }
    ];

    function playAnimalSound() {
        if (currentAnimal) {
            // Здесь можно добавить реальные звуки животных
            const audio = new Audio(`sounds/${currentAnimal.sound}.mp3`);
            audio.play().catch(error => {
                console.log('Звук временно недоступен');
            });
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createOptions() {
        optionsContainer.innerHTML = '';
        const shuffledAnimals = shuffleArray([...animals]);
        shuffledAnimals.forEach(animal => {
            const button = document.createElement('button');
            button.className = 'animal-option';
            button.textContent = animal.name;
            button.addEventListener('click', () => checkAnswer(animal));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedAnimal) {
        const buttons = document.querySelectorAll('.animal-option');
        buttons.forEach(button => button.disabled = true);

        if (selectedAnimal.name === currentAnimal.name) {
            score += 10;
            scoreDisplay.textContent = `Очки: ${score}`;
            buttons.forEach(button => {
                if (button.textContent === selectedAnimal.name) {
                    button.style.backgroundColor = '#4CAF50';
                }
            });
        } else {
            buttons.forEach(button => {
                if (button.textContent === selectedAnimal.name) {
                    button.style.backgroundColor = '#f44336';
                } else if (button.textContent === currentAnimal.name) {
                    button.style.backgroundColor = '#4CAF50';
                }
            });
        }

        setTimeout(startNewRound, 1500);
    }

    function startNewRound() {
        currentAnimal = animals[Math.floor(Math.random() * animals.length)];
        imageContainer.innerHTML = `<img src="${currentAnimal.image}" alt="Животное" class="animal-img">`;
        createOptions();
    }

    soundButton.addEventListener('click', playAnimalSound);

    // Инициализация игры
    startNewRound();
}