export function initFindDiffGame() {
    const leftImage = document.querySelector('.diff-image-left');
    const rightImage = document.querySelector('.diff-image-right');
    const counter = document.querySelector('.diff-counter');
    const hintButton = document.querySelector('.diff-hint');
    let differences = [];
    let foundDifferences = 0;
    let hintsLeft = 2;

    const imagePairs = [
        {
            base: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#fff"/><circle cx="150" cy="150" r="100" fill="#ff0000"/><rect x="50" y="50" width="50" height="50" fill="#000"/></svg>',
            modified: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#fff"/><circle cx="150" cy="150" r="100" fill="#ff0000"/><rect x="50" y="50" width="40" height="50" fill="#000"/></svg>',
            diffCoords: [{x: 50, y: 50, radius: 10}]
        },
        {
            base: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#fff"/><circle cx="100" cy="100" r="50" fill="#00ff00"/><circle cx="200" cy="200" r="50" fill="#0000ff"/></svg>',
            modified: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#fff"/><circle cx="100" cy="100" r="50" fill="#00ff00"/><circle cx="200" cy="200" r="40" fill="#0000ff"/></svg>',
            diffCoords: [{x: 200, y: 200, radius: 10}]
        }
    ];

    function startNewGame() {
        const pair = imagePairs[Math.floor(Math.random() * imagePairs.length)];
        differences = [...pair.diffCoords];
        foundDifferences = 0;
        hintsLeft = 2;
        counter.textContent = `Найдено отличий: ${foundDifferences}/5`;

        leftImage.style.backgroundImage = `url(${pair.base})`;
        rightImage.style.backgroundImage = `url(${pair.modified})`;

        // Очищаем предыдущие маркеры отличий
        const markers = document.querySelectorAll('.difference-marker');
        markers.forEach(marker => marker.remove());
    }

    function handleImageClick(e, isLeft) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Проверяем, попал ли клик в область отличия
        const clickedDiff = differences.find(diff => {
            const distance = Math.sqrt(
                Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2)
            );
            return distance <= diff.radius;
        });

        if (clickedDiff && !clickedDiff.found) {
            markDifference(clickedDiff, isLeft);
            clickedDiff.found = true;
            foundDifferences++;
            counter.textContent = `Найдено отличий: ${foundDifferences}/5`;

            if (foundDifferences === differences.length) {
                setTimeout(() => {
                    alert('Поздравляем! Вы нашли все отличия!');
                    startNewGame();
                }, 500);
            }
        }
    }

    function markDifference(diff, isLeft) {
        const marker = document.createElement('div');
        marker.className = 'difference-marker';
        marker.style.left = `${diff.x - 10}px`;
        marker.style.top = `${diff.y - 10}px`;

        if (isLeft) {
            leftImage.appendChild(marker);
            const rightMarker = marker.cloneNode();
            rightImage.appendChild(rightMarker);
        } else {
            rightImage.appendChild(marker);
            const leftMarker = marker.cloneNode();
            leftImage.appendChild(leftMarker);
        }
    }

    function showHint() {
        if (hintsLeft <= 0) {
            alert('Подсказки закончились!');
            return;
        }

        const unrevealedDiff = differences.find(diff => !diff.found);
        if (unrevealedDiff) {
            const marker = document.createElement('div');
            marker.className = 'hint-marker';
            marker.style.left = `${unrevealedDiff.x - 15}px`;
            marker.style.top = `${unrevealedDiff.y - 15}px`;

            leftImage.appendChild(marker);
            const rightMarker = marker.cloneNode();
            rightImage.appendChild(rightMarker);

            hintsLeft--;
            setTimeout(() => {
                marker.remove();
                rightMarker.remove();
            }, 2000);
        }
    }

    leftImage.addEventListener('click', e => handleImageClick(e, true));
    rightImage.addEventListener('click', e => handleImageClick(e, false));
    hintButton.addEventListener('click', showHint);

    // Инициализация игры
    startNewGame();
}