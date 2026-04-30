import { useState } from 'react';

const ExerciseUseState = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="component-card">
      <span className="exercise-badge">Exercício useState</span>
      <h2>Contador Simples</h2>
      <p>Valor atual: <strong>{count}</strong></p>

      <div className="button-row">
        <button className="component-btn" onClick={() => setCount(prev => prev + 1)}>
          Incrementar
        </button>
        <button className="component-btn secondary" onClick={() => setCount(0)}>
          Resetar
        </button>
        <button className="component-btn" onClick={() => setCount(prev => prev - 1)}>
          Decrementar
        </button>
        
      </div>
    </div>
  );
};

export default ExerciseUseState;
