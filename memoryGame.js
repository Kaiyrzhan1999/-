export function initMemoryGame() {
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