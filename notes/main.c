#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h>
#include <wchar.h>
#include <windows.h>
#include <stdarg.h>

#define MAX_LINE_LEN 2048
#define MAX_POST_LENGTH 8192 // Максимальная длина поста
#define DEBUG 1 // Установите в 1 для включения отладочного вывода

// Глобальная переменная для файла отладки
FILE *debug_file = NULL;

// Функция для записи начальной структуры HTML с поддержкой UTF-8
void write_html_header(FILE *out) {
    fputws(L"<!DOCTYPE html>\n", out);
    fputws(L"<html lang=\"ru\">\n", out);
    fputws(L"<head>\n", out);
    fputws(L"<meta charset=\"UTF-8\">\n", out);
    fputws(L"<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\">\n", out);
    fputws(L"<link rel=\"icon\" href=\"../icon/icon.png\" type=\"image/png\">\n", out);
    fputws(L"<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n", out);
    fputws(L"<title>Большие Посты</title>\n</head>\n<body>\n", out);
    fputws(L"<div class=\"container\">\n", out);
    fputws(L"<div class=\"sidebar\">\n", out);
    fputws(L"<div class=\"sidebar-content\">\n", out);
    fputws(L"<div class=\"sidebar-avatar\"></div>\n", out);
    fputws(L"<div id=\"site-name\">Большие Посты</div>\n", out);
    fputws(L"<a href=\"..\\index.html\"><div class=\"sidebar-btn-back\">Назад</div></a>\n", out);
    fputws(L"</div>\n", out);
    fputws(L"</div>\n", out);
    fputws(L"<div class=\"main-content\">\n", out);
}

// Функция для записи окончания HTML
void write_html_footer(FILE *out) {
    fputws(L"</div>\n", out); // Закрываем контейнер основной колонки
    fputws(L"</div>\n", out); // Закрываем контейнер
    fputws(L"</body>\n</html>\n", out);
}

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

void generate_html_from_file(const char *input_file) {
    FILE *in = fopen(input_file, "r, ccs=UTF-8");
    if (!in) {
        perror("Не удалось открыть входной файл");
        return;
    }

    FILE *out = fopen("notes.html", "w, ccs=UTF-8");
    if (!out) {
        perror("Не удалось создать HTML файл");
        fclose(in);
        return;
    }

    // Пишем заголовок HTML с мета-тегом для UTF-8
    write_html_header(out);

    wchar_t line[MAX_LINE_LEN];
    wchar_t buffer[MAX_POST_LENGTH] = L""; // Для хранения текста поста
    wchar_t date_time[100] = L""; // Буфер для хранения даты и времени
    int post_started = 0; // Флаг для отслеживания, начат ли пост
    int post_count = 1; // Переменная для хранения текущего номера поста

    // Создаем список постов
    fputws(L"<div class=\"sidebar-links\">\n", out);

    while (fgetws(line, sizeof(line) / sizeof(wchar_t), in)) {
        // Удаляем символ новой строки в конце
        line[wcscspn(line, L"\n")] = L'\0';

        // Проверка на разделитель постов
        if (wcscmp(line, L"---") == 0) {
            if (post_started) {
                // Завершаем предыдущий пост
                wchar_t post_id[256];
                swprintf(post_id, sizeof(post_id) / sizeof(wchar_t), L"post-%d", post_count);
                
                fputws(L"<div class=\"post\" id=\"", out);
                fputws(post_id, out);
                fputws(L"\">\n", out);
                fputws(L"<span class=\"date-time\">", out);
                fputws(date_time, out);
                fputws(L"</span><br>\n", out);
                convert_markup(buffer, out);
                fputws(L"</div>\n", out);

                post_started = 0;
                buffer[0] = L'\0';

                post_count++; // Увеличиваем номер поста
            }
            continue;
        }

        // Проверка на заголовок поста
        if (wcsstr(line, L"# ") == line || wcsstr(line, L"## ") == line) {
            if (line[0] == L'#' && line[1] == L' ') {
                wmemmove(line, line + 2, wcslen(line) - 1);
                fputws(L"<h1>", out);
                fputws(line, out);
                fputws(L"</h1>\n", out);
            } else if (line[0] == L'#' && line[1] == L'#' && line[2] == L' ') {
                wmemmove(line, line + 3, wcslen(line) - 2);
                fputws(L"<h2>", out);
                fputws(line, out);
                fputws(L"</h2>\n", out);
            }

            // Добавляем идентификатор поста и ссылку
            if (line[0] == L'#') {
                wchar_t post_id[256];
                swprintf(post_id, sizeof(post_id) / sizeof(wchar_t), L"post-%d", post_count);
                fputws(L"<a href=\"#", out);
                fputws(post_id, out);
                fputws(L"\">", out);
                fputws(line, out);
                fputws(L"</a><br>\n", out);
            }

            continue;
        }

        // Проверка на дату и время
        if (wcsstr(line, L"Дата: ") == line) {
            wmemmove(date_time, line + 6, wcslen(line) - 5);
            date_time[wcslen(line) - 6] = L'\0';
            continue;
        }

        // Накопление текста поста
        wcscat(buffer, line);
        wcscat(buffer, L"<br>\n");
        post_started = 1;
    }

    // Обработка последнего поста, если он есть
    if (post_started) {
        wchar_t post_id[256];
        swprintf(post_id, sizeof(post_id) / sizeof(wchar_t), L"post-%d", post_count);
        
        fputws(L"<div class=\"post\" id=\"", out);
        fputws(post_id, out);
        fputws(L"\">\n", out);
        fputws(L"<span class=\"date-time\">", out);
        fputws(date_time, out);
        fputws(L"</span><br>\n", out);
        convert_markup(buffer, out);
        fputws(L"</div>\n", out);
    }

    // Закрываем список постов
    fputws(L"</div>\n", out);

    // Записываем окончание HTML
    write_html_footer(out);

    fclose(in);
    fclose(out);

    printf("HTML успешно создан\n");
}

int main() {
    // Установка кодировки консоли на UTF-8
    SetConsoleOutputCP(CP_UTF8);
    SetConsoleCP(CP_UTF8);

    // Установка локали для поддержки Unicode
    setlocale(LC_CTYPE, "");

    // Открываем файл отладки, если включен режим отладки
    if (DEBUG) {
        debug_file = fopen("debug.log", "w, ccs=UTF-8");
        if (!debug_file) {
            perror("Не удалось создать файл отладки");
            return 1;
        }
    }

    generate_html_from_file("notes.txt");

    return 0;
}
