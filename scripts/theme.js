// Получаем ссылки на элементы
const styleToggle = document.getElementById('style-toggle');
const nav = document.querySelector('nav');
const body = document.querySelector('body');

// Проверяем, есть ли сохраненная тема в куках
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
}

// Обработчик события для кнопки
styleToggle.addEventListener('click', function() {
  // Переключаем класс 'active' для кнопки
  styleToggle.classList.toggle('active');
  
  // Переключаем стили навигации
  nav.classList.toggle('alternate-style');

  // Переключаем тему
  body.classList.toggle('dark-theme');

  // Сохраняем выбранную тему в куках
  const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : '';
  localStorage.setItem('theme', currentTheme);
});
