export function initPuzzleGame() {
    const puzzleBoard = document.querySelector('.puzzle-board');
    const newPuzzleButton = document.querySelector('.puzzle-button');
    const timerDisplay = document.querySelector('.puzzle-timer');
    let pieces = [];
    let timer = null;
    let startTime = null;

    const images = [
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#87CEEB"/><circle cx="150" cy="150" r="100" fill="#FFD700"/></svg>',
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#90EE90"/><path d="M 150,50 L 250,250 L 50,250 Z" fill="#8B4513"/></svg>',
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#F0F8FF"/><circle cx="150" cy="150" r="120" fill="#FF69B4"/></svg>'
    ];

    function createPuzzlePieces() {
        const image = images[Math.floor(Math.random() * images.length)];
        const gridSize = 3;
        pieces = [];

        for (let i = 0; i < gridSize * gridSize; i++) {
            const piece = {
                id: i,
                currentPos: i,
                correctPos: i
            };
            pieces.push(piece);
        }

        // Перемешиваем кусочки
        pieces = shufflePieces(pieces);

        // Создаем визуальное представление
        puzzleBoard.innerHTML = '';
        puzzleBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

        pieces.forEach((piece, index) => {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'puzzle-piece';
            pieceElement.draggable = true;
            pieceElement.dataset.id = piece.id;

            const x = (piece.id % gridSize) * (100 / gridSize);
            const y = Math.floor(piece.id / gridSize) * (100 / gridSize);

            pieceElement.style.backgroundImage = `url(${image})`;
            pieceElement.style.backgroundSize = `${gridSize * 100}%`;
            pieceElement.style.backgroundPosition = `-${x}% -${y}%`;

            pieceElement.addEventListener('dragstart', handleDragStart);
            pieceElement.addEventListener('dragover', handleDragOver);
            pieceElement.addEventListener('drop', handleDrop);

            puzzleBoard.appendChild(pieceElement);
        });
    }

    function shufflePieces(pieces) {
        for (let i = pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
            pieces[i].currentPos = i;
            pieces[j].currentPos = j;
        }
        return pieces;
    }

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const fromId = parseInt(e.dataTransfer.getData('text/plain'));
        const toId = parseInt(e.target.dataset.id);

        // Меняем местами кусочки
        const fromPiece = pieces.find(p => p.id === fromId);
        const toPiece = pieces.find(p => p.id === toId);
        const fromPos = fromPiece.currentPos;
        const toPos = toPiece.currentPos;

        fromPiece.currentPos = toPos;
        toPiece.currentPos = fromPos;

        // Обновляем визуальное расположение
        const pieces = Array.from(puzzleBoard.children);
        const fromElement = pieces.find(el => el.dataset.id === fromId.toString());
        const toElement = pieces.find(el => el.dataset.id === toId.toString());
        const fromHTML = fromElement.innerHTML;
        const fromBackground = fromElement.style.backgroundPosition;

        fromElement.innerHTML = toElement.innerHTML;
        fromElement.style.backgroundPosition = toElement.style.backgroundPosition;
        toElement.innerHTML = fromHTML;
        toElement.style.backgroundPosition = fromBackground;

        checkWin();
    }

    function checkWin() {
        const isWin = pieces.every(piece => piece.currentPos === piece.correctPos);
        if (isWin) {
            clearInterval(timer);
            const endTime = new Date();
            const timeTaken = Math.floor((endTime - startTime) / 1000);
            alert(`Поздравляем! Вы собрали пазл за ${formatTime(timeTaken)}!`);
        }
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        startTime = new Date();
        timer = setInterval(() => {
            const currentTime = new Date();
            const diff = Math.floor((currentTime - startTime) / 1000);
            timerDisplay.textContent = `Время: ${formatTime(diff)}`;
        }, 1000);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function startNewPuzzle() {
        createPuzzlePieces();
        startTimer();
    }

    newPuzzleButton.addEventListener('click', startNewPuzzle);

    // Инициализация игры
    startNewPuzzle();
}