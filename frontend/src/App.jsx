import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Проверяем сохраненную сессию
    useEffect(() => {
      const saved = localStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
    }, []);

  return (
    <div className="app">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;