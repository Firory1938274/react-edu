const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// Проверка подключения
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Ошибка подключения к БД:', err.stack);
  }
  console.log('✅ Подключено к PostgreSQL Savina');
  release();
});

// Регистрация
app.post('/api/register', async (req, res) => {
  try {
    const { login, password, hourly_rate } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (login, password_hash, hourly_rate) VALUES ($1, $2, $3) RETURNING id, login, hourly_rate',
      [login, password_hash, hourly_rate]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Логин уже занят' });
    }
    res.status(500).json({ error: err.message });
  }
});

// Вход
app.post('/api/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    
    if (!valid) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    
    res.json({ id: user.id, login: user.login, hourly_rate: user.hourly_rate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получить подписки пользователя
app.get('/api/users/:userId/subscriptions', async (req, res) => {
  try {
    const { userId } = req.params;
    const userResult = await pool.query(
      'SELECT hourly_rate FROM users WHERE id = $1',
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const hourlyRate = parseFloat(userResult.rows[0].hourly_rate);
    
    const subsResult = await pool.query(
      'SELECT * FROM subscriptions WHERE user_id = $1',
      [userId]
    );
    
    const subscriptions = subsResult.rows.map(sub => ({
      ...sub,
      cost_hours: (parseFloat(sub.cost_rub) / hourlyRate).toFixed(2)
    }));
    
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить подписку
app.post('/api/subscriptions', async (req, res) => {
  try {
    const { user_id, name, cost_rub, period } = req.body;
    const result = await pool.query(
      'INSERT INTO subscriptions (user_id, name, cost_rub, period) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, name, cost_rub, period || 'month']
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Удалить подписку
app.delete('/api/subscriptions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM subscriptions WHERE id = $1', [id]);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});