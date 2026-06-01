// Подключаем StrictMode, чтобы React помогал находить ошибки во время разработки.
import { StrictMode } from 'react'

// Подключаем createRoot, чтобы React смог нарисовать приложение внутри HTML.
import { createRoot } from 'react-dom/client'

// Подключаем общие стили для всей страницы.
import './index.css'

// Подключаем главный компонент приложения.
import App from './App.jsx'

// Находим в index.html элемент с id root.
const rootElement = document.getElementById('root')

// Создаем React-корень внутри найденного элемента.
const root = createRoot(rootElement)

// Просим React нарисовать наше приложение в браузере.
root.render(
  // StrictMode не рисует ничего на странице, он только помогает разработчику.
  <StrictMode>
    {/* App - это главный компонент со всей учебной страницей. */}
    <App />
  </StrictMode>,
)
