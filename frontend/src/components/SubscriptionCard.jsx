import { useState } from 'react';

function SubscriptionCard({ subscription, onDelete }) {
  const [isCutting, setIsCutting] = useState(false);

  const handleCut = () => {
    setIsCutting(true);
    setTimeout(() => {
      onDelete(subscription.id);
    }, 800);
  };

  return (
    <div className={`subscription-card ${isCutting ? 'cutting' : ''}`}>
      <div className="card-content">
        <h3 className="card-title">{subscription.name}</h3>
        <p className="card-cost">💰 {subscription.cost_rub} ₽ / {subscription.period}</p>
        <p className="card-hours">
          ⚠ ВНИМАНИЕ: Эта сущность крадет {subscription.cost_hours} часов твоего жизненного кода ежемесячно.
        </p>
      </div>
      
      <button 
        className="cut-button"
        onClick={handleCut}
        disabled={isCutting}
      >
        {isCutting ? '✂ РАЗРЫВ...' : '✂ ОБРЕЗАТЬ НИТЬ'}
      </button>
      
      <svg className="thread-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="100" x2="50" y2="0" className="thread-line" />
      </svg>
    </div>
  );
}

export default SubscriptionCard;