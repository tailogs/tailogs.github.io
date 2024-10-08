window.onload = function() {
    // Массивы фактов и шуток с 100 элементами в каждом
    const facts = [
        "Курсивные и жирные тексты применяются в разметке для выделения важной информации.",
        "Первый компьютер, созданный в 1945 году, занимал целую комнату и весил 30 тонн.",
        "На Земле более 7 миллиардов людей, но вы единственный такой, как вы.",
        "Первые текстовые редакторы появились в 1970-х годах и были довольно примитивными.",
        "Средняя температура на поверхности Луны составляет около -173°C.",
        "Слово 'Google' произошло от математического термина 'гугол', обозначающего число 1 с 100 нулями.",
        "Человеческий мозг на 75% состоит из воды.",
        "Наибольшее число, которое можно выразить, используя только цифру 9 и знаки сложения, равно 999...999 (100 раз).",
        "Самый большой океан на Земле — Тихий.",
        "Медузы существуют на Земле уже более 500 миллионов лет.",
        "Кофе был открыт в Эфиопии около 600 года нашей эры.",
        "Тик-такер — это единица измерения времени в компьютерной графике.",
        "Наименьшая кость в человеческом теле — стремечко в ухе.",
        "Луна на 1/6 части меньше Земли.",
        "Слон — единственное животное, которое не может прыгать.",
        "Человеческий нос может различать более 1 триллиона запахов.",
        "Человеческое тело производит около 1 литра слюны в день.",
        "Летучие мыши — единственные млекопитающие, которые могут летать.",
        "Самая большая пустыня на Земле — Антарктида.",
        "Утки могут издавать звуки, напоминающие «кря-кря», но не могут издавать звуки, похожие на «кукушка».",
        "Каждый человек имеет уникальный запах, подобно отпечаткам пальцев.",
        "Человеческий мозг способен обрабатывать 50 000 мыслей в день.",
        "Огурцы на 95% состоят из воды.",
        "Пингвины — это не только птицы, но и отличные пловцы.",
        "Один день на Венере равен 243 земным дням.",
        "Самая старая из известных трёхмерных структур — это кристаллы соли, которые имеют около 2 миллиардов лет.",
        "Кошки могут бегать со скоростью до 48 км/ч.",
        "Слово 'нельсон' произошло от имени адмирала Нельсона, который одержал победу в битве при Трафальгаре.",
        "Акула не имеет костей, её скелет состоит из хряща.",
        "Самая высокая гора в солнечной системе — Олимп на Марсе.",
        "В некоторых странах мёд используется в качестве лекарства.",
        "В некоторых культурах золото используется как символ чистоты и богатства.",
        "Утки спят с одним глазом открытым, чтобы охранять себя от хищников.",
        "Ракеты могут работать в космосе благодаря третьему закону Ньютона — действие и противодействие.",
        "На Земле есть около 2000 вулканов, из которых 500 активны.",
        "Самая глубокая точка океана — Марианская впадина.",
        "Боливия и Парагвай не имеют выхода к морю.",
        "Курсивные и жирные тексты применяются в разметке для выделения важной информации.",
        "Первый компьютер, созданный в 1945 году, занимал целую комнату и весил 30 тонн.",
        "На Земле более 7 миллиардов людей, но вы единственный такой, как вы.",
        "Первые текстовые редакторы появились в 1970-х годах и были довольно примитивными.",
        "Средняя температура на поверхности Луны составляет около -173°C.",
        "Слово 'Google' произошло от математического термина 'гугол', обозначающего число 1 с 100 нулями.",
        "Человеческий мозг на 75% состоит из воды.",
        "Наибольшее число, которое можно выразить, используя только цифру 9 и знаки сложения, равно 999...999 (100 раз).",
        "Самый большой океан на Земле — Тихий.",
        "Медузы существуют на Земле уже более 500 миллионов лет.",
        "Кофе был открыт в Эфиопии около 600 года нашей эры.",
        "Тик-такер — это единица измерения времени в компьютерной графике.",
        "Наименьшая кость в человеческом теле — стремечко в ухе.",
        "Луна на 1/6 части меньше Земли.",
        "Слон — единственное животное, которое не может прыгать.",
        "Человеческий нос может различать более 1 триллиона запахов.",
        "Человеческое тело производит около 1 литра слюны в день.",
        "Летучие мыши — единственные млекопитающие, которые могут летать.",
        "Самая большая пустыня на Земле — Антарктида.",
        "Утки могут издавать звуки, напоминающие «кря-кря», но не могут издавать звуки, похожие на «кукушка».",
        "Каждый человек имеет уникальный запах, подобно отпечаткам пальцев.",
        "Человеческий мозг способен обрабатывать 50 000 мыслей в день.",
        "Огурцы на 95% состоят из воды.",
        "Пингвины — это не только птицы, но и отличные пловцы.",
        "Один день на Венере равен 243 земным дням.",
        "Самая старая из известных трёхмерных структур — это кристаллы соли, которые имеют около 2 миллиардов лет.",
        "Кошки могут бегать со скоростью до 48 км/ч.",
        "Слово 'нельсон' произошло от имени адмирала Нельсона, который одержал победу в битве при Трафальгаре.",
        "Акула не имеет костей, её скелет состоит из хряща.",
        "Самая высокая гора в солнечной системе — Олимп на Марсе.",
        "В некоторых странах мёд используется в качестве лекарства.",
        "В некоторых культурах золото используется как символ чистоты и богатства.",
        "Утки спят с одним глазом открытым, чтобы охранять себя от хищников.",
        "Ракеты могут работать в космосе благодаря третьему закону Ньютона — действие и противодействие.",
        "На Земле есть около 2000 вулканов, из которых 500 активны.",
        "Самая глубокая точка океана — Марианская впадина.",
        "Боливия и Парагвай не имеют выхода к морю."
    ];

    const jokes = [
        "Почему программисты не любят природу? Слишком много багов.",
        "Какой самый страшный момент в жизни программиста? Когда ему говорят, что его код не работает.",
        "Почему Python не является хорошим выбором для архитекторов? Потому что он не поддерживает пространство в именах.",
        "Какой лучший способ избежать ошибок в коде? Не писать его вовсе!",
        "Почему компьютеры не могут взламывать себя? Потому что у них нет ключа.",
        "Какой напиток предпочитают программисты? Java!",
        "Почему программисты всегда путают Хэллоуин с Рождеством? Потому что Oct 31 == Dec 25.",
        "Какой любимый цвет программистов? Синий, потому что он лучше всего сочетается с их жёлтыми подушками.",
        "Какой любимый язык программирования у рыболовов? Net.",
        "Почему программисты любят книги по C++? Потому что в них есть много классов!",
        "Какой элемент можно найти в любом коде? Баг.",
        "Почему код выглядит как шифр? Потому что программисты забывают добавлять комментарии.",
        "Что говорят программисты, когда их не понимают? «Попробуйте перезапустить!»",
        "Почему программисты всегда забывают, что на улице жарко? Потому что они всегда работают в кондиционированном помещении.",
        "Как программист открывает дверь? Нажимает на ручку.",
        "Почему программисты не могут выйти из дома? Потому что у них всегда есть ещё одна задача, которую нужно сделать.",
        "Как программисты поздравляют друг друга? «С днём кода!»",
        "Почему программисты любят чёрный цвет? Потому что он делает код более читаемым.",
        "Какой любимый фрукт программистов? Яблоко, потому что оно связано с компьютерами.",
        "Какой самый большой страх у программиста? Неизвестные ошибки.",
        "Почему программисты не любят кофе? Потому что в нём много пустых строк.",
        "Какой язык программирования самый ленивый? Java, потому что он всегда требует много времени.",
        "Почему программисты никогда не теряются? Потому что они всегда следуют своим маршрутам.",
        "Какой код программист считает идеальным? Код, который работает.",
        "Почему программисты всегда видят ошибки? Потому что они обладают отличным зрением кода.",
        "Какой лучший способ для программиста расслабиться? Прочитать документацию.",
        "Почему программисты любят декорации? Потому что они делают код красивым.",
        "Какой любимый фильм программиста? Секретный агент, потому что он всегда работает с кодом.",
        "Почему программисты всегда работают по ночам? Потому что тогда они меньше отвлекаются.",
        "Какой метод исправления ошибок наиболее эффективен? Печать ошибок в консоль.",
        "Почему программисты не боятся пауков? Потому что их код уже заполнен сетями.",
        "Какой у программиста лучший способ провести выходные? Найти и исправить новые баги.",
        "Почему программисты предпочитают тишину? Потому что шум мешает их сосредоточенности.",
        "Какой любимый напиток программиста? Кофе, потому что он помогает писать код.",
        "Почему программисты так любят гифки? Потому что они оживляют код.",
        "Какой любимый предмет в школе у программиста? Информатика.",
        "Почему программисты всегда с собой носят компьютер? Потому что код никогда не бывает готов.",
        "Какой самый важный навык для программиста? Умение читать документацию.",
        "Почему программисты не любят ждать? Потому что это время, которое можно было бы потратить на код.",
        "Какой самый ценный ресурс для программиста? Время.",
        "Почему программисты любят цифры? Потому что они имеют четкое значение.",
        "Какой язык программирования считает самый практичный? Python, потому что он универсален.",
        "Почему программисты не ходят в спортзал? Потому что их работа — это уже физическая нагрузка.",
        "Какой самый раздражающий звук для программиста? Звук баг-репортов.",
        "Почему программисты всегда забывают о еде? Потому что их код требует постоянного внимания.",
        "Какой любимый метод для программирования? Рефакторинг.",
        "Почему программисты никогда не теряются в лесу? Потому что они могут всегда найти путь по логике.",
        "Какой любимый аксессуар программиста? Наушники.",
        "Почему программисты так любят кофе? Потому что это помогает им оставаться бодрыми.",
        "Какой лучший способ для программиста развеяться? Играть в видеоигры.",
        "Почему программисты считают себя лучшими друзьями компьютера? Потому что они всегда рядом.",
        "Какой любимый способ программиста провести выходные? Работать над новым проектом.",
        "Почему программисты не читают книги? Потому что они предпочитают читать код.",
        "Какой метод программиста для исправления ошибок? Тестирование.",
        "Почему программисты любят новый проект? Потому что это новые вызовы.",
        "Какой любимый тип задач у программиста? Логические задачи.",
        "Почему программисты не боятся сложных задач? Потому что они могут решить любую проблему.",
        "Какой самый ценный навык для программиста? Умение решать проблемы.",
        "Почему программисты любят сложные алгоритмы? Потому что они решают задачи.",
        "Какой любимый метод программирования? Agile.",
        "Почему программисты не боятся ошибок? Потому что они знают, как их исправить.",
        "Какой самый любимый язык программистов? JavaScript.",
        "Почему программисты любят тестировать код? Потому что это помогает найти ошибки.",
        "Какой самый важный аспект программирования? Правильное документирование кода.",
        "Почему программисты считают себя счастливыми? Потому что они делают то, что любят.",
        "Какой любимый способ программиста отдохнуть? Слушать музыку.",
        "Почему программисты любят работать в команде? Потому что это позволяет обмениваться опытом.",
        "Какой любимый способ решения проблем у программиста? Обсуждение с коллегами.",
        "Почему программисты так любят технологии? Потому что они позволяют решать интересные задачи.",
        "Какой самый важный принцип программирования? Чистота кода.",
        "Почему программисты считают себя творческими личностями? Потому что они создают что-то новое.",
        "Какой любимый метод улучшения кода у программиста? Рефакторинг.",
        "Почему программисты любят новые технологии? Потому что это новые возможности для решения задач.",
        "Какой самый важный навык программиста? Умение работать в команде.",
        "Почему программисты так любят свою работу? Потому что они решают интересные задачи."
    ];

    // Функция для получения случайного элемента из массива
    function getRandomElement(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    // Функция для получения случайного факта
    function loadFact() {
        const factElement = document.getElementById('fact');
        factElement.innerText = getRandomElement(facts);
    }

    // Функция для получения случайной шутки
    function loadJoke() {
        const jokeElement = document.getElementById('joke');
        jokeElement.innerText = getRandomElement(jokes);
    }

    // Загрузка факта и шутки при загрузке страницы
    loadFact();
    loadJoke();
};
