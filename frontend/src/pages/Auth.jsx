import { useState, useEffect } from 'react';
import { register, login } from '../services/api';

// Импорт SVG как строки (через ?raw)
import frame1 from '../assets/Frame1.svg?raw';
import frame2 from '../assets/Frame2.svg?raw';
import frame3 from '../assets/Frame3.svg?raw';

const frames = [frame1, frame2, frame3];

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ login: '', password: '', hourly_rate: '' });
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Состояние для смены фреймов
  const [currentFrame, setCurrentFrame] = useState(0);

  // Переключение фреймов каждые 1.2 сек
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const result = await login(loginData.login, loginData.password);
        if (result.error) {
          setError(result.error);
        } else {
          onLogin(result);
        }
      } else {
        const result = await register(
          loginData.login,
          loginData.password,
          parseFloat(loginData.hourly_rate)
        );
        if (result.error) {
          setError(result.error);
        } else {
          onLogin(result);
        }
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="auth-page">
      {/* Нити сверху */}
      <svg className="threads-svg" viewBox="0 0 1200 500" preserveAspectRatio="none">
        <path d="M 50 0 L 50 280" className="thread" />
        <path d="M 50 280 C 50 275, 45 270, 43 275 C 41 280, 45 283, 50 285 C 55 283, 59 280, 57 275 C 55 270, 50 275, 50 280 Z" fill="#FF0000" />
        
        <path d="M 150 0 L 150 320" className="thread" />
        <path d="M 150 320 C 150 315, 145 310, 143 315 C 141 320, 145 323, 150 325 C 155 323, 159 320, 157 315 C 155 310, 150 315, 150 320 Z" fill="#FF0000" />
        
        <path d="M 250 0 L 250 300" className="thread" />
        
        <path d="M 350 0 L 350 340" className="thread" />
        <path d="M 350 340 C 350 335, 345 330, 343 335 C 341 340, 345 343, 350 345 C 355 343, 359 340, 357 335 C 355 330, 350 335, 350 340 Z" fill="#FF0000" />
        
        <path d="M 450 0 L 450 290" className="thread" />
        
        <path d="M 550 0 L 550 350" className="thread" />
        <path d="M 550 350 C 550 345, 545 340, 543 345 C 541 350, 545 353, 550 355 C 555 353, 559 350, 557 345 C 555 340, 550 345, 550 350 Z" fill="#FF0000" />
        
        <path d="M 650 0 L 650 300" className="thread" />
        
        <path d="M 750 0 L 750 340" className="thread" />
        <path d="M 750 340 C 750 335, 745 330, 743 335 C 741 340, 745 343, 750 345 C 755 343, 759 340, 757 335 C 755 330, 750 335, 750 340 Z" fill="#FF0000" />
        
        <path d="M 850 0 L 850 290" className="thread" />
        
        <path d="M 950 0 L 950 330" className="thread" />
        <path d="M 950 330 C 950 325, 945 320, 943 325 C 941 330, 945 333, 950 335 C 955 333, 959 330, 957 325 C 955 320, 950 325, 950 330 Z" fill="#FF0000" />
        
        <path d="M 1050 0 L 1050 300" className="thread" />
        
        <path d="M 1150 0 L 1150 350" className="thread" />
        <path d="M 1150 350 C 1150 345, 1145 340, 1143 345 C 1141 350, 1145 353, 1150 355 C 1155 353, 1159 350, 1157 345 C 1155 340, 1150 345, 1150 350 Z" fill="#FF0000" />

        {/* Волнистые нити */}
        <path d="M 100 0 Q 90 60 110 120 T 95 200" className="thread" />
        <path d="M 180 0 Q 170 70 190 140 T 175 240" className="thread short" />
        <path d="M 300 0 Q 310 80 290 160 T 305 260" className="thread" />
        <path d="M 400 0 Q 410 70 390 140 T 405 220" className="thread short" />
        <path d="M 405 220 C 405 215, 400 210, 398 215 C 396 220, 400 223, 405 225 C 410 223, 414 220, 412 215 C 410 210, 405 215, 405 220 Z" fill="#FF0000" />
        <path d="M 500 0 Q 510 100 490 200 T 505 350" className="thread" />
        <path d="M 600 0 Q 590 80 610 160 T 595 270" className="thread" />
        <path d="M 595 270 C 595 265, 590 260, 588 265 C 586 270, 590 273, 595 275 C 600 273, 604 270, 602 265 C 600 260, 595 265, 595 270 Z" fill="#FF0000" />
        <path d="M 700 0 Q 690 70 710 140 T 695 230" className="thread short" />
        <path d="M 695 230 C 695 225, 690 220, 688 225 C 686 230, 690 233, 695 235 C 700 233, 704 230, 702 225 C 700 220, 695 225, 695 230 Z" fill="#FF0000" />
        <path d="M 800 0 Q 790 80 810 160 T 795 260" className="thread" />
        <path d="M 900 0 Q 890 70 910 140 T 895 220" className="thread short" />
        <path d="M 1000 0 Q 990 80 1010 160 T 995 270" className="thread" />
        <path d="M 995 270 C 995 265, 990 260, 988 265 C 986 270, 990 273, 995 275 C 1000 273, 1004 270, 1002 265 C 1000 260, 995 265, 995 270 Z" fill="#FF0000" />
        <path d="M 1100 0 Q 1090 70 1110 140 T 1095 230" className="thread short" />

        {/* Короткие изогнутые нити */}
        <path d="M 30 0 Q 20 40 0 60" className="thread short" />
        <path d="M 80 0 Q 60 50 0 80" className="thread short" />
        <path d="M 150 0 Q 120 60 0 100" className="thread short" />

        {/* Нити-дуги */}
        <path d="M 200 0 C 200 150, 300 150, 300 0" className="thread short" />
        <path d="M 450 0 C 450 180, 550 180, 550 0" className="thread short" />
        <path d="M 700 0 C 700 160, 800 160, 800 0" className="thread short" />
        <path d="M 950 0 C 950 190, 1050 190, 1050 0" className="thread short" />

        {/* Нити от верха к правому краю */}
        <path d="M 1100 0 Q 1120 50 1200 70" className="thread short" />
        <path d="M 1150 0 Q 1180 60 1200 90" className="thread short" />

        {/* Маленькие дуги сверху */}
        <path d="M 350 0 Q 360 30 370 0" className="thread short" />
        <path d="M 600 0 Q 610 40 620 0" className="thread short" />
        <path d="M 850 0 Q 860 35 870 0" className="thread short" />
      </svg>

      {/* Центральный контент */}
      <div className="auth-center">
        {!showForm ? (
          <>
            <h1 
              className="auth-title"
              onClick={() => { setIsLogin(true); setShowForm(true); }}
            >
              Войти
            </h1>
            <h1 
              className="auth-title"
              onClick={() => { setIsLogin(false); setShowForm(true); }}
            >
              Регистрация
            </h1>
          </>
        ) : (
          <div className="auth-form-container">
            <h2 className="auth-form-title">
              {isLogin ? 'Войти' : 'Регистрация'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="логин"
                value={loginData.login}
                onChange={(e) => setLoginData({...loginData, login: e.target.value})}
                required
              />
              
              <input
                type="password"
                placeholder="пароль"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              
              {!isLogin && (
                <input
                  type="number"
                  placeholder="ставка (₽/час)"
                  value={loginData.hourly_rate}
                  onChange={(e) => setLoginData({...loginData, hourly_rate: e.target.value})}
                  required
                  min="1"
                  step="0.01"
                />
              )}
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="auth-submit">
                {isLogin ? 'ПОДТВЕРДИТЬ' : 'СОЗДАТЬ'}
              </button>
            </form>
            
            <button 
              className="auth-back"
              onClick={() => setShowForm(false)}
            >
              ← назад
            </button>
          </div>
        )}
      </div>

      {/* 👉 SVG фреймы справа */}
      <div className="right-side-svgs">
        <div 
          className="frame-container"
          dangerouslySetInnerHTML={{ __html: frames[currentFrame] }}
        />
      </div>

      {/* Нижняя рамка */}
      <div className="auth-bottom-bar">
        <p>*И чЕГо Ты жДёшь?</p>
      </div>
    </div>
  );
}

export default Auth;