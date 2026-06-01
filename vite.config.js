// Подключаем defineConfig, чтобы Vite понимал настройки проекта.
import { defineConfig } from 'vite'

// Подключаем плагин React для Vite.
import react from '@vitejs/plugin-react'

// Экспортируем настройки Vite наружу.
export default defineConfig({
  // Говорим Vite, что в проекте используется React.
  plugins: [react()],
})
