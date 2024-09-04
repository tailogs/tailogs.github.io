document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');
    const timeElement = document.getElementById('time');

    // Функция для генерации шутливого статуса
    function getFunnyStatus() {
        const funnyStatuses = [
            "Кофе не выпит, но я уже почти человек.",
            "Занят… Во сне.",
            "Мозг на каникулах.",
            "Пытаюсь не уснуть в этой бесконечной реальности.",
            "Поднялся с дивана, чтобы посмотреть на диван.",
            "Не беспокоить – и так всё неважно.",
            "Интроверт на отдыхе."
        ];
        return funnyStatuses[Math.floor(Math.random() * funnyStatuses.length)];
    }

    // Закомментируем старый код для генерации случайного статуса
    /*
    function getRandomStatus() {
        const statuses = [
            "Онлайн",
            "В отпуске",
            "Не беспокоить",
            "Занят",
            "В сети",
            "Неактивен",
            "Отошел"
        ];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }
    */

    if (statusElement) {
        statusElement.innerText = `Статус: ${getFunnyStatus()}`;
    } else {
        console.error('Элемент с ID "status" не найден.');
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        if (timeElement) {
            timeElement.innerText = `Текущее время: ${hours}:${minutes}:${seconds}`;
        } else {
            console.error('Элемент с ID "time" не найден.');
        }
    }

    updateTime();
    setInterval(updateTime, 1000); // Обновляем время каждую секунду
});

console.log('status_time.js загружен');
