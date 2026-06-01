// Берем useState, чтобы React помнил данные после изменения страницы.
import { useState } from 'react'

// Подключаем стили только для этого компонента App.
import './App.css'

// Пишем адрес файла, который студенты должны создать в папке public.
const DB_FILE = '/students.json'

// Делаем запасные данные, чтобы страница не была пустой до создания JSON.
const demoStudents = [
  // Это первая учебная запись про студента.
  { id: 1, name: 'Анна', group: 'JS-1', score: 5 },
  // Это вторая учебная запись про студента.
  { id: 2, name: 'Игорь', group: 'JS-1', score: 4 },
  // Это третья учебная запись про студента.
  { id: 3, name: 'Мария', group: 'JS-2', score: 3 },
]

// Создаем главный компонент, из которого собирается вся страница.
function App() {
  // Создаем состояние students, где лежит список студентов на экране.
  const [students, setStudents] = useState(demoStudents)

  // Создаем состояние status, чтобы показывать понятное сообщение пользователю.
  const [status, setStatus] = useState('Пока показаны демо-данные из кода.')

  // Создаем состояние query, чтобы хранить текст из поля поиска.
  const [query, setQuery] = useState('')

  // Убираем лишние пробелы из поиска и делаем буквы маленькими.
  const cleanQuery = query.trim().toLowerCase()

  // Оставляем только тех студентов, имя которых подходит под поиск.
  const visibleStudents = students.filter((student) => {
    // Превращаем имя студента в строку и делаем буквы маленькими.
    const studentName = String(student.name).toLowerCase()

    // Возвращаем true, если имя содержит текст из поиска.
    return studentName.includes(cleanQuery)
  })

  // Складываем все оценки, чтобы потом найти средний балл.
  const scoreSum = students.reduce((sum, student) => {
    // Превращаем оценку в число, потому что из JSON может прийти строка.
    const score = Number(student.score)

    // Если оценка не число, прибавляем ноль, чтобы приложение не ломалось.
    const safeScore = Number.isNaN(score) ? 0 : score

    // Возвращаем новую сумму для следующего студента.
    return sum + safeScore
  }, 0)

  // Считаем средний балл, а если студентов нет, показываем ноль.
  const averageScore = students.length === 0 ? 0 : scoreSum / students.length

  // Округляем средний балл до одного знака после точки.
  const roundedAverage = averageScore.toFixed(1)

  // Эта функция запускается, когда пользователь печатает в поле поиска.
  function handleQueryChange(event) {
    // Кладем новый текст из поля ввода в состояние query.
    setQuery(event.target.value)
  }

  // Эта функция пробует загрузить файл public/students.json.
  async function loadStudents() {
    // Сразу показываем, что приложение начало искать файл.
    setStatus('Ищу файл public/students.json...')

    // Начинаем блок try, чтобы поймать ошибку и показать ее нормальным текстом.
    try {
      // Просим браузер скачать JSON-файл из папки public.
      const response = await fetch(DB_FILE)

      // Проверяем, получилось ли найти файл.
      if (!response.ok) {
        // Если файл не найден, создаем понятную ошибку.
        throw new Error('Файл public/students.json не найден. Создайте его по заданию.')
      }

      // Превращаем ответ сервера из текста JSON в обычные данные JavaScript.
      const data = await response.json()

      // Проверяем, что в файле лежит массив, а не один объект.
      if (!Array.isArray(data)) {
        // Если это не массив, объясняем студенту, что именно исправить.
        throw new Error('В students.json должен лежать массив: [ ... ].')
      }

      // Заменяем демо-данные настоящими данными из JSON-файла.
      setStudents(data)

      // Показываем, сколько записей получилось загрузить.
      setStatus(`Загружено записей из JSON: ${data.length}.`)
    } catch (error) {
      // Если что-то сломалось, показываем текст ошибки на странице.
      setStatus(error.message)
    }
  }

  // Возвращаем разметку, похожую на HTML, которую React покажет в браузере.
  return (
    // React-фрагмент нужен, чтобы вернуть один общий кусок разметки без лишнего div.
    <>
      {/* Главный блок страницы. */}
      <main className="app">
        {/* Верхняя часть страницы с названием проекта. */}
        <section className="intro">
          {/* Короткая подпись над заголовком. */}
          <p className="intro__label">Учебный каркас на React</p>

          {/* Главный заголовок страницы. */}
          <h1>JSON как простая база данных</h1>

          {/* Короткое объяснение, что делает этот проект. */}
          <p className="intro__text">
            Сегодня студенты создают файл <code>public/students.json</code>,
            загружают его в React и выводят данные на экран.
          </p>
        </section>

        {/* Рабочая область с кнопкой загрузки и списком студентов. */}
        <section className="workspace">
          {/* Левая колонка с управлением данными. */}
          <div className="panel">
            {/* Заголовок блока управления. */}
            <h2>Работа с данными</h2>

            {/* Поле, куда можно ввести имя для поиска. */}
            <label className="field">
              {/* Подпись поля ввода. */}
              <span>Поиск по имени</span>

              {/* Само поле ввода для текста поиска. */}
              <input value={query} onChange={handleQueryChange} placeholder="Например: Анна" />
            </label>

            {/* Кнопка запускает загрузку JSON-файла. */}
            <button type="button" onClick={loadStudents}>
              Загрузить students.json
            </button>

            {/* Статус показывает, что сейчас происходит с JSON-файлом. */}
            <p className="status">{status}</p>

            {/* Блок с короткой статистикой по данным. */}
            <div className="stats">
              {/* Показываем количество всех студентов. */}
              <p>Всего студентов: {students.length}</p>

              {/* Показываем количество студентов после фильтра поиска. */}
              <p>Найдено по поиску: {visibleStudents.length}</p>

              {/* Показываем средний балл. */}
              <p>Средний балл: {roundedAverage}</p>
            </div>
          </div>

          {/* Правая колонка со списком студентов. */}
          <div className="panel">
            {/* Заголовок списка. */}
            <h2>Список студентов</h2>

            {/* Список карточек, который строится из массива students. */}
            <ul className="students">
              {/* map проходит по массиву и рисует один li для каждого студента. */}
              {visibleStudents.map((student) => (
                // key помогает React быстро обновлять список без путаницы.
                <li className="student-card" key={student.id ?? student.name}>
                  {/* Имя студента берем из поля name. */}
                  <strong>{student.name}</strong>

                  {/* Группу студента берем из поля group. */}
                  <span>Группа: {student.group}</span>

                  {/* Оценку студента берем из поля score. */}
                  <span>Оценка: {student.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Нижний блок с заданием на сегодня. */}
        <section className="task">
          {/* Заголовок задания с точной датой. */}
          <h2>Задание на сегодня, 1 июня 2026</h2>

          {/* Первый пункт объясняет, где создать JSON-файл. */}
          <p>1. Создайте файл <code>public/students.json</code>.</p>

          {/* Второй пункт объясняет, что файл должен быть массивом. */}
          <p>2. Положите внутрь массив объектов с полями <code>id</code>, <code>name</code>, <code>group</code> и <code>score</code>.</p>

          {/* Третий пункт объясняет, как проверить работу в браузере. */}
          <p>3. Нажмите кнопку загрузки и убедитесь, что на странице появились ваши данные.</p>

          {/* Четвертый пункт дает маленькое усложнение для самостоятельной работы. */}
          <p>4. Добавьте еще одно поле, например <code>city</code>, и выведите его в карточке студента.</p>

          {/* Пример показывает студентам правильную форму JSON. */}
          <pre className="code-example">{`[
  {
    "id": 1,
    "name": "Анна",
    "group": "JS-1",
    "score": 5
  }
]`}</pre>
        </section>
      </main>
    </>
  )
}

// Отдаем компонент App наружу, чтобы main.jsx смог его подключить.
export default App
