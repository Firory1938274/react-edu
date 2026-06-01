// Подключаем стандартные правила ESLint для JavaScript.
import js from '@eslint/js'

// Подключаем список глобальных переменных браузера, например document и fetch.
import globals from 'globals'

// Подключаем правила, которые проверяют правильное использование React Hooks.
import reactHooks from 'eslint-plugin-react-hooks'

// Подключаем правила, которые помогают Vite обновлять React без перезагрузки.
import reactRefresh from 'eslint-plugin-react-refresh'

// Подключаем функции для создания конфигурации ESLint.
import { defineConfig, globalIgnores } from 'eslint/config'

// Экспортируем массив настроек ESLint.
export default defineConfig([
  // Просим ESLint не проверять собранную папку dist.
  globalIgnores(['dist']),
  // Описываем правила для JavaScript и JSX-файлов.
  {
    // Проверяем только файлы с расширениями js и jsx.
    files: ['**/*.{js,jsx}'],
    // Подключаем готовые наборы правил.
    extends: [
      // Добавляем стандартные правила JavaScript.
      js.configs.recommended,
      // Добавляем правила React Hooks.
      reactHooks.configs.flat.recommended,
      // Добавляем правила React Refresh для Vite.
      reactRefresh.configs.vite,
    ],
    // Описываем настройки языка JavaScript.
    languageOptions: {
      // Разрешаем браузерные глобальные переменные.
      globals: globals.browser,
      // Разрешаем JSX-синтаксис в файлах.
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
