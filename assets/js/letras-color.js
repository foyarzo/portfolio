document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('animated-text');
    const text = textElement.textContent.trim();
    textElement.textContent = '';

    const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.color = getRandomColor();
        textElement.appendChild(span);
    });
});