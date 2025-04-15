export function initMathMazeGame() {
    const mazeGrid = document.querySelector('.maze-grid');
    const scoreDisplay = document.querySelector('.maze-score');
    const startButton = document.querySelector('.maze-button');
    let score = 0;
    let currentPosition = { x: 0, y: 0 };
    let maze = [];

    function createMaze() {
        maze = [];
        mazeGrid.innerHTML = '';
        mazeGrid.style.display = 'grid';
        mazeGrid.style.gridTemplateColumns = 'repeat(5, 1fr)';

        for (let i = 0; i < 5; i++) {
            maze[i] = [];
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'maze-cell';
                if (Math.random() > 0.3) {
                    const problem = generateMathProblem();
                    cell.textContent = problem.question;
                    cell.dataset.answer = problem.answer;
                    maze[i][j] = { type: 'path', problem };
                } else {
                    cell.classList.add('wall');
                    maze[i][j] = { type: 'wall' };
                }
                mazeGrid.appendChild(cell);
            }
        }

        // Ensure start and end are accessible
        const startCell = mazeGrid.children[0];
        const endCell = mazeGrid.children[mazeGrid.children.length - 1];
        startCell.className = 'maze-cell start';
        endCell.className = 'maze-cell end';
        maze[0][0] = { type: 'start' };
        maze[4][4] = { type: 'end' };
    }

    function generateMathProblem() {
        const operations = ['+', '-', '*'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let num1, num2, answer, question;

        switch (operation) {
            case '+':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                answer = num1 + num2;
                question = `${num1}+${num2}`;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * num1) + 1;
                answer = num1 - num2;
                question = `${num1}-${num2}`;
                break;
            case '*':
                num1 = Math.floor(Math.random() * 5) + 1;
                num2 = Math.floor(Math.random() * 5) + 1;
                answer = num1 * num2;
                question = `${num1}×${num2}`;
                break;
        }

        return { question, answer };
    }

    function movePlayer(direction) {
        const newPosition = { ...currentPosition };

        switch (direction) {
            case 'ArrowUp': newPosition.y--; break;
            case 'ArrowDown': newPosition.y++; break;
            case 'ArrowLeft': newPosition.x--; break;
            case 'ArrowRight': newPosition.x++; break;
        }

        if (isValidMove(newPosition)) {
            const cell = maze[newPosition.y][newPosition.x];
            if (cell.type === 'path') {
                const answer = prompt(`Решите пример: ${cell.problem.question} = ?`);
                if (parseInt(answer) === cell.problem.answer) {
                    score += 10;
                    scoreDisplay.textContent = `Очки: ${score}`;
                    currentPosition = newPosition;
                    updatePlayerPosition();
                }
            } else if (cell.type === 'end') {
                alert(`Поздравляем! Вы прошли лабиринт! Очки: ${score}`);
                startGame();
            } else {
                currentPosition = newPosition;
                updatePlayerPosition();
            }
        }
    }

    function isValidMove(position) {
        return position.x >= 0 && position.x < 5 &&
               position.y >= 0 && position.y < 5 &&
               maze[position.y][position.x].type !== 'wall';
    }

    function updatePlayerPosition() {
        const cells = mazeGrid.children;
        Array.from(cells).forEach(cell => cell.classList.remove('current'));
        cells[currentPosition.y * 5 + currentPosition.x].classList.add('current');
    }

    function startGame() {
        score = 0;
        currentPosition = { x: 0, y: 0 };
        scoreDisplay.textContent = 'Очки: 0';
        createMaze();
        updatePlayerPosition();
    }

    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            movePlayer(e.key);
        }
    });

    // Инициализация игры
    startGame();
}