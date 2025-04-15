// Анимация появления элементов при прокрутке
function initScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
}

// Интерактивная игра дня
class EducationalGame {
    constructor() {
        this.gameContainer = document.querySelector('.game-container');
        this.score = 0;
        this.currentQuestion = 0;
        this.questions = [
            {
                question: 'Сколько будет 2 + 2?',
                options: ['3', '4', '5', '6'],
                correct: 1
            },
            {
                question: 'Какое животное самое большое?',
                options: ['Слон', 'Жираф', 'Синий кит', 'Бегемот'],
                correct: 2
            },
            {
                question: 'Сколько цветов в радуге?',
                options: ['5', '6', '7', '8'],
                correct: 2
            }
        ];
    }

    init() {
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        this.gameContainer.innerHTML = `
            <div class="game-question">
                <h3>${question.question}</h3>
                <div class="game-options">
                    ${question.options.map((option, index) => `
                        <button class="game-option" onclick="game.checkAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                <p class="game-score">Очки: ${this.score}</p>
            </div>
        `;
    }

    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const buttons = document.querySelectorAll('.game-option');

        buttons.forEach(button => button.disabled = true);

        if (selectedIndex === question.correct) {
            buttons[selectedIndex].style.backgroundColor = '#4CAF50';
            this.score += 10;
        } else {
            buttons[selectedIndex].style.backgroundColor = '#f44336';
            buttons[question.correct].style.backgroundColor = '#4CAF50';
        }

        setTimeout(() => {
            this.currentQuestion++;
            this.showQuestion();
        }, 1500);
    }

    showResults() {
        this.gameContainer.innerHTML = `
            <div class="game-results">
                <h3>Игра завершена!</h3>
                <p>Ваш счет: ${this.score} из ${this.questions.length * 10}</p>
                <button onclick="game = new EducationalGame(); game.init()">
                    Играть снова
                </button>
            </div>
        `;
    }
}

// Управление вкладками игр
document.addEventListener('DOMContentLoaded', () => {
    const gameTabs = document.querySelectorAll('.game-tab');
    const gameSections = document.querySelectorAll('.game-section');

    gameTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const gameId = tab.dataset.game;
            
            // Активация вкладки
            gameTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Показ соответствующей игры
            gameSections.forEach(section => {
                section.style.display = section.id === `${gameId}-game` ? 'block' : 'none';
            });

            // Инициализация соответствующей игры
            initGame(gameId);
        });
    });
});

// Инициализация игр
function initGame(gameId) {
    switch(gameId) {
        case 'words':
            initWordGame();
            break;
        case 'memory':
            initMemoryGame();
            break;
        case 'english':
            initEnglishGame();
            break;
    }
}

// Игра "Слова и буквы"
function initWordGame() {
    const words = ['МАМА', 'ПАПА', 'ДОМ', 'КОТ', 'СОБАКА'];
    const wordContainer = document.querySelector('.letter-container');
    const input = document.querySelector('.word-input');
    const checkButton = document.querySelector('.check-word');
    
    let currentWord = words[Math.floor(Math.random() * words.length)];
    let shuffledLetters = currentWord.split('').sort(() => Math.random() - 0.5);
    
    wordContainer.innerHTML = shuffledLetters
        .map(letter => `<span class="letter">${letter}</span>`)
        .join('');
    
    checkButton.onclick = () => {
        if (input.value.toUpperCase() === currentWord) {
            alert('Правильно!');
            initWordGame();
        } else {
            alert('Попробуй еще раз!');
        }
        input.value = '';
    };
}

// Игра "Найди пару"
function initMemoryGame() {
    const grid = document.querySelector('.memory-grid');
    const scoreDisplay = document.querySelector('.memory-score');
    const items = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const gameItems = [...items, ...items];
    let flippedCards = [];
    let matchedPairs = 0;
    let attempts = 0;
    
    grid.innerHTML = '';
    gameItems.sort(() => Math.random() - 0.5).forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.value = item;
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
    });
    
    function flipCard(card) {
        if (flippedCards.length === 2) return;
        if (card.textContent) return;
        
        card.textContent = card.dataset.value;
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            attempts++;
            scoreDisplay.textContent = `Попытки: ${attempts}`;
            
            if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
                matchedPairs++;
                flippedCards = [];
                if (matchedPairs === items.length) {
                    setTimeout(() => alert('Поздравляем! Вы нашли все пары!'), 500);
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.textContent = '');
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

// Игра "English Time"
function initEnglishGame() {
    const words = [
        { word: 'Apple', translation: 'Яблоко', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="40" fill="%23FF0000"%3E%3C/circle%3E%3C/svg%3E' },
        { word: 'Banana', translation: 'Банан', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect x="20" y="30" width="60" height="40" fill="%23FFE135"%3E%3C/rect%3E%3C/svg%3E' },
        { word: 'Orange', translation: 'Апельсин', image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="40" fill="%23FFA500"%3E%3C/circle%3E%3C/svg%3E' }
    ];
    
    const wordCard = document.querySelector('.word-card');
    const optionsContainer = document.querySelector('.translation-options');
    let currentWord = words[Math.floor(Math.random() * words.length)];
    
    wordCard.querySelector('img').src = currentWord.image;
    wordCard.querySelector('.english-word').textContent = currentWord.word;
    
    let options = [
        currentWord.translation,
        ...words.filter(w => w !== currentWord)
            .map(w => w.translation)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
    ].sort(() => Math.random() - 0.5);
    
    optionsContainer.innerHTML = options
        .map(option => `<button class="translation-option">${option}</button>`)
        .join('');
    
    optionsContainer.querySelectorAll('.translation-option').forEach(button => {
        button.onclick = () => {
            if (button.textContent === currentWord.translation) {
                alert('Правильно!');
                initEnglishGame();
            } else {
                alert('Попробуй еще раз!');
            }
        };
    });
}
}

// Инициализация всех компонентов
document.addEventListener('DOMContentLoaded', () => {
    // Анимация навигационных кнопок
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            button.style.backgroundColor = '#FFD700';
            setTimeout(() => {
                button.style.backgroundColor = '';
            }, 300);
        });
    });

    // Инициализация анимации прокрутки
    initScrollAnimation();

    // Запуск игры
    window.game = new EducationalGame();
    game.init();
});