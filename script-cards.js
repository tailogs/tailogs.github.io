
function flipCard() {
    const cardInner = document.querySelector('.card-inner');
    cardInner.classList.toggle('flipped');

    const cardBackMain = document.getElementById('card-back-main');
    const cardBackProjects = document.getElementById('card-back-projects');
    const cardBackContacts = document.getElementById('card-back-contacts');

    // Показываем основную информацию при перевороте
    if (cardInner.classList.contains('flipped')) {
        cardBackMain.style.display = "flex";
        cardBackProjects.style.display = "none";
        cardBackContacts.style.display = "none";
    } else {
        cardBackMain.style.display = "flex";
        cardBackProjects.style.display = "none";
        cardBackContacts.style.display = "none";
    }
}

function showProjects() {
    const cardInner = document.querySelector('.card-inner');
    const cardBackMain = document.getElementById('card-back-main');
    const cardBackProjects = document.getElementById('card-back-projects');
    const cardBackContacts = document.getElementById('card-back-contacts');

    // Применяем магическую анимацию исчезновения текста на главной странице
    const textElements = cardBackMain.querySelectorAll('h2, h3, p, button');
    textElements.forEach(element => {
        element.classList.remove('magic-fade-in', 'magic-fade-out'); // Удаляем старые анимации
        element.classList.add('magic-fade-out');     // Добавляем анимацию заново
    });

    // Ждем окончания анимации исчезновения текста, затем меняем контент
    setTimeout(() => {
        cardInner.classList.add('flipped');  // Добавляем класс для переворота

        cardBackMain.style.display = "none";
        cardBackProjects.style.display = "flex";
        cardBackContacts.style.display = "none";

        // Применяем анимацию постепенного появления для элементов проектов
        const projectItems = cardBackProjects.querySelectorAll('.project-item');
        projectItems.forEach((item, index) => {
           item.classList.remove('magic-gradual-appear');
            item.classList.add('magic-gradual-appear');
            item.style.animationDelay = `${index * 0.2}s`; // Задержка для каждого элемента
        });

      // Применяем анимацию постепенного появления к заголовку
      const projectTitle = cardBackProjects.querySelector('h2');
      projectTitle.classList.remove('magic-gradual-appear');
      projectTitle.classList.add('magic-gradual-appear');
	  
      const projectButtonShowContacts = document.getElementById('buttonShowConstacts');
      projectButtonShowContacts.classList.remove('magic-gradual-appear');
      projectButtonShowContacts.classList.add('magic-gradual-appear');
	  
      const projectButtonShowMain = document.getElementById('buttonShowMain');
      projectButtonShowMain.classList.remove('magic-gradual-appear');
      projectButtonShowMain.classList.add('magic-gradual-appear');

    }, 1000); // Задержка, соответствующая времени анимации fade-out
}


function showContacts() {
    const cardBackMain = document.getElementById('card-back-main');
    const cardBackProjects = document.getElementById('card-back-projects');
    const cardBackContacts = document.getElementById('card-back-contacts');

    // Применяем магическую анимацию исчезновения текста
    const textElements = cardBackProjects.querySelectorAll('h2, p, button');
      textElements.forEach(element => {
        element.classList.remove('magic-fade-in', 'magic-fade-out'); // Удаляем старые анимации
        element.classList.add('magic-fade-out');
      });

    // Ждем окончания анимации исчезновения текста, затем меняем контент
    setTimeout(() => {
        cardBackMain.style.display = "none";
        cardBackProjects.style.display = "none";
        cardBackContacts.style.display = "flex";

        // Применяем магическую анимацию появления нового контента
        const contactTextElements = cardBackContacts.querySelectorAll('h2, p, button');
        contactTextElements.forEach(element => {
           element.classList.remove('magic-fade-in', 'magic-fade-out');
            element.classList.add('magic-fade-in');
        });
    }, 1000); // Задержка, соответствующая времени анимации fade-out
}

function showMain() {
    const cardBackMain = document.getElementById('card-back-main');
    const cardBackProjects = document.getElementById('card-back-projects');
    const cardBackContacts = document.getElementById('card-back-contacts');

    // Применяем магическую анимацию исчезновения текста
    const textElements = cardBackProjects.querySelectorAll('h2, p, button');
    textElements.forEach(element => {
       element.classList.remove('magic-fade-in', 'magic-fade-out'); // Удаляем старые анимации
        element.classList.add('magic-fade-out');
    });

    setTimeout(() => {
        cardBackMain.style.display = "flex";
        cardBackProjects.style.display = "none";
        cardBackContacts.style.display = "none";

        // Применяем магическую анимацию появления нового контента
        const mainTextElements = cardBackMain.querySelectorAll('h2, h3, p, button');
        mainTextElements.forEach(element => {
           element.classList.remove('magic-fade-in', 'magic-fade-out'); // Удаляем старые анимации
            element.classList.add('magic-fade-in');
        });
    }, 1000); // Задержка, соответствующая времени анимации fade-out
}
// Настройка эффектов внутри карточки
const card = document.querySelector('.card');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

card.appendChild(canvas);

canvas.width = card.offsetWidth;
canvas.height = card.offsetHeight;

canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';

let shapes = [];
let isMouseInside = false;

// Создаем фигуру
function createShape(x, y) {
    const shapeTypes = ['circle', 'triangle', 'square'];
    const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    const glow = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;

    return {
        x,
        y,
        type,
        color,
        glow,
        size: Math.random() * 30 + 20, // Размер от 20 до 50
        opacity: 1, // Начальная прозрачность
        fadeRate: 0.02, // Скорость исчезновения
        trail: [],
    };
}

// Позиция курсора внутри карточки
let mouseX = 0;
let mouseY = 0;

card.addEventListener('mousemove', (e) => {
    isMouseInside = true;

    const rect = card.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    if (shapes.length < 3) { // Ограничение на количество форм
        shapes.push(createShape(mouseX, mouseY));
    }
});

card.addEventListener('mouseleave', () => {
    isMouseInside = false;
});

// Рисуем фигуру
function drawShape(shape) {
    ctx.save();

    // Свечение фигуры
    ctx.shadowBlur = 20;
    ctx.shadowColor = shape.glow;

    // Полупрозрачность фигуры
    ctx.globalAlpha = shape.opacity;

    // Рисуем фигуру
    ctx.fillStyle = shape.color;
    ctx.strokeStyle = shape.color;

    if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape.type === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y - shape.size);
        ctx.lineTo(shape.x - shape.size, shape.y + shape.size);
        ctx.lineTo(shape.x + shape.size, shape.y + shape.size);
        ctx.closePath();
        ctx.fill();
    } else if (shape.type === 'square') {
        ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    }

    // След
    shape.trail.forEach((point, index) => {
        const alpha = (index + 1) / shape.trail.length; // Постепенное затухание
        ctx.globalAlpha = alpha * shape.opacity; // Прозрачность зависит от фигуры
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = shape.color;
        ctx.fill();
    });

    ctx.restore();
}

// Анимация
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes = shapes.filter((shape) => shape.opacity > 0); // Удаляем полностью исчезнувшие фигуры

    shapes.forEach((shape) => {
        // Плавное исчезновение формы
        if (!isMouseInside) {
            shape.opacity -= shape.fadeRate;
        }

        // Движение формы к курсору
        if (isMouseInside) {
            shape.x += (mouseX - shape.x) * 0.1;
            shape.y += (mouseY - shape.y) * 0.1;
        }

        // Добавляем точки следа
        shape.trail.push({ x: shape.x, y: shape.y, size: Math.random() * 5 + 2 }); // Размер точки следа от 2 до 7
        if (shape.trail.length > 20) shape.trail.shift(); // Длина следа

        drawShape(shape);
    });

    requestAnimationFrame(animate);
}

animate();
