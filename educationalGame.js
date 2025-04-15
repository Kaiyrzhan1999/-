export class EducationalGame {
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