import { useEffect, useState } from 'react';
import { getUserSubscriptions, addSubscription, deleteSubscription } from '../services/api';
import { AnalyticsPageView, TrackClick, useAnalytics } from "../modules/analytics-kit";

function Dashboard({ user, onLogout }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [newSub, setNewSub] = useState({ name: '', cost_rub: '', period: 'month' });
  const [showForm, setShowForm] = useState(false);
  const [showChocolate, setShowChocolate] = useState(false);
  const [cuttingMode, setCuttingMode] = useState(false);
  const [cuttingId, setCuttingId] = useState(null);

  useEffect(() => {
    loadSubscriptions();
  }, [user.id]);

  const loadSubscriptions = async () => {
    const data = await getUserSubscriptions(user.id);
    setSubscriptions(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addSubscription({
      user_id: user.id,
      name: newSub.name,
      cost_rub: parseFloat(newSub.cost_rub),
      period: newSub.period,
    });
    setNewSub({ name: '', cost_rub: '', period: 'month' });
    setShowForm(false);
    loadSubscriptions();
  };

  const startCutting = () => {
    if (subscriptions.length > 0) {
      setCuttingMode(true);
    }
  };

  const handleCardClick = async (id) => {
    if (!cuttingMode) return;
    setCuttingId(id);
    setCuttingMode(false);
    setTimeout(async () => {
      await deleteSubscription(id);
      setCuttingId(null);
      setShowChocolate(true);
      loadSubscriptions();
    }, 1000);
  };

  const totalHours = subscriptions.reduce((sum, sub) => sum + parseFloat(sub.cost_hours || 0), 0);
  const lv = Math.round(user.hourly_rate / 100);

  const getCardPosition = (index, total) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 250;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.7;
    return { x, y };
  };

  return (
    <div className={`dashboard ${cuttingMode ? 'cutting-mode' : ''}`}>
      {/* Основная сцена */}
      <div className="main-scene">
        <svg className="threads-container" viewBox="-400 -250 800 500">
          {subscriptions.map((sub, index) => {
            const pos = getCardPosition(index, subscriptions.length);
            const isCutting = cuttingId === sub.id;
            return (
              <line
                key={sub.id}
                x1="0"
                y1="0"
                x2={pos.x}
                y2={pos.y}
                className={`thread-line ${isCutting ? 'thread-cutting' : ''}`}
              />
            );
          })}
        </svg>

        {/* Центральное сердце */}
        <div className="heart-center">
          <svg className="pixel-heart-svg" viewBox="0 0 100 100" width="120" height="120" style={{overflow: 'visible'}}>
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FF0000', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#FF0066', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#FF0000', stopOpacity: 1}} />
              </linearGradient>
              <filter id="heartGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{stopColor: '#FF0000', stopOpacity: 0.8}} />
                <stop offset="50%" style={{stopColor: '#FF0066', stopOpacity: 0.4}} />
                <stop offset="100%" style={{stopColor: '#FF0000', stopOpacity: 0}} />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#glowGradient)" className="heart-glow-circle" />
            <path 
              d="M50 85 L45 80 Q20 60 20 40 Q20 25 35 25 Q45 25 50 35 Q55 25 65 25 Q80 25 80 40 Q80 60 55 80 Z"
              fill="url(#heartGradient)"
              filter="url(#heartGlow)"
              stroke="#FF0000"
              strokeWidth="2"
              className="heart-path"
            />
            <path 
              d="M50 85 L45 80 Q20 60 20 40 Q20 25 35 25 Q45 25 50 35 Q55 25 65 25 Q80 25 80 40 Q80 60 55 80 Z"
              fill="none"
              stroke="#00A8FF"
              strokeWidth="1"
              opacity="0.5"
              className="heart-glitch-1"
            />
            <path 
              d="M50 85 L45 80 Q20 60 20 40 Q20 25 35 25 Q45 25 50 35 Q55 25 65 25 Q80 25 80 40 Q80 60 55 80 Z"
              fill="none"
              stroke="#9D4EDD"
              strokeWidth="1"
              opacity="0.5"
              className="heart-glitch-2"
            />
          </svg>
          <div className="heart-hours">{totalHours.toFixed(1)}</div>
          <div className="heart-label">часов</div>
        </div>

        {/* Карточки подписок */}
        {subscriptions.map((sub, index) => {
          const pos = getCardPosition(index, subscriptions.length);
          const isCutting = cuttingId === sub.id;
          return (
            <div
              key={sub.id}
              className={`error-card ${isCutting ? 'card-cutting' : ''} ${cuttingMode ? 'card-clickable' : ''}`}
              style={{
                '--card-x': `${pos.x}px`,
                '--card-y': `${pos.y}px`,
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              onClick={() => handleCardClick(sub.id)}
            >
              {/* Контент карточки */}
              <div className="error-card-content">
                <div className="card-name">{sub.name}</div>
                <div className="card-cost">{sub.cost_rub} ₽</div>
                <div className="card-hours">{sub.cost_hours} ч</div>
              </div>
            </div>
          );
        })}

        {cuttingMode && (
          <div className="cutting-hint">
            ✂ Выбери нить для обрезания
          </div>
        )}
      </div>

      {/* Блок реплик (диалоговое окно) */}
      {subscriptions.length === 0 && (
        <div className="dialog-box">
          <div className="dialog-text">
            {/* Убрали лишние звёздочки из текста, CSS добавит их сам */}
            <p className="dialog-line">Система чиста. Нитей не обнаружено.</p>
            <p className="dialog-line">"НаCлаЖДайся ТИШиной-й, пОк-кА это вОЗмоЖнО"
            <span className="error-sign"> – Error</span></p>
          </div>
        </div>
      )}

      {/* Информация о персонаже (над кнопками) */}
      <div className="character-info">
        <span className="char-name">{user.login}</span>
        <span className="char-lv">LV {lv}</span>
        <span className="char-hp">
          <span className="hp-label">HP</span>
          <span className="hp-bar">
            <span className="hp-fill" style={{width: '100%'}}></span>
          </span>
          <span className="hp-text">{user.hourly_rate} / {user.hourly_rate}</span>
        </span>
      </div>

      {/* Кнопки действий (внизу как в Undertale) */}
      <div className="action-buttons">

        <TrackClick className="transparent-btn" event="buttonAdd_clicked" properties={{ button: 'add_subscription' }}>
          <button
            className="undertale-btn fight-btn"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="btn-icon">❤</span>
            <span>ДОБАВИТЬ ПОДПИСКУ</span>
          </button>
        </TrackClick>

        <button 
          className={`undertale-btn act-btn ${cuttingMode ? 'active' : ''}`}
          onClick={startCutting}
          disabled={subscriptions.length === 0}
        >
          <span className="btn-icon">✂</span>
          <span>{cuttingMode ? 'ВЫБЕРИ НИТЬ...' : 'ОБРЕЗАТЬ НИТЬ'}</span>
        </button>
        <button className="undertale-btn item-btn" disabled>
          <span className="btn-icon">🎁</span>
          <span>ПРЕДМЕТ</span>
        </button>

        <TrackClick className="transparent-btn" event="buttonExcit_clicked" properties={{ button: 'exit_subscription' }}>
          <button className="undertale-btn mercy-btn" onClick={onLogout}>
            <span className="btn-icon">✕</span>
            <span>ВЫХОД</span>
          </button>
        </TrackClick>
      </div>

      {/* Форма добавления */}
      {showForm && (
        <div className="add-form-overlay" onClick={() => setShowForm(false)}>
          <div className="error-form-window" onClick={(e) => e.stopPropagation()}>
            <div className="error-form-header">
              <span className="error-form-title">Fatal message</span>
              <span className="error-form-close" onClick={() => setShowForm(false)}>✕</span>
            </div>
            <div className="error-form-body">
              <div className="error-form-content">
                <div className="error-side-text">errROR  ERrOR</div>
                <form className="add-form-inner" onSubmit={handleAdd}>
                  <input
                    type="text"
                    value={newSub.name}
                    onChange={(e) => setNewSub({...newSub, name: e.target.value})}
                    required
                    placeholder="Наименование подпсики"
                  />
                  <input
                    type="number"
                    value={newSub.cost_rub}
                    onChange={(e) => setNewSub({...newSub, cost_rub: e.target.value})}
                    required
                    min="0"
                    step="0.01"
                    placeholder="Стоимость в руб."
                  />
                  <select 
                    value={newSub.period}
                    onChange={(e) => setNewSub({...newSub, period: e.target.value})}
                  >
                    <option value="month">В месяц</option>
                    <option value="year">В год</option>
                  </select>
                  <div className="form-buttons">
                    <button type="submit">OK</button>
                    <button type="button" onClick={() => setShowForm(false)}>Отмена</button>
                  </div>
                </form>
                <div className="error-side-text right">erROr ERrOR</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Шоколадка */}
      {showChocolate && (
        <div className="chocolate-overlay" onClick={() => setShowChocolate(false)}>
          <div className="chocolate-box">
            <div className="pixel-chocolate">🍫</div>
            <p className="chocolate-text">
              404: Chocolate Consumed.<br/>
              "Твоя жизнь всё ещё принадлежит системе.<br/>
              Попробуй удалить что-то более важное."<br/>
              <span className="error-sign">– Error</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;