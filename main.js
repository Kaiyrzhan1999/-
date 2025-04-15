import { initScrollAnimation, initNavButtonAnimation } from './utils.js';
import { EducationalGame } from './educationalGame.js';
import { initWordGame } from './wordGame.js';
import { initMemoryGame } from './memoryGame.js';
import { initEnglishGame } from './englishGame.js';
import { initMathMazeGame } from './mathMazeGame.js';
import { initAnimalGuessGame } from './animalGuessGame.js';
import { initPuzzleGame } from './puzzleGame.js';
import { initFindDiffGame } from './findDiffGame.js';
import { initMusicNotesGame } from './musicNotesGame.js';

// Управление вкладками игр
function initGameTabs() {
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
}

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
        case 'mathMaze':
            initMathMazeGame();
            break;
        case 'animalGuess':
            initAnimalGuessGame();
            break;
        case 'puzzle':
            initPuzzleGame();
            break;
        case 'findDiff':
            initFindDiffGame();
            break;
        case 'musicNotes':
            initMusicNotesGame();
            break;
    }
}

// Обработка анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления страницы
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Обработка переходов между страницами
    document.querySelectorAll('.nav-button').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.classList.contains('active')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                // Анимация исчезновения
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });

    initNavButtonAnimation();
    initScrollAnimation();
    initGameTabs();

    // Запуск образовательной игры
    window.game = new EducationalGame();
    game.init();
});