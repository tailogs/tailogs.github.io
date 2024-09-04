document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll('.post');

    function handleMouseMove(event) {
        const { clientX, clientY } = event;
        const { offsetWidth: width, offsetHeight: height } = this;
        const { left, top } = this.getBoundingClientRect();
        
        // Нормализуем координаты
        const x = clientX - left;
        const y = clientY - top;
        
        // Вычисляем наклон
        const tiltX = ((y / height) - 0.5) * 20; // Увеличиваем диапазон наклона
        const tiltY = ((x / width) - 0.5) * -20; // Увеличиваем диапазон наклона

        this.style.setProperty('--tilt-x', `${tiltX}deg`);
        this.style.setProperty('--tilt-y', `${tiltY}deg`);
    }

    function resetTilt() {
        this.style.setProperty('--tilt-x', `0deg`);
        this.style.setProperty('--tilt-y', `0deg`);
    }

    posts.forEach(post => {
        post.addEventListener('mousemove', handleMouseMove);
        post.addEventListener('mouseleave', resetTilt);
    });
});
