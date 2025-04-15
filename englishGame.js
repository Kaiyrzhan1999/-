export function initEnglishGame() {
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