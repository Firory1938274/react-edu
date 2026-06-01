# React JSON DB

Учебный каркас на Vite + React + JavaScript. Код в `src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/App.css` и `vite.config.js` снабжен простыми комментариями, чтобы было понятно, что делает каждая важная строка.

## Запуск

Требуется Node.js 16.20 или новее. Если команда `node -v` показывает версию ниже 16.20, сначала обновите Node.js.

```powershell
# Скачать проект
git clone https://github.com/kaldyrr/react-edu.git

# Зайти в папку проекта
cd react-edu

# Отключить строгую SSL-проверку npm для учебной сети
npm config set strict-ssl false

# Установить зависимости
npm install

# Запустить проект
npm run dev
```

После запуска Vite покажет локальный адрес, обычно `http://localhost:5173/`.

Если порт `5173` занят, Vite покажет другой порт, например `http://localhost:5174/`.

## Если npm install упал

1. Проверьте Node.js:

```powershell
node -v
npm -v
```

2. Если Node.js ниже `16.20`, обновите Node.js.

3. Еще раз выполните:

```powershell
npm config set strict-ssl false
npm cache clean --force
npm install
```

4. Если ошибка осталась, пришлите полный текст ошибки из терминала.

## Задание на сегодня, 1 июня 2026

1. Создать файл `public/students.json`. Можно скопировать пример:

```powershell
Copy-Item public\students.example.json public\students.json
```

2. Положить туда массив объектов. Один объект - один студент.
3. Минимальные поля: `id`, `name`, `group`, `score`.
4. Открыть приложение в браузере и нажать `Загрузить students.json`.
5. Проверить поиск по имени и средний балл.
6. Добавить новое поле, например `city`, и вывести его в карточке студента.
7. Добавить минимум 5 студентов.

Пример содержимого файла:

```json
[
  {
    "id": 1,
    "name": "Анна",
    "group": "JS-1",
    "score": 5
  },
  {
    "id": 2,
    "name": "Игорь",
    "group": "JS-1",
    "score": 4
  }
]
```

Важный момент: React без сервера может прочитать JSON-файл, но не может сам сохранить изменения обратно в этот файл. Если студент добавляет данные через форму, это будет изменение только в памяти браузера.
