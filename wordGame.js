export function initWordGame() {
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