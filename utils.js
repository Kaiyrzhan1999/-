// Анимация появления элементов при прокрутке
export function initScrollAnimation() {
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

// Анимация навигационных кнопок
export function initNavButtonAnimation() {
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            button.style.backgroundColor = '#FFD700';
            setTimeout(() => {
                button.style.backgroundColor = '';
            }, 300);
        });
    });
}