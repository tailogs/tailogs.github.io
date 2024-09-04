#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>
#include <wchar.h>
#include <windows.h>  // Для Windows API
#include <stdarg.h>

#define MAX_LINE_LENGTH 1024
#define MAX_POST_LENGTH 8192 // Максимальная длина поста
#define DEBUG 1 // Установите в 1 для включения отладочного вывода

// Глобальная переменная для файла отладки
FILE *debug_file = NULL;

void debug_log(const char *format, ...) {
    if (debug_file == NULL) return;

    va_list args;
    va_start(args, format);
    vfprintf(debug_file, format, args);
    va_end(args);
    fflush(debug_file);
}

void convert_markup(wchar_t *line, FILE *output) {
    wchar_t *pos;
    wchar_t *start = line; // Начало текущей строки
    int in_italic = 0; // Флаг для отслеживания курсивного текста
    int in_bold = 0; // Флаг для отслеживания жирного текста

    while (*start) {
        // Обработка курсивного текста
        if (!in_italic && (pos = wcsstr(start, L"_")) != NULL) {
            *pos = L'\0'; // Разделяем строку на две части
            wchar_t *end = wcsstr(pos + 1, L"_");
            if (end) {
                *end = L'\0'; // Завершаем курсив
                fputws(start, output); // Записываем текст до курсивного
                fputws(L"<i>", output);
                fputws(pos + 1, output);
                fputws(L"</i>", output);
                start = end + 1; // Продолжаем с оставшейся частью строки
            } else {
                *pos = L'_'; // Если не найден конец, возвращаем символ
                fputws(start, output); // Записываем оставшуюся часть строки
                break; // Выходим из цикла
            }
        } else if (in_italic && (pos = wcsstr(start, L"_")) != NULL) {
            *pos = L'\0'; // Завершаем курсив
            fputws(start, output);
            fputws(L"</i>", output);
            start = pos + 1; // Продолжаем с оставшейся частью строки
            in_italic = 0; // Сбрасываем флаг курсивного текста
        }

        // Обработка жирного текста
        if (!in_bold && (pos = wcsstr(start, L"*")) != NULL) {
            *pos = L'\0'; // Разделяем строку на две части
            wchar_t *end = wcsstr(pos + 1, L"*");
            if (end) {
                *end = L'\0'; // Завершаем жирный текст
                fputws(start, output); // Записываем текст до жирного
                fputws(L"<b>", output);
                fputws(pos + 1, output);
                fputws(L"</b>", output);
                start = end + 1; // Продолжаем с оставшейся частью строки
            } else {
                *pos = L'*'; // Если не найден конец, возвращаем символ
                fputws(start, output); // Записываем оставшуюся часть строки
                break; // Выходим из цикла
            }
        } else if (in_bold && (pos = wcsstr(start, L"*")) != NULL) {
            *pos = L'\0'; // Завершаем жирный текст
            fputws(start, output);
            fputws(L"</b>", output);
            start = pos + 1; // Продолжаем с оставшейся частью строки
            in_bold = 0; // Сбрасываем флаг жирного текста
        }

        // Если ни курсив, ни жирный текст не были найдены, просто записываем оставшуюся часть
        if (!in_italic && !in_bold) {
            fputws(start, output);
            break; // Выходим из цикла
        }
    }
}

void generate_html() {
    const char *input_file = "chan.txt";
    const char *output_file = "chan.html";

    setlocale(LC_ALL, ""); // Установка локали

    FILE *input = fopen(input_file, "r, ccs=UTF-8"); // Открываем файл с кодировкой UTF-8
    if (!input) {
        perror("Не удалось открыть входной файл");
        exit(EXIT_FAILURE);
    }

    FILE *output = fopen(output_file, "w, ccs=UTF-8"); // Открываем файл с кодировкой UTF-8
    if (!output) {
        perror("Не удалось открыть выходной файл");
        fclose(input);
        exit(EXIT_FAILURE);
    }

    // Записываем начальную часть HTML с подключением CSS и JavaScript
    fputws(L"<!DOCTYPE html>\n", output);
    fputws(L"<html lang=\"ru\">\n", output);
    fputws(L"<head>\n", output);
    fputws(L"<meta charset=\"UTF-8\">\n", output);
    fputws(L"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n", output);
    fputws(L"<title>Микро-посты</title>\n", output);
    fputws(L"<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">\n", output);
    fputws(L"<link rel=\"icon\" href=\"../icon/icon.png\" type=\"image/png\">\n", output);
    
    fputws(L"</head>\n", output);
    fputws(L"<body>\n", output);
    fputws(L"<div class=\"container\">\n", output);

    // Левая боковая колонка
    fputws(L"<div class=\"sidebar\">\n", output);
    fputws(L"<div class=\"sidebar-content\">\n", output);

    // Добавляем аватарку (GIF-анимация)
    fputws(L"<div class=\"sidebar-avatar\"></div>\n", output);
    fputws(L"<div id=\"site-name\">Tailogs</div>\n", output);

    // Добавляем блоки для случайного факта и шутки
    fputws(L"<div id=\"time\" class=\"sidebar-status\">Загрузка времени...</div>\n", output);
    fputws(L"<div id=\"status\" class=\"sidebar-status\">Загрузка статуса...</div>\n", output);
    fputws(L"<div class=\"sidebar-status fact-style\">Факт:</div>\n", output);
    fputws(L"<div id=\"fact\" class=\"sidebar-status\">Загрузка факта...</div>\n", output);
    fputws(L"<div class=\"sidebar-status joke-style\">Шутка:</div>\n", output);
    fputws(L"<div id=\"joke\" class=\"sidebar-status\">Загрузка шутки...</div>\n", output);

    fputws(L"</div>\n", output);
    fputws(L"</div>\n", output);

    // Центральная колонка
    fputws(L"<div class=\"main-content\">\n", output);

    // Добавляем кнопку "Назад"
    fputws(L"<a href=\"..\\index.html\" class=\"back-link\">Назад</a>\n", output);

    fputws(L"<h1>Микро-посты</h1>\n", output);

    wchar_t line[MAX_LINE_LENGTH];
    wchar_t post[MAX_POST_LENGTH] = L""; // Буфер для накопления поста
    wchar_t date_time[100]; // Буфер для хранения даты и времени
    int post_started = 0; // Флаг для отслеживания, начат ли пост

    while (fgetws(line, sizeof(line) / sizeof(wchar_t), input)) {
        // Удаляем символ новой строки в конце
        line[wcscspn(line, L"\n")] = L'\0';

        // Проверка на разделитель постов
        if (wcscmp(line, L"---") == 0) {
            if (post_started) {
                fputws(L"<div class=\"post\">\n", output); // Начинаем новый пост
                fputws(L"<span class=\"date-time\">", output);
                fputws(date_time, output); // Записываем дату и время
                fputws(L"</span><br>\n", output);
                convert_markup(post, output); // Преобразуем накопленный пост
                fputws(L"</div>\n", output); // Закрываем пост
                post_started = 0; // Сбрасываем флаг
                fputws(L"<hr>\n", output); // Добавляем разделитель
                post[0] = L'\0'; // Очищаем буфер поста
            }
            continue; // Переходим к следующей строке
        }

        // Если пост еще не начат, проверяем заголовок
        if (wcsstr(line, L"# ") == line || wcsstr(line, L"## ") == line) {
            if (line[0] == L'#' && line[1] == L' ') {
                wmemmove(line, line + 2, wcslen(line) - 1);
                fputws(L"<h1>", output);
                fputws(line, output);
                fputws(L"</h1>\n", output);
            } else if (line[0] == L'#' && line[1] == L'#' && line[2] == L' ') {
                wmemmove(line, line + 3, wcslen(line) - 2);
                fputws(L"<h2>", output);
                fputws(line, output);
                fputws(L"</h2>\n", output);
            }
            continue; // Переходим к следующей строке
        }

        // Проверка на дату и время
        if (wcsstr(line, L"Дата: ") == line) {
            wmemmove(date_time, line + 6, wcslen(line) - 5);
            date_time[wcslen(line) - 6] = L'\0'; 
            continue; // Переходим к следующей строке
        }

        // Накопление текста поста
        wcscat(post, line); 
        wcscat(post, L"<br>\n"); 
        post_started = 1; 
    }

    // Обработка последнего поста, если он есть
    if (post_started) {
        fputws(L"<div class=\"post\">\n", output);
        fputws(date_time, output); 
        fputws(L"<br>\n", output); 
        convert_markup(post, output);
        fputws(L"</div>\n", output); 
    }

    fputws(L"</div>\n", output); // Закрываем центральную колонку

    // Правая боковая колонка
    fputws(L"<div class=\"sidebar\">\n", output);
    fputws(L"<div class=\"sidebar-content\">\n", output);

    // Добавляем ссылки (предполагается, что ссылки будут изображены GIF-ами)
    fputws(L"<ul class=\"sidebar-links\">\n", output);
    fputws(L"<li><a href=\"https://example.com\"><img src=\"https://media.giphy.com/media/26gsspf5bCdsD1NT2/giphy.gif\" alt=\"Link 1\"></a></li>\n", output);
    fputws(L"<li><a href=\"https://example.com\"><img src=\"https://media.giphy.com/media/dUJQL4ABSYzkm/giphy.gif\" alt=\"Link 2\"></a></li>\n", output);
    fputws(L"<li><a href=\"https://example.com\"><img src=\"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXc2cTBhZDF0aHFwNWFvb2x6MmtxMmUzcmJ1cnFoeHJ4dXBkNHhucyZlcD12MV9pbnRlbnNldHJpbmVhbF9naWZfYnlfaWQmY3Q9Zw/118lTJFyUJYyze/200.webp\" alt=\"Link 3\"></a></li>\n", output);
    fputws(L"</ul>\n", output);

    fputws(L"</div>\n", output);
    fputws(L"</div>\n", output);

    fputws(L"</div>\n", output); // Закрываем контейнер

    // Подключаем JavaScript файлы
    //fputws(L"<script src=\"status.js\" defer></script>\n", output);
    //fputws(L"<script src=\"time.js\" defer></script>\n", output);
    fputws(L"<script src=\"status_time.js\" defer></script>\n", output);
    fputws(L"<script src=\"fact_joke.js\" defer></script>\n", output);
    fputws(L"<script src=\"cursor_position.js\" defer></script>\n", output);
    fputws(L"</body>\n", output);
    fputws(L"</html>\n", output);

    fclose(input); // Закрываем файл
    fclose(output); // Закрываем файл

    // Логирование завершения
    wprintf(L"Файл %s успешно сгенерирован.\n", output_file);
}

int main() {
    // Установка кодировки консоли на UTF-8
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);

    // Открываем файл для отладки
    debug_file = fopen("debug.log", "w");
    if (debug_file == NULL) {
        perror("Не удалось открыть файл отладки");
        return EXIT_FAILURE;
    }

    debug_log("Запуск программы...\n");

    generate_html();

    debug_log("Завершение программы.\n");

    fclose(debug_file);
    return EXIT_SUCCESS;
}
